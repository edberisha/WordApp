const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import CORS

// Initialize the PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // This will pull the value from your .env file
  ssl: {
    rejectUnauthorized: false, // Required for Heroku
  },
});

// Function to create the users table
const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      firebase_uid VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) NOT NULL, 
      correct_spelling_count INT DEFAULT 0, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log("Users table created or already exists");
};

// Initialize the database and create the table
const init = async () => {
  try {
    await pool.connect();
    await createUsersTable();
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
};

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// API endpoint to add a user
app.post('/api/users', async (req, res) => {
  const { firebase_uid, email } = req.body;
  console.log("Received firebase_uid:", firebase_uid); // Log the incoming UID

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
    console.error('Database error:', err.message); // More detailed logging
    res.status(500).json({ error: 'Error saving user to database', details: err.message });
  }
});

// PUT method to increment correct spelling count
app.put('/api/users/score', async (req, res) => {
  console.log('PUT method identified');
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
});

// GET method to retrieve user data
app.get('/api/users/:firebase_uid', async (req, res) => {
  const { firebase_uid } = req.params;

  try {
    const result = await pool.query(
      'SELECT correct_spelling_count FROM users WHERE firebase_uid = $1',
      [firebase_uid]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Error retrieving user data', details: err.message });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});

// Initialize the database
init();
