import { AppError } from "./AppError.js";
import type { ErrorDetailDTO } from "../http/types.js";

export class ValidationError extends AppError {
  constructor(message: string, details?: ErrorDetailDTO[]) {
    super({ code: "VALIDATION_ERROR", status: 400, message, details });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super({ code: "UNAUTHORIZED", status: 401, message });
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super({ code: "NOT_FOUND", status: 404, message });
  }
}

export class BadRequestError extends Error {
  statusCode = 400 as const;
  code = "BAD_REQUEST" as const;
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class ConflictError extends Error {
  statusCode = 409 as const;
  code = "CONFLICT" as const;
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}
