const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();




const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // Your MySQL database name
};

async function createTables() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const schemaPath = path.join(__dirname, '../schema/schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    await connection.query(sql);
    console.log('Tables created successfully');
    await connection.end();
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1); // Exit with error
  }
}

createTables();