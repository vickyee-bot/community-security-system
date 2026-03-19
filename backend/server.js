const http = require("http");

const app = require("./src/app");
const { initSocket } = require("./src/utils/socket");

const server = http.createServer(app);

const io = initSocket(server);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("sendMessage", (message) => {
    io.emit("newMessage", message);
  });
});

// 🔴 ADD THIS MIDDLEWARE
app.use((req, res, next) => {
  req.io = io;
  next();
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
