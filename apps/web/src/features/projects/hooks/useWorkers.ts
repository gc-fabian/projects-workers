import { useQuery } from "@tanstack/react-query";
import { workersApi } from "../api/workersApi";
import type { WorkersListResponseDTO } from "../api/workersApi";

export function useWorkers() {
  return useQuery<WorkersListResponseDTO>({
    queryKey: ["workers", "list"],
    queryFn: () => workersApi.list(),
    staleTime: 10_000,
    retry: 0,
    refetchOnWindowFocus: false
  });
}
