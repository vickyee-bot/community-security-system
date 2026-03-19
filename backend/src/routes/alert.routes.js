const express = require("express");
const router = express.Router();

const alertController = require("../controllers/alert.controller");

const { authenticate } = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  alertController.createAlert,
);

router.get("/", authenticate, alertController.getAlerts);

module.exports = router;
