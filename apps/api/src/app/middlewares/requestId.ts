import type { FastifyPluginAsync } from "fastify";
import { randomUUID } from "node:crypto";

declare module "fastify" {
  interface FastifyRequest {
    requestId: string;
  }
}

export const requestIdPlugin: FastifyPluginAsync = async (app) => {
  app.addHook("onRequest", async (req, reply) => {
    const incoming = req.headers["x-request-id"];
    const requestId =
      typeof incoming === "string" && incoming.trim()
        ? incoming.trim()
        : randomUUID();

    // Fuente de verdad
    req.requestId = requestId;

    // Garantiza disponibilidad en handlers posteriores
    req.headers["x-request-id"] = requestId;

    // Y lo devolvemos siempre
    reply.header("x-request-id", requestId);
  });
};
