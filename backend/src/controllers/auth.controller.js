const authService = require("../services/auth.service");
const generateToken = require("../utils/jwt");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.registerUser(name, email, password);

    const token = generateToken(user);

    res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.loginUser(email, password);

    const token = generateToken(user);

    res.json({
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
