const { registerUser, loginUser } = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name,email and password are required",
      });
    }

    const user = await registerUser(name, email, password);

    res.status(201).json({
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const result = await loginUser(email, password);

    res.status(200).json({
      message: "login succesfully",
      ...result,
    });
  } catch (error) {
    console.error(error);

    res.status(401).json({
      message: error.message,
    });
  }
};
module.exports = {
  register,
  login,
};
