import type { FastifyReply, FastifyRequest } from "fastify";
import { parseOrThrow } from "../../shared/validation/zod.js";
import { loginBodySchema } from "./auth.schemas.js";
import * as service from "./auth.service.js";

type ReqWithBody = FastifyRequest & { body: unknown };

export async function login(req: FastifyRequest, reply: FastifyReply) {
  const body = parseOrThrow(loginBodySchema, (req as ReqWithBody).body);
  const result = await service.login(body);
  return reply.send(result);
}
