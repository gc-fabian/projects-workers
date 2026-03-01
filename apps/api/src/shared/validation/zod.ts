import type { ZodError, ZodSchema } from "zod";
import { ValidationError } from "../errors/AppError";

function zodToDetails(err: ZodError) {
  return err.issues.map((i) => ({
    field: i.path.join(".") || "body",
    reason: i.code
  }));
}

export function parseOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError("Validation error", zodToDetails(result.error));
  }
  return result.data;
}
