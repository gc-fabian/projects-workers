import { z } from "zod";

export const workerFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(120, "Max 120 chars"),
  role: z.string().min(1, "Role is required").max(60, "Max 60 chars"),
  seniority: z.enum(["junior", "semi-senior", "senior"])
});

export type WorkerFormValues = z.infer<typeof workerFormSchema>;
