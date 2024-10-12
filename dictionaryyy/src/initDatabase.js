import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

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

const init = async () => {
  try {
    await pool.connect();
    await createUsersTable();
  } catch (err) {
    console.error('Error connecting to the database', err);
  } finally {
    await pool.end(); // Close the connection
  }
};

// Run the initialization
init();
