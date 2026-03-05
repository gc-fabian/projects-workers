import type { ProjectCreateDTO, ProjectUpdateDTO } from "./projects.dtos";
import { projectsRepository } from "./projects.repository";
import { ValidationError, NotFoundError, ConflictError } from "../../shared/errors/AppError.js";

/**
 * Valida YYYY-MM-DD y devuelve Date (UTC 00:00:00.000Z)
 * Esto evita timezone drift en ambientes con TZ local distinta.
 */
function normalizeDate(date: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new ValidationError("Invalid date format. Expected YYYY-MM-DD");
  }

  const d = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) {
    throw new ValidationError("Invalid date value");
  }
  return d;
}

function assertEndAfterStart(start: Date, end: Date | null) {
  if (!end) return;
  if (end.getTime() < start.getTime()) {
    throw new ValidationError("endDate must be >= startDate");
  }
}

// Prisma P2002 -> ConflictError (shape check, no instanceof)
function prismaUniqueToConflict(e: unknown): never {
  const anyErr = e as { code?: unknown; meta?: unknown; name?: unknown; message?: unknown };

  if (anyErr && typeof anyErr === "object" && anyErr.code === "P2002") {
    throw new ConflictError(
      "PROJECT_ALREADY_EXISTS",
      "Project already exists (name+clientName+startDate)"
    );
  }

  throw e;
}

export const projectsService = {
  async create(data: ProjectCreateDTO) {
    const startDate = normalizeDate(data.startDate);
    const endDate = data.endDate ? normalizeDate(data.endDate) : null;

    assertEndAfterStart(startDate, endDate);

    try {
      return await projectsRepository.create({
        name: data.name,
        clientName: data.clientName,
        startDate,
        endDate,
      });
    } catch (e) {
      prismaUniqueToConflict(e);
    }
  },

  async list() {
    return projectsRepository.findMany();
  },

  async getById(id: string) {
    const project = await projectsRepository.findById(id);
    if (!project) throw new NotFoundError("Project not found");
    return project;
  },

  async update(id: string, data: ProjectUpdateDTO) {
    const current = await this.getById(id);

    const startDate =
      data.startDate !== undefined ? normalizeDate(data.startDate) : current.startDate;

    const endDate =
      data.endDate !== undefined
        ? data.endDate
          ? normalizeDate(data.endDate)
          : null
        : current.endDate;

    assertEndAfterStart(startDate, endDate);

    try {
      return await projectsRepository.update(id, {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.clientName !== undefined ? { clientName: data.clientName } : {}),
        ...(data.startDate !== undefined ? { startDate } : {}),
        ...(data.endDate !== undefined ? { endDate } : {}),
      });
    } catch (e) {
      prismaUniqueToConflict(e);
    }
  },

  async remove(id: string) {
    await this.getById(id);
    await projectsRepository.delete(id);
  },
};