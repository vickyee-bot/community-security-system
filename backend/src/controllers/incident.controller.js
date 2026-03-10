const incidentService = require("../services/incident.service");
const { getIO } = require("../utils/socket");

const createIncident = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const incident = await incidentService.createIncident(
      req.body,
      req.user.id,
      imageUrl,
    );

    const io = getIO();
    io.emit("newIncident", incident);

    res.status(201).json(incident);
  } catch (err) {
    next(err);
  }
};

const getIncidents = async (req, res) => {
  try {
    const incidents = await incidentService.getAllIncidents();

    res.json(incidents);
  } catch (err) {
    next(err);
  }
};

const getIncident = async (req, res) => {
  try {
    const incident = await incidentService.getIncidentById(req.params.id);

    res.json(incident);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const incident = await incidentService.updateIncidentStatus(
      req.params.id,
      status,
    );

    res.json(incident);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createIncident,
  getIncidents,
  getIncident,
  updateStatus,
};
