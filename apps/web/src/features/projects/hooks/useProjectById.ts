import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";
import type { ProjectResponseDTO } from "../types/projects";

export function useProjectById(projectId: string) {
  return useQuery<ProjectResponseDTO>({
    queryKey: ["projects", "byId", projectId],
    queryFn: () => projectsApi.getById(projectId),
    staleTime: 10_000,
    retry: 0,
    refetchOnWindowFocus: false,
    enabled: !!projectId
  });
}
