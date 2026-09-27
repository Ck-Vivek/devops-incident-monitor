const bcrypt = require("bcrypt");
const pool = require("../config/database");
const jwt = require("jsonwebtoken");

const registerUser = async (name, email, password) => {
  const existingUser = await pool.query("SELECT id FROM users WHERE email=$1", [
    email,
  ]);
  if (existingUser.rows.length > 0) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (name,email,password_hash)
        VALUES($1, $2, $3)
        RETURNING id ,name,email, role, created_at`,
    [name, email, passwordHash],
  );
  const user = result.rows[0];
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  return { ...user, token };
};
const loginUser = async (email, password) => {
  const result = await pool.query("SELECT * FROM users WHERE email= $1", [
    email,
  ]);
  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }
  const user = result.rows[0];

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  process.env.JWT_SECRET,
  { expiresIn: "1h" },
);

return {
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
};
};

module.exports = {
  registerUser,
  loginUser,
};
