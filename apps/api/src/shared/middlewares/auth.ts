import type { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../errors/AppError";

export async function requireAuth(req: FastifyRequest, _reply: FastifyReply) {
  req.log.info({ step: "AUTH" }, "requireAuth");
  const auth = req.headers.authorization ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token || token !== "dev-token") {
    throw new UnauthorizedError();
  }

  return;
}
