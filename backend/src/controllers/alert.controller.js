const alertService = require("../services/alert.service");
const { getIO } = require("../utils/socket");

const createAlert = async (req, res, next) => {
  try {
    const alert = await alertService.createAlert(req.body, req.user.id);

    console.log("Socket available:", req.io);

    // 🔴 emit real-time alert
    getIO().emit("newAlert", alert);

    res.status(201).json(alert);
  } catch (err) {
    next(err);
  }
};
const getAlerts = async (req, res) => {
  try {
    const alerts = await alertService.getAlerts();

    res.json(alerts);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAlert,
  getAlerts,
};
