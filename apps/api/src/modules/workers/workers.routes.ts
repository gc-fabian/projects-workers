import type { FastifyInstance } from "fastify";
import * as controller from "./workers.controller.js";
import { requireAuth } from "../../shared/middlewares/auth.js";

export async function workersRoutes(app: FastifyInstance) {
  app.get("/workers", controller.list);
  app.get("/workers/:workerId", controller.getById);

  app.post("/workers", { preHandler: [requireAuth] }, controller.create);
  app.patch(
    "/workers/:workerId",
    { preHandler: [requireAuth] },
    controller.update
  );
  app.delete(
    "/workers/:workerId",
    { preHandler: [requireAuth] },
    controller.remove
  );
}
