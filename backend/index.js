require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT;
const allowedOrigins = [
  'https://raio-x.alemdodinheiro.net',
  process.env.FRONTEND_URL,
].filter(Boolean);

console.log("Valor da variável PORT:", port);

// Middleware
app.use(express.json());
app.use(cors({
  origin: allowedOrigins
}));

// PostgreSQL Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

function isMissingRelation(error) {
  return error && error.code === '42P01';
}

function normalizeStatus(status) {
  return String(status || '').trim().toLowerCase();
}

function getWebhookSecret(req) {
  return req.header('x-webhook-secret') || req.body?.secret;
}

function extractBuyerData(payload) {
  return {
    email: payload?.email || payload?.customer_email || payload?.Customer?.email || payload?.customer?.email || payload?.buyer?.email,
    name: payload?.name || payload?.customer_name || payload?.Customer?.name || payload?.customer?.name || payload?.buyer?.name,
    transactionId: payload?.transaction_id || payload?.order_id || payload?.sale_id || payload?.id,
    status: normalizeStatus(payload?.status || payload?.order_status || payload?.payment_status),
  };
}

async function findAccessByEmail(email) {
  try {
    const accessResult = await pool.query(
      `SELECT email, name, purchase_status, source, unlocked_at
       FROM course_access
       WHERE LOWER(email) = LOWER($1)
         AND purchase_status = 'paid'
       LIMIT 1`,
      [email]
    );

    if (accessResult.rowCount > 0) {
      return accessResult.rows[0];
    }
  } catch (error) {
    if (!isMissingRelation(error)) {
      throw error;
    }
  }

  try {
    const legacyResult = await pool.query(
      `SELECT email, name, comprou
       FROM leads
       WHERE LOWER(email) = LOWER($1)
         AND comprou = true
       LIMIT 1`,
      [email]
    );

    if (legacyResult.rowCount > 0) {
      return legacyResult.rows[0];
    }
  } catch (error) {
    if (!isMissingRelation(error)) {
      throw error;
    }
  }

  return null;
}

app.post('/quiz', async (_req, res) => {
  res.status(410).json({
    error: 'O envio de respostas foi desativado. O diagnóstico agora roda localmente para compradores validados.',
  });
});

app.post('/access/verify', async (req, res) => {
  const email = String(req.body?.email || '').trim();

  if (!email) {
    return res.status(400).json({ error: 'Informe o e-mail da compra.' });
  }

  try {
    const access = await findAccessByEmail(email);

    if (!access) {
      return res.status(403).json({
        hasAccess: false,
        error: 'Não encontramos uma compra confirmada com este e-mail.',
      });
    }

    return res.json({
      hasAccess: true,
      email: access.email,
      name: access.name || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao validar o acesso.' });
  }
});

// POST /webhook/paid
app.post('/webhook/paid', async (req, res) => {
  const configuredSecret = process.env.KIWIFY_WEBHOOK_SECRET;
  const requestSecret = getWebhookSecret(req);

  if (configuredSecret && requestSecret !== configuredSecret) {
    return res.status(401).json({ error: 'Webhook não autorizado.' });
  }

  const buyer = extractBuyerData(req.body);
  const email = String(buyer.email || '').trim();
  const purchaseStatus = buyer.status || 'paid';

  if (!email) {
    return res.status(400).json({ error: 'Payload sem e-mail do comprador.' });
  }

  if (!['paid', 'approved', 'completed', 'confirmed'].includes(purchaseStatus)) {
    return res.status(202).json({ ignored: true, status: purchaseStatus || 'unknown' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO course_access (email, name, purchase_status, source, kiwify_transaction_id, unlocked_at, updated_at)
       VALUES ($1, $2, 'paid', 'kiwify', $3, NOW(), NOW())
       ON CONFLICT (email)
       DO UPDATE SET
         name = COALESCE(EXCLUDED.name, course_access.name),
         purchase_status = 'paid',
         source = 'kiwify',
         kiwify_transaction_id = COALESCE(EXCLUDED.kiwify_transaction_id, course_access.kiwify_transaction_id),
         unlocked_at = COALESCE(course_access.unlocked_at, NOW()),
         updated_at = NOW()
       RETURNING *`,
      [email, buyer.name || null, buyer.transactionId || null]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    if (isMissingRelation(error)) {
      return res.status(500).json({
        error: 'A tabela course_access ainda não existe. Rode a migração do schema antes de usar o webhook.',
      });
    }

    res.status(500).json({ error: 'Erro ao atualizar o status de compra.' });
  }
});

// GET /
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Start server
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});