const db = require("../config/db");

const getAllRegistrations = async (email) => {
  try {
    const result = await db.query(
      `
      SELECT *
      FROM cd.student_registrations
      WHERE email = $1
      ORDER BY created_at DESC
      `,
      [email] // ✅ REQUIRED
    );

    return result.rows;
  } catch (error) {
    console.error("DB Error:", error);
    throw error;
  }
};
module.exports = {
  getAllRegistrations,
};