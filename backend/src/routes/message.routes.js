const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller");
const { authenticate } = require("../middleware/auth.middleware");

router.post("/", authenticate, sendMessage);

router.get("/:userId", authenticate, getMessages);

module.exports = router;
