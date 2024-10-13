import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use Heroku's DATABASE_URL
  ssl: {
    rejectUnauthorized: false, // This is important for Heroku's SSL connection
  },
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firebase_uid, email } = req.body;

    console.log("Received data:", req.body);

    if (!firebase_uid || !email) {
      return res.status(400).json({ error: 'firebase_uid and email are required' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO users (firebase_uid, email) VALUES ($1, $2) ON CONFLICT (firebase_uid) DO NOTHING RETURNING *',
        [firebase_uid, email]
      );

      if (result.rowCount === 0) {
        return res.status(200).json({ message: 'User already exists' });
      }

      res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
    } catch (err) {
      console.error('Database error:', err.message, err.stack);
      res.status(500).json({ error: 'Error saving user to database', details: err.message });
    }
  } else if (req.method === 'PUT') { // Handle incrementing correct spelling count
    console.log('put method identified')
    const { firebase_uid } = req.body;

    if (!firebase_uid) {
      return res.status(400).json({ error: 'firebase_uid is required' });
    }

    try {
      const result = await pool.query(
        'UPDATE users SET correct_spelling_count = correct_spelling_count + 1 WHERE firebase_uid = $1 RETURNING *',
        [firebase_uid]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'Correct spelling count updated', user: result.rows[0] });
    } catch (err) {
      console.error('Database error:', err.message, err.stack);
      res.status(500).json({ error: 'Error updating correct spelling count', details: err.message });
    }
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
