const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
  getMessagesByIncident,
} = require("../controllers/message.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.post("/", authenticate, sendMessage);

router.get("/incident/:incidentId", authenticate, getMessagesByIncident);

router.get("/:userId", authenticate, getMessages);

module.exports = router;
