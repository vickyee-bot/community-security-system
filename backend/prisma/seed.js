const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 🔹 USERS
  const password = await bcrypt.hash("123456", 10);

  const resident = await prisma.user.create({
    data: {
      name: "Resident User",
      email: "resident@test.com",
      password,
      role: "RESIDENT",
    },
  });

  const officer = await prisma.user.create({
    data: {
      name: "Security Officer",
      email: "officer@test.com",
      password,
      role: "OFFICER",
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@test.com",
      password,
      role: "ADMIN",
    },
  });

  const incidentTypes = ["THEFT", "ACCIDENT", "FIRE", "VANDALISM"];
  const statuses = ["PENDING", "VERIFIED", "RESOLVED"];

  // 🔹 INCIDENTS (30 records)
  for (let i = 0; i < 30; i++) {
    await prisma.incident.create({
      data: {
        title: `Incident ${i + 1}`,
        description: `Test incident description ${i + 1}`,
        type: incidentTypes[Math.floor(Math.random() * incidentTypes.length)],
        latitude: -1.28 + Math.random() * 0.02,
        longitude: 36.81 + Math.random() * 0.02,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        reportedById: resident.id,
      },
    });
  }

  // 🔹 ALERTS
  for (let i = 0; i < 5; i++) {
    await prisma.alert.create({
      data: {
        title: `Alert ${i + 1}`,
        message: `Important community alert ${i + 1}`,
        targetAudience: "ALL",
        createdById: admin.id,
      },
    });
  }

  // 🔹 MESSAGES (linked to incidents)
  const incidents = await prisma.incident.findMany();

  for (let i = 0; i < 20; i++) {
    const randomIncident =
      incidents[Math.floor(Math.random() * incidents.length)];

    await prisma.message.create({
      data: {
        content: `Message ${i + 1}`,
        senderId: resident.id,
        receiverId: officer.id,
        incidentId: randomIncident.id,
      },
    });
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
