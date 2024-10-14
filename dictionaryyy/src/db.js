import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv'; // Import dotenv to load .env variables

dotenv.config(); // Load environment variables from .env file

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const app = express();
app.use(cors({
  origin: ['*'], // Allow requests from these origins
  methods: ['GET', 'POST'],
  credentials: true, // If you need to allow cookies or authentication
}));
app.use(express.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

// API endpoint to add a user
app.post('/api/users', async (req, res) => {
  const { firebase_uid, email } = req.body;

  console.log('Received request:', { firebase_uid, email });

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

// API endpoint to get user score
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

// Start the server
const PORT = process.env.PORT || 3001; // Use the port from Heroku or default to 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
