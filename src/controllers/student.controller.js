const studentService = require("../services/student.service");

exports.register = async (req, res) => {
  try {
    console.log("[register] incoming body:", req.body);

    const body = req.body;

    // ✅ Map camelCase (frontend) → snake_case (database columns)
    const data = {
      student_name:    body.studentName    || body.student_name,
      parent_name:     body.parentName     || body.parent_name,
      mobile:          body.mobile,
      whatsapp:        body.whatsapp,
      email:           body.email,
      city:            body.city,
      twelfth_status:  body.twelfthStatus  || body.twelfth_status,
      stream:          body.stream,
      career_interest: body.careerInterest || body.career_interest,
      matters_most:    body.mattersMost    || body.matters_most,
    };

    // Check for any missing fields after mapping
    const missing = Object.entries(data)
      .filter(([, v]) => v === undefined || v === null || v === "")
      .map(([k]) => k);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    const student = await studentService.registerStudent(data);

    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: {
        // ✅ Return camelCase back to frontend
        studentName:    student.student_name,
        parentName:     student.parent_name,
        mobile:         student.mobile,
        whatsapp:       student.whatsapp,
        email:          student.email,
        city:           student.city,
        twelfthStatus:  student.twelfth_status,
        stream:         student.stream,
        careerInterest: student.career_interest,
        mattersMost:    student.matters_most,
        id:             student.id,
        createdAt:      student.created_at,
      },
    });
  } catch (err) {
    console.error("[register] error:", err.message);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

exports.getByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email query parameter is required",
      });
    }

    const students = await studentService.getByEmail(email);

    return res.status(200).json({
      success: true,
      data: students,
    });
  } catch (err) {
    console.error("[getByEmail] error:", err.message);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};