import type { FastifyReply, FastifyRequest } from "fastify";
import { parseOrThrow } from "../../shared/validation/zod.js";
import {
  workerCreateBodySchema,
  workerIdParamsSchema,
  workerUpdateBodySchema
} from "./workers.schemas.js";
import * as service from "./workers.service.js";
import { toWorkerResponseDTO } from "./workers.mappers.js";

type ReqWithBody = FastifyRequest<{ Body: unknown }>;
type ReqWithParams = FastifyRequest<{ Params: unknown }>;

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const body = parseOrThrow(workerCreateBodySchema, (req as ReqWithBody).body);
  const worker = await service.createWorker(body);

  return reply.code(201).send(toWorkerResponseDTO(worker));
}

export async function list(_req: FastifyRequest, reply: FastifyReply) {
  const workers = await service.listWorkers();
  const items = workers.map(toWorkerResponseDTO);

  return reply.send({ items });
}

export async function getById(req: FastifyRequest, reply: FastifyReply) {
  const params = parseOrThrow(
    workerIdParamsSchema,
    (req as ReqWithParams).params
  );

  const worker = await service.getWorker(params.workerId);

  return reply.send(toWorkerResponseDTO(worker));
}

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const params = parseOrThrow(
    workerIdParamsSchema,
    (req as ReqWithParams).params
  );
  const body = parseOrThrow(workerUpdateBodySchema, (req as ReqWithBody).body);

  const worker = await service.updateWorker(params.workerId, body);

  return reply.send(toWorkerResponseDTO(worker));
}

export async function remove(req: FastifyRequest, reply: FastifyReply) {
  const params = parseOrThrow(
    workerIdParamsSchema,
    (req as ReqWithParams).params
  );

  await service.deleteWorker(params.workerId);

  return reply.code(204).send();
}
