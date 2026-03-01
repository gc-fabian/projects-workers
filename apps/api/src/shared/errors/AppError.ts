import type { ErrorDetailDTO } from "../http/types";
import type { ErrorCode } from "./errorCodes";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly status: number;
  public readonly details?: ErrorDetailDTO[];

  constructor(args: {
    code: ErrorCode;
    status: number;
    message: string;
    details?: ErrorDetailDTO[];
  }) {
    super(args.message);
    this.code = args.code;
    this.status = args.status;
    this.details = args.details;
  }
}

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

export class InvalidCredentialsError extends AppError {
  constructor(message = "Invalid credentials") {
    super({ code: "INVALID_CREDENTIALS", status: 401, message });
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super({ code: "NOT_FOUND", status: 404, message });
  }
}

export class InternalError extends AppError {
  constructor(message = "Internal error") {
    super({ code: "INTERNAL_ERROR", status: 500, message });
  }
}
