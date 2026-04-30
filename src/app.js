const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/student.routes");
const { errorHandler } = require("./middlewares/error.middleware");
const registrationRoutes = require("./routes/registration.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);

app.use(errorHandler);

app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/registrations", registrationRoutes);

module.exports = app;