const pool = require("../config/db");
const bcrypt = require("bcrypt");

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM cd.student_registrations WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result.rows[0];

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!user.password_hash) {
      console.error("[auth] user has no password_hash for email:", email);
      return res.status(500).json({ message: "Server error" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.student_name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};