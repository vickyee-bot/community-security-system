const express = require("express");
const router = express.Router();

const { getUserByRole } = require("../controllers/user.controller");
const { authenticate } = require("../middleware/auth.middleware");

router.get("/role/:role", authenticate, getUserByRole);

module.exports = router;
