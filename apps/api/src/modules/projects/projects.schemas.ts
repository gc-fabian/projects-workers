import { z } from "zod";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const baseProjectSchema = z.object({
  name: z.string().trim().min(1).max(120),
  clientName: z.string().trim().min(1).max(120),
  startDate: z.string().regex(isoDateRegex),
  endDate: z.string().regex(isoDateRegex).optional()
});

type ProjectDates = {
  startDate?: string;
  endDate?: string;
};

const withEndDateRule = <T extends z.ZodType<ProjectDates>>(schema: T) =>
  schema.superRefine((data, ctx) => {
    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "endDate must be greater than or equal to startDate"
      });
    }
  });
export const createProjectSchema = withEndDateRule(baseProjectSchema);

export const updateProjectSchema = withEndDateRule(baseProjectSchema.partial());

export const projectIdParamsSchema = z.object({
  projectId: z.string().uuid()
});
