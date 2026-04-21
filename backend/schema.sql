CREATE TABLE IF NOT EXISTS course_access (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  purchase_status TEXT NOT NULL DEFAULT 'paid',
  source TEXT NOT NULL DEFAULT 'kiwify',
  kiwify_transaction_id TEXT UNIQUE,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_course_access_email ON course_access (LOWER(email));