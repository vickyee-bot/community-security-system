const messageService = require("../services/message.service");

const sendMessage = async (req, res) => {
  try {
    console.log("Message body:", req.body);
    const { content, receiverId } = req.body;

    const message = await messageService.sendMessage(
      content,
      req.user.id,
      receiverId,
      incidentId,
    );

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await messageService.getMessages(userId, req.user.id);

    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
