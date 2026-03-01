import type { Seniority, Worker } from "@prisma/client";
import type { WorkerResponseDTO, WorkerSeniorityDTO } from "./workers.dtos";

export function toDtoSeniority(s: Seniority): WorkerSeniorityDTO {
  if (s === "semiSenior") return "semi-senior";
  return s; // junior | senior
}

export function toDbSeniority(s: WorkerSeniorityDTO): Seniority {
  if (s === "semi-senior") return "semiSenior";
  return s;
}

export function toWorkerResponseDTO(worker: Worker): WorkerResponseDTO {
  return {
    id: worker.id,
    name: worker.name,
    role: worker.role,
    seniority: toDtoSeniority(worker.seniority)
  };
}
