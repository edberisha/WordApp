const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

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
