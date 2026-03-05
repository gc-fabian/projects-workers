import type { Prisma } from "@prisma/client";

export type ProjectWithWorkers = Prisma.ProjectGetPayload<{
  include: { workers: { include: { worker: true } } };
}>;

export const mapProjectToDTO = (project: ProjectWithWorkers) => ({
  id: project.id,
  name: project.name,
  clientName: project.clientName,
  startDate: project.startDate.toISOString().slice(0, 10),
  endDate: project.endDate
    ? project.endDate.toISOString().slice(0, 10)
    : undefined,
  workers: project.workers.map((pw) => ({
    id: pw.worker.id,
    name: pw.worker.name,
    role: pw.worker.role,
    seniority: pw.worker.seniority
  }))
});
