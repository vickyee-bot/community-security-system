const prisma = require("../prisma/prismaClient");

const getUserByRole = async (role) => {
  return prisma.user.findFirst({
    where: { role },
    select: {
      id: true,
      name: true,
      role: true,
    },
  });
};

module.exports = {
  getUserByRole,
};
