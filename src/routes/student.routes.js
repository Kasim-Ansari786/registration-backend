const express = require("express");
const router = express.Router();
const { register, getByEmail } = require("../controllers/student.controller");

router.post("/register", register);
// GET /api/students?email=user@example.com
router.get("/", getByEmail);

module.exports = router;