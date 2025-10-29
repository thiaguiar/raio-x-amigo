require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// PostgreSQL Pool
const pool = new Pool();

// POST /quiz
app.post('/quiz', async (req, res) => {
  const { name, email, income, respostas, perfil } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO leads (name, email, income, respostas, perfil, comprou) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email, income, respostas, perfil, false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar os dados.' });
  }
});

// POST /webhook/paid
app.post('/webhook/paid', async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query(
      `UPDATE leads SET comprou = true WHERE email = $1 RETURNING *`,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Lead não encontrado.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o status de compra.' });
  }
});

// GET /lead/:email
app.get('/lead/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM leads WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Lead não encontrado.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o lead.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});