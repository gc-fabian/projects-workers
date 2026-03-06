import { http } from "@/shared/api/http";
import type {
  WorkerCreateDTO,
  WorkerDTO,
  WorkerUpdateDTO
} from "../types/projects";

export type WorkersListResponseDTO = {
  items: WorkerDTO[];
};

export const workersApi = {
  list: () => http.get<WorkersListResponseDTO>("/workers"),

  create: (data: WorkerCreateDTO) => http.post<WorkerDTO>("/workers", data),

  update: (workerId: string, data: WorkerUpdateDTO) =>
    http.patch<WorkerDTO>(`/workers/${workerId}`, data),

  remove: (workerId: string) => http.delete<void>(`/workers/${workerId}`)
};
