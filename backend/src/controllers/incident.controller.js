const incidentService = require("../services/incident.service");
const { getIO } = require("../utils/socket");

const createIncident = async (req, res, next) => {
  try {
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);
    // console.log("USER:", req.user);

    // const { title, description, type, latitude, longitude } = req.body;
    // let imageUrl = null;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const incident = await incidentService.createIncident(
      req.body,
      req.user.id,
      imageUrl,
    );

    // emit real-time event
    const io = getIO();
    io.emit("newIncident", incident);

    res.status(201).json(incident);
  } catch (err) {
    next(err);
  }
};

const getIncidents = async (req, res, next) => {
  try {
    const incidents = await incidentService.getAllIncidents();
    res.json(incidents);
  } catch (err) {
    next(err);
  }
};

const getIncident = async (req, res, next) => {
  try {
    const incident = await incidentService.getIncidentById(req.params.id);
    res.json(incident);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
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

const deleteIncident = async (req, res) => {
  try {
    const { id } = req.params;

    getIO().emit("incidentDeleted", id);

    await incidentService.deleteIncident(id);

    res.status(200).json({
      message: "Incident deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createIncident,
  getIncidents,
  getIncident,
  updateStatus,
  deleteIncident,
};
