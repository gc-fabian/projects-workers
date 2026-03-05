import type { FastifyReply, FastifyRequest } from "fastify";
import { parseOrThrow } from "../../shared/validation/zod";
import { projectIdParamsSchema } from "./projects.schemas";
import { z } from "zod";
import { projectsWorkersService } from "./projectsWorkers.service";

const assignBodySchema = z.object({
  workerId: z.string().uuid()
});

const workerIdParamsSchema = z.object({
  projectId: z.string().uuid(),
  workerId: z.string().uuid()
});

export const projectsWorkersController = {
  async assign(req: FastifyRequest, reply: FastifyReply) {
    const { projectId } = parseOrThrow(projectIdParamsSchema, req.params);
    const { workerId } = parseOrThrow(assignBodySchema, req.body);

    await projectsWorkersService.assign(projectId, workerId);
    return reply.status(204).send();
  },

  async unassign(req: FastifyRequest, reply: FastifyReply) {
    const { projectId, workerId } = parseOrThrow(
      workerIdParamsSchema,
      req.params
    );

    await projectsWorkersService.unassign(projectId, workerId);
    return reply.status(204).send();
  }
};
