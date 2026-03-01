import type { FastifyInstance } from "fastify";
import * as controller from "./workers.controller.js";

export async function workersRoutes(app: FastifyInstance) {
  app.get("/workers", controller.list);
  app.get("/workers/:workerId", controller.getById);
  app.post("/workers", controller.create);
  app.patch("/workers/:workerId", controller.update);
  app.delete("/workers/:workerId", controller.remove);
}
