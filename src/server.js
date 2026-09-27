const express = require("express");
const pool = require("./config/database");
const authRoutes = require("./routes/auth.routes");
const authenticateToken = require("./middleware/auth.middleware");
const serviceRoutes = require("./routes/service.router");
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

const PORT = 5000;
pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    console.error("Database connection failed:", error);
  } else {
    console.log("Database connected successfully:", result.rows[0]);
  }
});
app.get("/api/protected", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "You accessed a protected route",
    user: req.user,
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
