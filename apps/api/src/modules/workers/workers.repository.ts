import type { Prisma, Worker } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";

export async function create(data: Prisma.WorkerCreateInput): Promise<Worker> {
  return prisma.worker.create({ data });
}

export async function list(): Promise<Worker[]> {
  return prisma.worker.findMany({ orderBy: { name: "asc" } });
}

export async function getById(id: string): Promise<Worker | null> {
  return prisma.worker.findUnique({ where: { id } });
}

export async function update(
  id: string,
  data: Prisma.WorkerUpdateInput
): Promise<Worker | null> {
  try {
    return await prisma.worker.update({ where: { id }, data });
  } catch {
    return null;
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    await prisma.worker.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
