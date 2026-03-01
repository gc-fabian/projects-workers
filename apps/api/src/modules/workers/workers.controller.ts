import type { FastifyReply, FastifyRequest } from "fastify";
import {
  requireAuth,
  type RequestWithAuthHeader
} from "../../shared/middlewares/auth.js";
import { parseOrThrow } from "../../shared/validation/zod.js";
import {
  workerCreateBodySchema,
  workerIdParamsSchema,
  workerUpdateBodySchema
} from "./workers.schemas.js";
import * as service from "./workers.service.js";

type ReqWithBody = FastifyRequest & { body: unknown };
type ReqWithParams = FastifyRequest & { params: unknown };

export async function create(req: FastifyRequest, reply: FastifyReply) {
  requireAuth(req as RequestWithAuthHeader);
  const body = parseOrThrow(workerCreateBodySchema, (req as ReqWithBody).body);
  const worker = await service.createWorker(body);
  return reply.code(201).send(worker);
}

export async function list(_req: FastifyRequest, reply: FastifyReply) {
  const items = await service.listWorkers();
  return reply.send({ items });
}

export async function getById(req: FastifyRequest, reply: FastifyReply) {
  const params = parseOrThrow(
    workerIdParamsSchema,
    (req as ReqWithParams).params
  );
  const worker = await service.getWorker(params.workerId);
  return reply.send(worker);
}

export async function update(req: FastifyRequest, reply: FastifyReply) {
  requireAuth(req as RequestWithAuthHeader);
  const params = parseOrThrow(
    workerIdParamsSchema,
    (req as ReqWithParams).params
  );
  const body = parseOrThrow(workerUpdateBodySchema, (req as ReqWithBody).body);
  const worker = await service.updateWorker(params.workerId, body);
  return reply.send(worker);
}

export async function remove(req: FastifyRequest, reply: FastifyReply) {
  requireAuth(req as RequestWithAuthHeader);
  const params = parseOrThrow(
    workerIdParamsSchema,
    (req as ReqWithParams).params
  );
  await service.deleteWorker(params.workerId);
  return reply.code(204).send();
}
