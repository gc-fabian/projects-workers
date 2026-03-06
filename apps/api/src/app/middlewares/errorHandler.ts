import type { FastifyError, FastifyInstance } from "fastify";
import { AppError } from "../../shared/errors/AppError.js";
import type { ErrorResponseDTO } from "../../shared/http/types.js";

type ErrorWithStatusCode = Error & {
  statusCode?: number;
};

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err: FastifyError | Error, req, reply) => {
    const requestId = String(req.id);

    let status = 500;
    let code: ErrorResponseDTO["error"]["code"] = "INTERNAL_ERROR";
    let message = "Internal error";
    let details: ErrorResponseDTO["error"]["details"] | undefined;

    if (err instanceof AppError) {
      status = err.status;
      code = err.code;
      message = err.message;
      details = err.details;
    } else {
      const fastifyErr = err as ErrorWithStatusCode;

      if (typeof fastifyErr.statusCode === "number") {
        status = fastifyErr.statusCode;
        code = status >= 500 ? "INTERNAL_ERROR" : "VALIDATION_ERROR";
        message =
          err.message ||
          (status >= 500 ? "Internal error" : "Validation error");

        app.log.warn({ err, requestId }, "Non-domain error");
      } else {
        app.log.error({ err, requestId }, "Unhandled error");
      }
    }

    const payload: ErrorResponseDTO = {
      error: {
        code,
        message,
        ...(details ? { details } : {}),
        requestId
      }
    };

    reply.status(status).send(payload);
  });
}
