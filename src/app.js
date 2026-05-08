const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/student.routes");
const { errorHandler } = require("./middlewares/error.middleware");
const registrationRoutes = require("./routes/registration.routes");

const app = express();

const allowedOrigins = [
  "https://admission.astaracademy.in",
  "https://www.admission.astaracademy.in",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (process.env.NODE_ENV !== "production" && origin?.startsWith("http://localhost")) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/registrations", registrationRoutes);

app.use(errorHandler);

module.exports = app;
