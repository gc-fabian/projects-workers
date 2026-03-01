import type { FastifyRequest } from "fastify";
import { UnauthorizedError } from "../errors/AppError.js";

export type RequestWithAuthHeader = FastifyRequest & {
  headers: {
    authorization?: string;
  };
};

export function requireAuth(req: RequestWithAuthHeader) {
  const header = req.headers.authorization ?? "";
  const expected = "Bearer dev-token";
  if (header !== expected) throw new UnauthorizedError();
}
