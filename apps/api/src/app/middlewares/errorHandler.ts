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

    // 1) Errores de dominio (los tuyos)
    if (err instanceof AppError) {
      status = err.status;
      code = err.code;
      message = err.message;
      details = err.details;
    }
    // 2) Errores propios de Fastify (JSON inválido, etc.)
    else if (typeof (err as any)?.statusCode === "number") {
      status = (err as any).statusCode;

      // Si quieres mapear más fino después, aquí es el lugar.
      code = status >= 500 ? "INTERNAL_ERROR" : "VALIDATION_ERROR";
      message = err.message || (status >= 500 ? "Internal error" : "Validation error");

      // Logueamos igual, pero no lo tratamos como 500
      app.log.warn({ err, requestId }, "Non-domain error");
    }
    // 3) Unknown -> 500
    else {
      app.log.error({ err, requestId }, "Unhandled error");
    }

    const payload: ErrorResponseDTO = {
      error: {
        code,
        message,
        ...(details ? { details } : {}),
        requestId,
      },
    };

    reply.status(status).send(payload);
  });
}