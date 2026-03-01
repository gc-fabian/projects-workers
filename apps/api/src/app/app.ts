import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import { randomUUID } from "node:crypto";

import { registerErrorHandler } from "./middlewares/errorHandler.js";
import { registerNotFoundHandler } from "./middlewares/notFound.js";
import { healthRoutes } from "./routes/health.routes.js";

import { authRoutes } from "../modules/auth/auth.routes.js";
import { workersRoutes } from "../modules/workers/workers.routes.js";

export async function buildApp() {
  const app = Fastify({
    logger: true,
    genReqId: (req) => {
      const incoming = req.headers["x-request-id"];
      return typeof incoming === "string" && incoming.trim()
        ? incoming.trim()
        : randomUUID();
    }
  });

  await app.register(helmet);
  await app.register(cors, { origin: true });
  await app.register(sensible);

  // Siempre devolver x-request-id
  app.addHook("onSend", async (req, reply, payload) => {
    reply.header("x-request-id", req.id);
    return payload;
  });

  // 👇 IMPORTANTÍSIMO: handlers antes de registrar plugins/routes
  registerNotFoundHandler(app);
  registerErrorHandler(app);

  await app.register(
    async (v1) => {
      await v1.register(healthRoutes);
      await v1.register(authRoutes);
      await v1.register(workersRoutes);
    },
    { prefix: "/api/v1" }
  );

  return app;
}
