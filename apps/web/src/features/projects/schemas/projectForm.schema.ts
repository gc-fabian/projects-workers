import { z } from "zod";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const projectFormSchema = z
  .object({
    name: z.string().min(1),
    clientName: z.string().min(1),
    startDate: z.string().regex(isoDateRegex),
    endDate: z.string().regex(isoDateRegex).optional()
  })
  .refine((data) => !data.endDate || data.endDate >= data.startDate, {
    path: ["endDate"],
    message: "endDate must be greater than or equal to startDate"
  });
