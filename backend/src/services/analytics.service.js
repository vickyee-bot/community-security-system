const prisma = require("../prisma/prismaClient");

const getIncidentsByType = async () => {
  const data = await prisma.incident.groupBy({
    by: ["type"],
    _count: {
      type: true,
    },
  });

  return data;
};

module.exports = {
  getIncidentsByType,
};
