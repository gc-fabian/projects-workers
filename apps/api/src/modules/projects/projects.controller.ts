import { FastifyReply, FastifyRequest } from "fastify";
import { projectsService } from "./projects.service.js";
import { parseOrThrow } from "../../shared/validation/zod";
import {
  createProjectSchema,
  updateProjectSchema,
  projectIdParamsSchema
} from "./projects.schemas";
import { mapProjectToDTO } from "./projects.mappers";

export const projectsController = {
  async create(req: FastifyRequest, reply: FastifyReply) {
    req.log.info({ step: "C1" }, "controller.create start");

    const body = parseOrThrow(createProjectSchema, req.body);
    req.log.info({ step: "C2", body }, "body parsed");

    const project = await projectsService.create(body);
    req.log.info({ step: "C3", projectId: project?.id }, "service.create done");

    const dto = mapProjectToDTO(project);
    req.log.info({ step: "C4" }, "mapped to dto");

    return reply.code(201).send(dto);
  },

  async list(_: FastifyRequest, reply: FastifyReply) {
    const projects = await projectsService.list();
    reply.send({
      items: projects.map(mapProjectToDTO)
    });
  },

  async getById(req: FastifyRequest, reply: FastifyReply) {
    const { projectId } = parseOrThrow(projectIdParamsSchema, req.params);
    const project = await projectsService.getById(projectId);
    reply.send(mapProjectToDTO(project));
  },

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { projectId } = parseOrThrow(projectIdParamsSchema, req.params);
    const body = parseOrThrow(updateProjectSchema, req.body);
    const project = await projectsService.update(projectId, body);
    reply.send(mapProjectToDTO(project));
  },

  async remove(req: FastifyRequest, reply: FastifyReply) {
    const { projectId } = parseOrThrow(projectIdParamsSchema, req.params);
    await projectsService.remove(projectId);
    reply.status(204).send();
  }
};
