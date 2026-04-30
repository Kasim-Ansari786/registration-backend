const studentService = require("../services/student.service");
const { hashPassword } = require("../utils/hash");

exports.register = async (req, res, next) => {
  try {
    const body = req.body;

    // hash password
    const password_hash = await hashPassword(body.password);

    const student = await studentService.registerStudent({
      student_name: body.studentName,
      parent_name: body.parentName,
      mobile: body.mobile,
      whatsapp: body.whatsapp,
      email: body.email,
      city: body.city,
      password_hash,
      twelfth_status: body.twelfthStatus,
      stream: body.stream,
      career_interest: body.careerInterest,
      matters_most: body.mattersMost,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

exports.getByEmail = async (req, res, next) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ message: "Email query parameter is required" });
    }

    const rows = await studentService.getByEmail(email);

    return res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};