import type { FastifyInstance } from "fastify";
import * as controller from "./auth.controller.js";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", controller.login);
}
