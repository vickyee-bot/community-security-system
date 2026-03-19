const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");

const authRoutes = require("./routes/auth.routes");
const incidentRoutes = require("./routes/incident.routes");
const alertRoutes = require("./routes/alert.routes");
const errorHandler = require("./middleware/error.middleware");
const messageRoutes = require("./routes/message.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/incidents", incidentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/alerts", alertRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use(errorHandler);
module.exports = app;
