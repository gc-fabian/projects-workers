import { prisma } from "../../shared/db/prisma";
import type { Prisma } from "@prisma/client";

const withWorkers = {
  workers: { include: { worker: true } }
} satisfies Prisma.ProjectInclude;

export const projectsRepository = {
  create: (data: Prisma.ProjectCreateInput) =>
    prisma.project.create({ data, include: withWorkers }),

  findMany: () =>
    prisma.project.findMany({
      orderBy: { startDate: "desc" },
      include: withWorkers
    }),

  findById: (id: string) =>
    prisma.project.findUnique({
      where: { id },
      include: withWorkers
    }),

  update: (id: string, data: Prisma.ProjectUpdateInput) =>
    prisma.project.update({ where: { id }, data, include: withWorkers }),

  delete: (id: string) => prisma.project.delete({ where: { id } })
};
