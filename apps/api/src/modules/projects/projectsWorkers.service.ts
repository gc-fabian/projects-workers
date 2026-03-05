import { projectsWorkersRepository } from "./projectsWorkers.repository";
import { ConflictError, NotFoundError } from "../../shared/errors/AppError";

export const projectsWorkersService = {
  async assign(projectId: string, workerId: string) {
    const [projectOk, workerOk] = await Promise.all([
      projectsWorkersRepository.projectExists(projectId),
      projectsWorkersRepository.workerExists(workerId)
    ]);

    if (!projectOk) throw new NotFoundError("Project not found");
    if (!workerOk) throw new NotFoundError("Worker not found");

    const already = await projectsWorkersRepository.assignmentExists(
      projectId,
      workerId
    );
    if (already)
      throw new ConflictError(
        "ASSIGNMENT_ALREADY_EXISTS",
        "Assignment already exists"
      );

    await projectsWorkersRepository.createAssignment(projectId, workerId);
  },

  async unassign(projectId: string, workerId: string) {
    const [projectOk, workerOk] = await Promise.all([
      projectsWorkersRepository.projectExists(projectId),
      projectsWorkersRepository.workerExists(workerId)
    ]);

    if (!projectOk) throw new NotFoundError("Project not found");
    if (!workerOk) throw new NotFoundError("Worker not found");

    const exists = await projectsWorkersRepository.assignmentExists(
      projectId,
      workerId
    );
    if (!exists) throw new NotFoundError("Assignment not found");

    await projectsWorkersRepository.deleteAssignment(projectId, workerId);
  }
};
