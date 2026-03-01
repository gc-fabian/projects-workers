import type { FastifyError, FastifyInstance } from "fastify";
import { AppError } from "../../shared/errors/AppError.js";
import type { ErrorResponseDTO } from "../../shared/http/types.js";

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
      app.log.error({ err, requestId }, "Unhandled error");
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
