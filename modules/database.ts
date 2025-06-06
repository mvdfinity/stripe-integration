import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'app.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stripe_session_id TEXT UNIQUE NOT NULL,
    stripe_payment_intent_id TEXT,
    customer_email TEXT NOT NULL,
    template_id TEXT NOT NULL,
    template_name TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'usd',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE INDEX IF NOT EXISTS idx_stripe_session_id ON purchases(stripe_session_id);
  CREATE INDEX IF NOT EXISTS idx_customer_email ON purchases(customer_email);
  CREATE INDEX IF NOT EXISTS idx_template_id ON purchases(template_id);
`);

export interface Purchase {
  id?: number;
  stripe_session_id: string;
  stripe_payment_intent_id?: string;
  customer_email: string;
  template_id: string;
  template_name: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  created_at?: string;
  updated_at?: string;
}

const insertPurchase = db.prepare(`
  INSERT INTO purchases (
    stripe_session_id, stripe_payment_intent_id, customer_email, 
    template_id, template_name, amount, currency, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const updatePurchaseStatus = db.prepare(`
  UPDATE purchases 
  SET status = ?, stripe_payment_intent_id = ?, updated_at = CURRENT_TIMESTAMP
  WHERE stripe_session_id = ?
`);

const getPurchaseBySessionId = db.prepare(`
  SELECT * FROM purchases WHERE stripe_session_id = ?
`);

const getPurchasesByEmail = db.prepare(`
  SELECT * FROM purchases WHERE customer_email = ? ORDER BY created_at DESC
`);

export const dbOperations = {
  createPurchase: (purchase: Omit<Purchase, 'id' | 'created_at' | 'updated_at'>) => {
    return insertPurchase.run(
      purchase.stripe_session_id,
      purchase.stripe_payment_intent_id || null,
      purchase.customer_email,
      purchase.template_id,
      purchase.template_name,
      purchase.amount,
      purchase.currency,
      purchase.status
    );
  },

  updatePurchase: (sessionId: string, status: Purchase['status'], paymentIntentId?: string) => {
    return updatePurchaseStatus.run(status, paymentIntentId || null, sessionId);
  },

  getPurchase: (sessionId: string): Purchase | undefined => {
    return getPurchaseBySessionId.get(sessionId) as Purchase | undefined;
  },

  getUserPurchases: (email: string): Purchase[] => {
    return getPurchasesByEmail.all(email) as Purchase[];
  }
};

export default db;