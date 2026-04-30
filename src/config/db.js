const { Pool } = require("pg");
const path = require("path");
const dotenv = require("dotenv");

// Load .env from the `src` directory where the project's env file lives
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

// Required envs check
const required = ["DB_USER", "DB_HOST", "DB_NAME", "DB_PASSWORD"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  throw new Error(`Missing required environment variables: ${missing.join(", ")}. Check backend/src/.env`);
}

// Coerce port to number when provided
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined;
if (process.env.DB_PORT && Number.isNaN(DB_PORT)) {
  throw new Error("DB_PORT must be a valid number");
}

// Ensure password is a string
const DB_PASSWORD = String(process.env.DB_PASSWORD);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Optional: verify connection early so errors are clear
pool
  .connect()
  .then((client) => {
    client.release();
    console.log("Postgres: connection OK");
  })
  .catch((err) => {
    console.error("Postgres connection error:", err && err.message ? err.message : err);
  });

module.exports = pool;