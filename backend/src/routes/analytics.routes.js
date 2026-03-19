const express = require("express");
const router = express.Router();

const { getIncidentsByType } = require("../controllers/analytics.controller");
const { authenticate } = require("../middleware/auth.middleware");

router.get("/incidents-by-type", authenticate, getIncidentsByType);

module.exports = router;
