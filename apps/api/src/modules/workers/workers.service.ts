import { NotFoundError } from "../../shared/errors/AppError.js";
import type { WorkerCreateDTO, WorkerUpdateDTO } from "./workers.dtos.js";
import * as repo from "./workers.repository.js";
import { toDbSeniority } from "./workers.mappers.js";

// Tipo de update para repo (shape DB)
type WorkerUpdateData = {
  name?: string;
  role?: string;
  seniority?: ReturnType<typeof toDbSeniority>;
};

export async function createWorker(dto: WorkerCreateDTO) {
  return repo.create({
    name: dto.name,
    role: dto.role,
    seniority: toDbSeniority(dto.seniority)
  });
}

export async function listWorkers() {
  return repo.list();
}

export async function getWorker(workerId: string) {
  const w = await repo.getById(workerId);
  if (!w) throw new NotFoundError("Worker not found");
  return w;
}

export async function updateWorker(workerId: string, dto: WorkerUpdateDTO) {
  const data: WorkerUpdateData = {};

  if (dto.name !== undefined) data.name = dto.name;
  if (dto.role !== undefined) data.role = dto.role;
  if (dto.seniority !== undefined) {
    data.seniority = toDbSeniority(dto.seniority);
  }

  const w = await repo.update(workerId, data);
  if (!w) throw new NotFoundError("Worker not found");
  return w;
}

export async function deleteWorker(workerId: string) {
  const ok = await repo.remove(workerId);
  if (!ok) throw new NotFoundError("Worker not found");
}
