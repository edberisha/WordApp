const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgres://uf8ep9dejfv3r3:pefa4c753569cd317c13cdc7b91dabc74c9d08d1c7140c4f1c559b68996aa150f@cbdhrtd93854d5.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d1j4ulaunbv166",
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
