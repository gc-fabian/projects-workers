import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";
export function useProjects() {
  return useQuery({
    queryKey: ["projects", "list"],
    queryFn: () => projectsApi.list(),
    staleTime: 10_000,
    retry: 0,
    refetchOnWindowFocus: false
  });
}
