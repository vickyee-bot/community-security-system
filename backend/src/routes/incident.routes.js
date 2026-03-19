const express = require("express");
const router = express.Router();

const incidentController = require("../controllers/incident.controller");
const upload = require("../middleware/upload.middleware");
const { incidentSchema } = require("../validation/incident.validation");
const validate = require("../middleware/validate.middleware");

const { deleteIncident } = require("../controllers/incident.controller");
const { authenticate } = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

router.post(
  "/",
  authenticate,
  authorizeRoles("RESIDENT"),
  upload.single("image"),
  // validate(incidentSchema),
  incidentController.createIncident,
);

router.get("/", authenticate, incidentController.getIncidents);

router.get("/:id", authenticate, incidentController.getIncident);

router.patch(
  "/:id/status",
  authenticate,
  authorizeRoles("OFFICER", "ADMIN"),
  incidentController.updateStatus,
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  incidentController.deleteIncident,
);

module.exports = router;
