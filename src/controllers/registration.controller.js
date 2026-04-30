const registrationModel = require("../models/registration.model");

const getAllRegistrations = async (req, res) => {
  try {
    const data = await registrationModel.getAllRegistrations();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getAllRegistrations,
};