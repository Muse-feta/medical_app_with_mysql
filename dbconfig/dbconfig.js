import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

// Construct the path to the certificate file in the `public` folder
const certPath = path.join(process.cwd(), "public", "certs", "isrgrootx1.pem");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(certPath),
  },
});

export default pool;
