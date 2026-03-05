import { FastifyInstance } from "fastify";
import { projectsController } from "./projects.controller";
import { requireAuth } from "../../shared/middlewares/auth";
import { projectsWorkersController } from "./projectsWorkers.controller";

export async function projectsRoutes(app: FastifyInstance) {
  app.get("/projects", projectsController.list);
  app.get("/projects/:projectId", projectsController.getById);

  app.post(
    "/projects",
    { preHandler: [requireAuth] },
    projectsController.create
  );

  app.patch(
    "/projects/:projectId",
    { preHandler: [requireAuth] },
    projectsController.update
  );
  app.delete(
    "/projects/:projectId",
    { preHandler: [requireAuth] },
    projectsController.remove
  );
  app.post(
    "/projects/:projectId/workers",
    { preHandler: [requireAuth] },
    projectsWorkersController.assign
  );

  app.delete(
    "/projects/:projectId/workers/:workerId",
    { preHandler: [requireAuth] },
    projectsWorkersController.unassign
  );
}
