const pool = require("../config/db");

exports.registerStudent = async (data) => {
  const query = `
    INSERT INTO cd.student_registrations (
      student_name,
      parent_name,
      mobile,
      whatsapp,
      email,
      city,
      twelfth_status,
      stream,
      career_interest,
      matters_most
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *;
  `;

  const values = [
    data.student_name,
    data.parent_name,
    data.mobile,
    data.whatsapp,
    data.email,
    data.city,
    data.twelfth_status,
    data.stream,
    data.career_interest,
    data.matters_most,
  ];

  // Defensive check: ensure values length matches placeholders
  if (values.length !== 10) {
    console.error("[registerStudent] values length mismatch", values);
    throw new Error("Server error: registration values mismatch");
  }

  console.log("[registerStudent] inserting values:", values.map((v) => (v && v.toString ? v.toString().slice(0, 200) : v)));

  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getByEmail = async (email) => {
  const query = `SELECT * FROM cd.student_registrations WHERE email = $1`;
  const result = await pool.query(query, [email]);
  // Remove sensitive fields like password_hash before returning
  return result.rows.map((r) => {
    const { password_hash, ...rest } = r;
    return rest;
  });
};