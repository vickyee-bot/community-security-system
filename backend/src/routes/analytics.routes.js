const express = require("express");
const router = express.Router();

const { getIncidentsByType } = require("../controllers/analytics.controller");
const { authenticate } = require("../middleware/auth.middleware");
const {
  getIncidentsByDay,
  getSummaryStats,
} = require("../controllers/analytics.controller");

router.get("/incidents-by-type", authenticate, getIncidentsByType);
router.get("/incidents-by-day", authenticate, getIncidentsByDay);
router.get("/summary", authenticate, getSummaryStats);

module.exports = router;
