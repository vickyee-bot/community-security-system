const alertService = require("../services/alert.service");

const createAlert = async (req, res) => {
  try {
    const alert = await alertService.createAlert(req.body, req.user.id);

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
