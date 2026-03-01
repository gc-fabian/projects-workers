import { z } from "zod";

export const workerIdParamsSchema = z.object({
  workerId: z.string().uuid()
});

export const workerSenioritySchema = z.enum([
  "junior",
  "semi-senior",
  "senior"
]);

export const workerCreateBodySchema = z.object({
  name: z.string().min(1).max(120),
  role: z.string().min(1).max(60),
  seniority: workerSenioritySchema
});

export const workerUpdateBodySchema = workerCreateBodySchema.partial();
