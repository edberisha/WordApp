import express from 'express';
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// API endpoint to add a user
app.post('/api/users', async (req, res) => {
  const { firebase_uid, email } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (firebase_uid, email) VALUES ($1, $2) ON CONFLICT (firebase_uid) DO NOTHING RETURNING *',
      [firebase_uid, email]
    );

    if (result.rowCount === 0) {
      return res.status(200).json({ message: 'User already exists' });
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Error saving user to database', details: err.message });
  }
});

// Other API endpoints here...

// Start the server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});





app.get('/api/users/:firebase_uid', async (req, res) => {
  const { firebase_uid } = req.params;

  try {
      const result = await pool.query('SELECT correct_spelling_count FROM users WHERE firebase_uid = $1', [firebase_uid]);

      if (result.rows.length > 0) {
          res.status(200).json(result.rows[0]); // Make sure this returns { correct_spelling_count: value }
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: 'Error fetching user', details: err.message });
  }
});
