import type { FastifyPluginAsync } from "fastify";

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", async (req, reply) => {
    return reply.send({
      status: "ok",
      requestId: String(req.id)
    });
  });
};
