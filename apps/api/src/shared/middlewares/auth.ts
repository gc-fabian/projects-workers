import type { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../errors/AppError.js";
import { isValidAccessToken } from "../../modules/auth/auth.service.js";

export async function requireAuth(req: FastifyRequest, _reply: FastifyReply) {
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";

  if (!token || !isValidAccessToken(token)) {
    throw new UnauthorizedError();
  }
}
