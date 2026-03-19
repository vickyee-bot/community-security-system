const prisma = require("../prisma/prismaClient");
const sendMessage = async (content, senderId, receiverId, incidentId) => {
  return prisma.message.create({
    data: {
      content,
      senderId,
      receiverId,
      incidentId,
    },
    include: {
      sender: { select: { id: true, name: true, role: true } },
    },
  });
};

const getMessages = async (userId, currentUserId) => {
  const targetId = Number(userId);

  if (!targetId) {
    throw new Error("Invalid userId");
  }

  return prisma.message.findMany({
    where: {
      OR: [
        { senderId: currentUserId, receiverId: targetId },
        { senderId: targetId, receiverId: currentUserId },
      ],
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

module.exports = {
  sendMessage,
  getMessages,
};
