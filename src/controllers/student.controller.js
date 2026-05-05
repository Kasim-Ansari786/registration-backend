const studentService = require("../services/student.service");

exports.register = async (req, res, next) => {
  try {
    const body = req.body || {};

    // Basic server-side validation to avoid downstream errors
    const required = [
      "studentName",
      "parentName",
      "mobile",
      "whatsapp",
      "email",
      "city",
      "twelfthStatus",
      "stream",
      "careerInterest",
      "mattersMost",
    ];

    for (const key of required) {
      if (!body[key] || String(body[key]).trim() === "") {
        return res.status(400).json({ success: false, message: `${key} is required` });
      }
    }

    console.log("[register] incoming body:", {
      studentName: body.studentName,
      parentName: body.parentName,
      mobile: body.mobile,
      whatsapp: body.whatsapp,
      email: body.email,
      city: body.city,
      twelfthStatus: body.twelfthStatus,
      stream: body.stream,
      careerInterest: body.careerInterest,
      mattersMost: body.mattersMost,
    });

    const student = await studentService.registerStudent({
      student_name: body.studentName,
      parent_name: body.parentName,
      mobile: body.mobile,
      whatsapp: body.whatsapp,
      email: body.email,
      city: body.city,
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