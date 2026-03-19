const userService = require("../services/user.service");

const getUserByRole = async (req, res) => {
  try {
    const { role } = req.params;

    const user = await userService.getUserByRole(role);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserByRole,
};
