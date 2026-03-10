const prisma = require("../prisma/prismaClient");

const createAlert = async (data, adminId) => {
  return prisma.alert.create({
    data: {
      title: data.title,
      message: data.message,
      targetAudience: data.targetAudience,
      createdById: adminId,
    },
  });
};

const getAlerts = async () => {
  return prisma.alert.findMany({
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = {
  createAlert,
  getAlerts,
};
