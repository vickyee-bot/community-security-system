const prisma = require("../prisma/prismaClient");

const createIncident = async (data, userId, imageUrl) => {
  const incident = await prisma.incident.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      imageUrl: imageUrl,
      reportedById: userId,
    },
  });

  return incident;
};

const getAllIncidents = async () => {
  const incidents = await prisma.incident.findMany({
    include: {
      reportedBy: {
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

  return incidents;
};

const getIncidentById = async (id) => {
  return prisma.incident.findUnique({
    where: { id: Number(id) },
    include: {
      reportedBy: true,
    },
  });
};

const updateIncidentStatus = async (id, status) => {
  return prisma.incident.update({
    where: { id: Number(id) },
    data: { status },
  });
};

const deleteIncident = async (id) => {
  return prisma.incident.delete({
    where: { id: Number(id) },
  });
};

module.exports = {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncidentStatus,
  deleteIncident,
};
