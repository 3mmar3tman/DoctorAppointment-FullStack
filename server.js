const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// const conectDB = require("./config/db");

// const userRoute = require("./routes/userRoute");
// const doctorRoute = require("./routes/DoctorRoute");
// const appointmentRoute = require("./routes/AppointmentRoute");
// const departmentRoute = require("./routes/DepartmentRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//  Connect to MongoDB database
// conectDB();

//  Middleware setup
app.use(express.json());
app.use(cors());

// //  Main API routes
// app.use("/user", userRoute);
// app.use("/doctor", doctorRoute);
// app.use("/appointment", appointmentRoute);
// app.use("/department", departmentRoute);
// //  Serve static files (e.g., uploaded images)
// app.use("/uploads", express.static("uploads"));

// Default route (for testing server status)
app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

// Handle 404 errors (route not found)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (for unexpected server errors)
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
