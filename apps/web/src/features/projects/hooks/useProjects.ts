import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";
import type { ProjectListResponseDTO } from "../types/projects";

export function useProjects() {
  return useQuery<ProjectListResponseDTO>({
    queryKey: ["projects", "list"],
    queryFn: () => projectsApi.list(),
    staleTime: 10_000,
    retry: 0,
    refetchOnWindowFocus: false
  });
}
