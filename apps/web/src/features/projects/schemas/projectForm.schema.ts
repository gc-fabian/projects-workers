import { z } from "zod";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const projectFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    clientName: z.string().min(1, "Client name is required"),
    startDate: z.string().regex(isoDateRegex, "Invalid date format"),
    endDate: z
      .string()
      .regex(isoDateRegex, "Invalid date format")
      .optional()
      .or(z.literal(""))
  })
  .superRefine((data, ctx) => {
    const normalizedEndDate = data.endDate === "" ? undefined : data.endDate;

    if (normalizedEndDate && normalizedEndDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "endDate must be greater than or equal to startDate"
      });
    }
  });

export type ProjectFormValues = {
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
};
