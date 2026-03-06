import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";

export function useAssignWorker() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { projectId: string; workerId: string }) =>
      projectsApi.assignWorker(args.projectId, args.workerId),
    onSuccess: async (_data, vars) => {
      await qc.invalidateQueries({
        queryKey: ["projects", "byId", vars.projectId]
      });
      await qc.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}

export function useUnassignWorker() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { projectId: string; workerId: string }) =>
      projectsApi.unassignWorker(args.projectId, args.workerId),
    onSuccess: async (_data, vars) => {
      await qc.invalidateQueries({
        queryKey: ["projects", "byId", vars.projectId]
      });
      await qc.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}
