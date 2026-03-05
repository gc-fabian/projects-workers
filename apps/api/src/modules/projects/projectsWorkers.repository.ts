import { prisma } from "../../shared/db/prisma";

export const projectsWorkersRepository = {
  // existe el proyecto?
  projectExists: async (projectId: string) => {
    const p = await prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true }
    });
    return !!p;
  },

  // existe el worker?
  workerExists: async (workerId: string) => {
    const w = await prisma.worker.findUnique({
      where: { id: workerId },
      select: { id: true }
    });
    return !!w;
  },

  // existe la asignación?
  assignmentExists: async (projectId: string, workerId: string) => {
    const pw = await prisma.projectWorker.findUnique({
      where: { projectId_workerId: { projectId, workerId } },
      select: { projectId: true }
    });
    return !!pw;
  },

  createAssignment: (projectId: string, workerId: string) =>
    prisma.projectWorker.create({ data: { projectId, workerId } }),

  deleteAssignment: (projectId: string, workerId: string) =>
    prisma.projectWorker.delete({
      where: { projectId_workerId: { projectId, workerId } }
    })
};
