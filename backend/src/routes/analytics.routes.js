const express = require("express");
const router = express.Router();

const {
  getIncidentsByType,
  exportCSV,
  exportPDF,
} = require("../controllers/analytics.controller");
const { authenticate } = require("../middleware/auth.middleware");
const {
  getIncidentsByDay,
  getSummaryStats,
} = require("../controllers/analytics.controller");

router.get("/incidents-by-type", authenticate, getIncidentsByType);
router.get("/incidents-by-day", authenticate, getIncidentsByDay);
router.get("/summary", authenticate, getSummaryStats);
router.get("/export/csv", authenticate, exportCSV);
router.get("/export/pdf", authenticate, exportPDF);

module.exports = router;
