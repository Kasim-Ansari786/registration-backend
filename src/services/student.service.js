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
      password_hash,
      twelfth_status,
      stream,
      career_interest,
      matters_most
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *;
  `;

  const values = [
    data.student_name,
    data.parent_name,
    data.mobile,
    data.whatsapp,
    data.email,
    data.city,
    data.password_hash,
    data.twelfth_status,
    data.stream,
    data.career_interest,
    data.matters_most,
  ];

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