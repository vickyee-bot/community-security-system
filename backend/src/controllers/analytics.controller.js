const analyticsService = require("../services/analytics.service");

const getIncidentsByType = async (req, res) => {
  try {
    const data = await analyticsService.getIncidentsByType();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getIncidentsByType,
};
