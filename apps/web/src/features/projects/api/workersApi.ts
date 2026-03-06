import { http } from "@/shared/api/http";
import type { WorkerDTO } from "../types/projects";

export type WorkersListResponseDTO = { items: WorkerDTO[] };

export const workersApi = {
  list: () => http.get<WorkersListResponseDTO>("/workers")
};
