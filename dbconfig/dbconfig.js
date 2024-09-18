// const mysql = require('mysql2/promise');
import mysql from "mysql2/promise"
import fs from 'fs';


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync("./certs/isrgrootx1.pem"),
  },
});


export default pool