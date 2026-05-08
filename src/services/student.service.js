// src/services/student.service.js
const pool = require("../config/db");

exports.registerStudent = async (data) => {
  const requiredFields = [
    "student_name", "parent_name", "mobile", "whatsapp",
    "email", "city", "twelfth_status", "stream",
    "career_interest", "matters_most",
  ];

  const missingFields = requiredFields.filter(
    (field) => data[field] === undefined || data[field] === null || data[field] === ""
  );

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  const query = `
    INSERT INTO cd.student_registrations (
      student_name, parent_name, mobile, whatsapp, email,
      city, twelfth_status, stream, career_interest, matters_most
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *;
  `;

  const values = [
    data.student_name, data.parent_name, data.mobile,
    data.whatsapp, data.email, data.city,
    data.twelfth_status, data.stream,
    data.career_interest, data.matters_most,
  ];

  console.log("[registerStudent] inserting:", values);

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("[registerStudent] DB error:", error.message);
    if (error.code === "23505") throw new Error("A student with this email already exists.");
    if (error.code === "42P01") throw new Error("Database table not found. Contact administrator.");
    throw new Error("Registration failed: " + error.message);
  }
};

exports.getByEmail = async (email) => {
  if (!email) throw new Error("Email is required.");
  try {
    const result = await pool.query(
      `SELECT * FROM cd.student_registrations WHERE email = $1`, [email]
    );
    return result.rows.map(({ password_hash, ...rest }) => rest);
  } catch (error) {
    console.error("[getByEmail] DB error:", error.message);
    throw new Error("Failed to fetch student: " + error.message);
  }
};