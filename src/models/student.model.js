// src/models/student.model.js
const db = require("../config/db");

const getAllStudents = async () => {
  const result = await db.query(
    "SELECT * FROM cd.student_registrations ORDER BY created_at DESC"
  );
  return result.rows;
};

module.exports = {
  getAllStudents,
};