import type { FastifyInstance } from "fastify";
import type { ErrorResponseDTO } from "../../shared/http/types.js";

export function registerNotFoundHandler(app: FastifyInstance) {
  app.setNotFoundHandler((req, reply) => {
    const payload: ErrorResponseDTO = {
      error: {
        code: "NOT_FOUND",
        message: "Route " + req.method + " " + req.url + " not found",
        requestId: String(req.id) // <- si ya usas Fastify req.id
      }
    };

    reply.status(404).send(payload);
  });
}
