const express = require("express");

const app = express();
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("DevOps monitoring server is running");
});
app.post("/test", (req, res) => {
  console.log(req.body);
  res.status(200).json({
    message: "Data received successfully",
    data:req.body
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
