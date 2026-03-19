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

const getIncidentsByDay = async () => {
  const incidents = await prisma.incident.findMany({
    select: {
      createdAt: true,
    },
  });

  const grouped = {};

  incidents.forEach((i) => {
    const date = i.createdAt.toISOString().split("T")[0];

    if (!grouped[date]) grouped[date] = 0;
    grouped[date]++;
  });

  return Object.keys(grouped).map((date) => ({
    date,
    count: grouped[date],
  }));
};

const getSummaryStats = async () => {
  const totalIncidents = await prisma.incident.count();

  const resolved = await prisma.incident.count({
    where: { status: "RESOLVED" },
  });

  const pending = await prisma.incident.count({
    where: { status: "PENDING" },
  });

  return {
    totalIncidents,
    resolved,
    pending,
  };
};

module.exports = {
  getIncidentsByType,
  getIncidentsByDay,
  getSummaryStats,
};
