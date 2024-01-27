const db = require("./db");

const createDataTableQuery = `
  CREATE TABLE IF NOT EXISTS data (
    id SERIAL PRIMARY KEY,
    key UUID,
    editable BOOLEAN DEFAULT true,
    data TEXT
);
`;

const createTokensTableQuery = `
  CREATE TABLE IF NOT EXISTS tokens (
    id SERIAL PRIMARY KEY,
    token UUID DEFAULT uuid_generate_v4(),
    created_on TIMESTAMP DEFAULT NOW()
);
`;

async function createTables() {
  try {
    // Execute the CREATE TABLE queries
    await db.query(createDataTableQuery);
    await db.query(createTokensTableQuery)

    console.log('All the tables created successfully!');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
  }
}

createTables();
