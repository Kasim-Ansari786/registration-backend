// src/config/db.js
const { Pool } = require("pg");
const path = require("path");
const dotenv = require("dotenv");

// Load .env from the `src` directory where the project's env file lives
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // IMPORTANT FIXES
  connectionTimeoutMillis: 10000, // 10 sec timeout
  idleTimeoutMillis: 30000,

  // If your DB is remote (common in VPS)
  ssl: false, // set true only if SSL required
});

pool.on("connect", () => {
  console.log("✅ DB Connected");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected DB error:", err);
});

module.exports = pool;