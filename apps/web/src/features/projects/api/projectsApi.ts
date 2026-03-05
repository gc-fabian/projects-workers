import { http } from "@/shared/api/http";
import type {
  ProjectCreateDTO,
  ProjectListResponseDTO,
  ProjectResponseDTO,
  ProjectUpdateDTO
} from "../types/projects";

export const projectsApi = {
  list: () => http.get<ProjectListResponseDTO>("/projects"),
  getById: (id: string) => http.get<ProjectResponseDTO>(`/projects/${id}`),
  create: (data: ProjectCreateDTO) =>
    http.post<ProjectResponseDTO>("/projects", data),
  update: (id: string, data: ProjectUpdateDTO) =>
    http.patch<ProjectResponseDTO>(`/projects/${id}`, data),
  remove: (id: string) => http.delete<void>(`/projects/${id}`)
};
