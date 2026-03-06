import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workersApi } from "../api/workersApi";
import type { WorkerCreateDTO, WorkerUpdateDTO } from "../types/projects";

export function useCreateWorker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WorkerCreateDTO) => workersApi.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workers", "list"] });
    }
  });
}

export function useUpdateWorker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { workerId: string; data: WorkerUpdateDTO }) =>
      workersApi.update(args.workerId, args.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workers", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}

export function useDeleteWorker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workerId: string) => workersApi.remove(workerId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workers", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}
