import { PrismaClient, Seniority } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.projectWorker.deleteMany();
  await prisma.project.deleteMany();
  await prisma.worker.deleteMany();

  const workers = await prisma.worker.createMany({
    data: [
      {
        name: "Alice Johnson",
        role: "Frontend Developer",
        seniority: Seniority.senior
      },
      {
        name: "Bob Martinez",
        role: "Backend Developer",
        seniority: Seniority.semiSenior
      },
      {
        name: "Carla Diaz",
        role: "QA Engineer",
        seniority: Seniority.junior
      },
      {
        name: "Daniel Silva",
        role: "DevOps Engineer",
        seniority: Seniority.semiSenior
      }
    ]
  });

  const projectA = await prisma.project.create({
    data: {
      name: "Platform Redesign",
      clientName: "Acme Corp",
      startDate: new Date("2025-01-10"),
      endDate: new Date("2025-06-30")
    }
  });

  const projectB = await prisma.project.create({
    data: {
      name: "Mobile Integration",
      clientName: "Globex",
      startDate: new Date("2025-03-01"),
      endDate: null
    }
  });

  const allWorkers = await prisma.worker.findMany();

  await prisma.projectWorker.createMany({
    data: [
      {
        projectId: projectA.id,
        workerId: allWorkers[0].id
      },
      {
        projectId: projectB.id,
        workerId: allWorkers[1].id
      }
    ]
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
