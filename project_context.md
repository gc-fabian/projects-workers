# Project Context Package

- Generated at: 2026-03-05T00:21:41-03:00
- Root: `.` (current directory)

## Rules Used

- max_depth: 8
- max_file_size_kb: 200
- ignore_dirs: ['.cache', '.git', '.next', '.turbo', '__pycache__', 'build', 'coverage', 'dist', 'node_modules', 'out', 'target', 'vendor']
- ignore_file_patterns: ['*.log', '*.lock', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', '*.png', '*.jpg', '*.jpeg', '*.gif', '*.pdf', '*.zip', '*.tar', '*.gz', '*.exe', '*.dll', '*.so', '*.bin']
- allowed_exts: ['.js', '.json', '.jsx', '.md', '.prisma', '.sql', '.ts', '.tsx', '.yaml', '.yml']
- allowed_suffixes: ['.env.example']

## Included Tree

```text
.
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   │   ├── migrations/
│   │   │   │   ├── 20260228192745_init_workers/
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20260301024743_projects_crud/
│   │   │   │   │   └── migration.sql
│   │   │   │   └── 20260301205623/
│   │   │   │       └── migration.sql
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── middlewares/
│   │   │   │   │   ├── errorHandler.ts
│   │   │   │   │   ├── notFound.ts
│   │   │   │   │   └── requestId.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── health.routes.ts
│   │   │   │   ├── app.ts
│   │   │   │   └── server.ts
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── auth.controller.ts
│   │   │   │   │   ├── auth.routes.ts
│   │   │   │   │   ├── auth.schemas.ts
│   │   │   │   │   └── auth.service.ts
│   │   │   │   ├── projects/
│   │   │   │   │   ├── projects.controller.ts
│   │   │   │   │   ├── projects.dtos.ts
│   │   │   │   │   ├── projects.mappers.ts
│   │   │   │   │   ├── projects.repository.ts
│   │   │   │   │   ├── projects.routes.ts
│   │   │   │   │   ├── projects.schemas.ts
│   │   │   │   │   ├── projects.service.ts
│   │   │   │   │   ├── projectsWorkers.controller.ts
│   │   │   │   │   ├── projectsWorkers.repository.ts
│   │   │   │   │   └── projectsWorkers.service.ts
│   │   │   │   └── workers/
│   │   │   │       ├── workers.controller.ts
│   │   │   │       ├── workers.dtos.ts
│   │   │   │       ├── workers.mappers.ts
│   │   │   │       ├── workers.repository.ts
│   │   │   │       ├── workers.routes.ts
│   │   │   │       ├── workers.schemas.ts
│   │   │   │       └── workers.service.ts
│   │   │   └── shared/
│   │   │       ├── db/
│   │   │       │   └── prisma.ts
│   │   │       ├── errors/
│   │   │       │   ├── AppError.ts
│   │   │       │   ├── HttpErrors.ts
│   │   │       │   └── errorCodes.ts
│   │   │       ├── http/
│   │   │       │   └── types.ts
│   │   │       ├── middlewares/
│   │   │       │   └── auth.ts
│   │   │       └── validation/
│   │   │           └── zod.ts
│   │   ├── .env.example
│   │   ├── eslint.config.js
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   └── web/
│       ├── src/
│       │   ├── features/
│       │   │   └── projects/
│       │   │       ├── api/
│       │   │       │   ├── projectsApi.js
│       │   │       │   └── projectsApi.ts
│       │   │       ├── components/
│       │   │       │   ├── ProjectModal.js
│       │   │       │   └── ProjectModal.tsx
│       │   │       ├── hooks/
│       │   │       │   ├── useProjects.js
│       │   │       │   └── useProjects.ts
│       │   │       ├── pages/
│       │   │       │   ├── ProjectsListPage.js
│       │   │       │   └── ProjectsListPage.tsx
│       │   │       ├── schemas/
│       │   │       │   ├── projectForm.schema.js
│       │   │       │   └── projectForm.schema.ts
│       │   │       └── types/
│       │   │           ├── projects.js
│       │   │           └── projects.ts
│       │   ├── shared/
│       │   │   └── api/
│       │   │       ├── http.js
│       │   │       └── http.ts
│       │   ├── App.js
│       │   ├── App.tsx
│       │   ├── main.js
│       │   ├── main.tsx
│       │   └── vite-env.d.ts
│       ├── eslint.config.js
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── package.json
├── project_context.md
└── tsconfig.base.json
```

## File Contents

```text
=== apps/api/.env.example ===
PORT=3000
HOST=0.0.0.0
DATABASE_URL="file:./prisma/dev.db"
```

```text
=== apps/api/eslint.config.js ===
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["dist/**", "node_modules/**"]
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  // ✅ forzamos root del tsconfig en ESTE workspace
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname
      }
    }
  },

  prettierConfig,

  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "error"
    }
  }
];
```

```text
=== apps/api/package.json ===
{
  "name": "@app/api",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "dist/app/server.js",
  "scripts": {
    "dev": "tsx watch src/app/server.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/app/server.js",
    "test": "vitest run",
    "lint": "eslint .",
    "format": "prettier -w .",
    "format:check": "prettier -c .",

    "prisma:generate": "prisma generate --schema prisma/schema.prisma",
    "prisma:migrate:dev": "prisma migrate dev --schema prisma/schema.prisma",
    "prisma:migrate:reset": "prisma migrate reset --force --skip-seed --schema prisma/schema.prisma",
    "prisma:migrate:deploy": "prisma migrate deploy --schema prisma/schema.prisma",
    "prisma:studio": "prisma studio --schema prisma/schema.prisma"
  },
  "dependencies": {
    "@fastify/cors": "^11.2.0",
    "@fastify/helmet": "^13.0.2",
    "@fastify/sensible": "^6.0.4",
    "@prisma/client": "^6.19.2",
    "dotenv": "^17.3.1",
    "fastify": "^5.7.4",
    "pino": "^10.3.1",
    "pino-pretty": "^13.1.3",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@types/node": "^25.3.3",
    "eslint": "^10.0.2",
    "prettier": "^3.8.1",
    "prisma": "^6.19.2",
    "tsx": "^4.21.0",
    "typescript": "^5.9.3",
    "vitest": "^4.0.18"
  }
}
```

```text
=== apps/api/prisma/migrations/20260228192745_init_workers/migration.sql ===
-- CreateTable
CREATE TABLE "Worker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "seniority" TEXT NOT NULL
);
```

```text
=== apps/api/prisma/migrations/20260301024743_projects_crud/migration.sql ===
/*
  Warnings:

  - You are about to drop the `Worker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Worker";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "workers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "seniority" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME
);

-- CreateTable
CREATE TABLE "project_workers" (
    "projectId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,

    PRIMARY KEY ("projectId", "workerId"),
    CONSTRAINT "project_workers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "project_workers_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "workers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
```

```text
=== apps/api/prisma/migrations/20260301205623/migration.sql ===
/*
  Warnings:

  - A unique constraint covering the columns `[name,clientName,startDate]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "projects_name_clientName_startDate_key" ON "projects"("name", "clientName", "startDate");
```

```text
=== apps/api/prisma/schema.prisma ===
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

enum Seniority {
  junior
  semiSenior
  senior
}

model Worker {
  id        String @id @default(uuid())
  name      String
  role      String
  seniority Seniority

  projectWorkers ProjectWorker[]

  @@map("workers")
}

model Project {
  id         String    @id @default(uuid())
  name       String
  clientName String
  startDate  DateTime
  endDate    DateTime?

  workers ProjectWorker[]

  @@map("projects")
  @@unique([name, clientName, startDate])
}

model ProjectWorker {
  projectId String
  workerId  String

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  worker  Worker  @relation(fields: [workerId], references: [id], onDelete: Cascade)

  @@id([projectId, workerId])
  @@map("project_workers")
}
```

```text
=== apps/api/src/app/app.ts ===
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import { projectsRoutes } from "../modules/projects/projects.routes";
import { randomUUID } from "node:crypto";

import { registerErrorHandler } from "./middlewares/errorHandler.js";
import { registerNotFoundHandler } from "./middlewares/notFound.js";
import { healthRoutes } from "./routes/health.routes.js";

import { authRoutes } from "../modules/auth/auth.routes.js";
import { workersRoutes } from "../modules/workers/workers.routes.js";

export async function buildApp() {
  const app = Fastify({
    logger: true,
    genReqId: (req) => {
      const incoming = req.headers["x-request-id"];
      return typeof incoming === "string" && incoming.trim()
        ? incoming.trim()
        : randomUUID();
    }
  });

  await app.register(helmet);
  await app.register(cors, { origin: true });
  await app.register(sensible);

  // Siempre devolver x-request-id
  app.addHook("onSend", async (req, reply, payload) => {
    reply.header("x-request-id", req.id);
    return payload;
  });

  app.addHook("onRequest", async (req) => {
    req.log.info({ step: "H_onRequest" }, "hook");
  });

  app.addHook("preParsing", async (req) => {
    req.log.info({ step: "H_preParsing" }, "hook");
  });

  app.addHook("preValidation", async (req) => {
    req.log.info({ step: "H_preValidation" }, "hook");
  });

  app.addHook("preHandler", async (req) => {
    req.log.info({ step: "H_preHandler" }, "hook");
  });

  app.addHook("onResponse", async (req, reply) => {
    req.log.info({ step: "H_onResponse", status: reply.statusCode }, "hook");
  });

  registerNotFoundHandler(app);
  registerErrorHandler(app);

  await app.register(
    async (v1) => {
      await v1.register(healthRoutes);
      await v1.register(authRoutes);
      await v1.register(workersRoutes);
      await v1.register(projectsRoutes);
    },
    { prefix: "/api/v1" }
  );

  return app;
}
```

```text
=== apps/api/src/app/middlewares/errorHandler.ts ===
import type { FastifyError, FastifyInstance } from "fastify";
import { AppError } from "../../shared/errors/AppError.js";
import type { ErrorResponseDTO } from "../../shared/http/types.js";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err: FastifyError | Error, req, reply) => {
    const requestId = String(req.id);

    let status = 500;
    let code: ErrorResponseDTO["error"]["code"] = "INTERNAL_ERROR";
    let message = "Internal error";
    let details: ErrorResponseDTO["error"]["details"] | undefined;

    // 1) Errores de dominio (los tuyos)
    if (err instanceof AppError) {
      status = err.status;
      code = err.code;
      message = err.message;
      details = err.details;
    }
    // 2) Errores propios de Fastify (JSON inválido, etc.)
    else if (typeof (err as any)?.statusCode === "number") {
      status = (err as any).statusCode;

      // Si quieres mapear más fino después, aquí es el lugar.
      code = status >= 500 ? "INTERNAL_ERROR" : "VALIDATION_ERROR";
      message = err.message || (status >= 500 ? "Internal error" : "Validation error");

      // Logueamos igual, pero no lo tratamos como 500
      app.log.warn({ err, requestId }, "Non-domain error");
    }
    // 3) Unknown -> 500
    else {
      app.log.error({ err, requestId }, "Unhandled error");
    }

    const payload: ErrorResponseDTO = {
      error: {
        code,
        message,
        ...(details ? { details } : {}),
        requestId,
      },
    };

    reply.status(status).send(payload);
  });
}
```

```text
=== apps/api/src/app/middlewares/notFound.ts ===
import type { FastifyInstance } from "fastify";
import type { ErrorResponseDTO } from "../../shared/http/types.js";

export function registerNotFoundHandler(app: FastifyInstance) {
  app.setNotFoundHandler((req, reply) => {
    const payload: ErrorResponseDTO = {
      error: {
        code: "NOT_FOUND",
        message: "Route " + req.method + " " + req.url + " not found",
        requestId: String(req.id) // <- si ya usas Fastify req.id
      }
    };

    reply.status(404).send(payload);
  });
}
```

```text
=== apps/api/src/app/middlewares/requestId.ts ===
import type { FastifyPluginAsync } from "fastify";
import { randomUUID } from "node:crypto";

declare module "fastify" {
  interface FastifyRequest {
    requestId: string;
  }
}

export const requestIdPlugin: FastifyPluginAsync = async (app) => {
  app.addHook("onRequest", async (req, reply) => {
    const incoming = req.headers["x-request-id"];
    const requestId =
      typeof incoming === "string" && incoming.trim()
        ? incoming.trim()
        : randomUUID();

    // Fuente de verdad
    req.requestId = requestId;

    // Garantiza disponibilidad en handlers posteriores
    req.headers["x-request-id"] = requestId;

    // Y lo devolvemos siempre
    reply.header("x-request-id", requestId);
  });
};
```

```text
=== apps/api/src/app/routes/health.routes.ts ===
import type { FastifyPluginAsync } from "fastify";

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", async (req, reply) => {
    return reply.send({
      status: "ok",
      requestId: String(req.id)
    });
  });
};
```

```text
=== apps/api/src/app/server.ts ===
import "dotenv/config";

import { buildApp } from "./app.js";

const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "0.0.0.0";

const app = await buildApp();

try {
  await app.listen({ port: PORT, host: HOST });
  app.log.info(`API listening on http://${HOST}:${PORT}/api/v1`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
```

```text
=== apps/api/src/modules/auth/auth.controller.ts ===
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
```

```text
=== apps/api/src/modules/auth/auth.routes.ts ===
import type { FastifyInstance } from "fastify";
import * as controller from "./auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", controller.login);
}
```

```text
=== apps/api/src/modules/auth/auth.schemas.ts ===
import { z } from "zod";

export const loginBodySchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

export type LoginBody = z.infer<typeof loginBodySchema>;
```

```text
=== apps/api/src/modules/auth/auth.service.ts ===
import { InvalidCredentialsError } from "../../shared/errors/AppError";
import type { LoginBody } from "./auth.schemas";

export function login(body: LoginBody) {
  if (body.username !== "admin" || body.password !== "admin123") {
    throw new InvalidCredentialsError();
  }
  return { accessToken: "dev-token", tokenType: "Bearer", expiresIn: 3600 };
}
```

```text
=== apps/api/src/modules/projects/projects.controller.ts ===
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
```

```text
=== apps/api/src/modules/projects/projects.dtos.ts ===
export interface ProjectCreateDTO {
  name: string;
  clientName: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}

export interface ProjectUpdateDTO {
  name?: string;
  clientName?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}

export interface ProjectListResponseDTO {
  items: ProjectResponseDTO[];
}

export type WorkerInProjectDTO = {
  id: string;
  name: string;
  role: string;
  seniority: string;
};

export type ProjectResponseDTO = {
  id: string;
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
  workers: WorkerInProjectDTO[];
};
```

```text
=== apps/api/src/modules/projects/projects.mappers.ts ===
import type { Prisma } from "@prisma/client";

export type ProjectWithWorkers = Prisma.ProjectGetPayload<{
  include: { workers: { include: { worker: true } } };
}>;

export const mapProjectToDTO = (project: ProjectWithWorkers) => ({
  id: project.id,
  name: project.name,
  clientName: project.clientName,
  startDate: project.startDate.toISOString().slice(0, 10),
  endDate: project.endDate
    ? project.endDate.toISOString().slice(0, 10)
    : undefined,
  workers: project.workers.map((pw) => ({
    id: pw.worker.id,
    name: pw.worker.name,
    role: pw.worker.role,
    seniority: pw.worker.seniority
  }))
});
```

```text
=== apps/api/src/modules/projects/projects.repository.ts ===
import { prisma } from "../../shared/db/prisma";
import type { Prisma } from "@prisma/client";

const withWorkers = {
  workers: { include: { worker: true } }
} satisfies Prisma.ProjectInclude;

export const projectsRepository = {
  create: (data: Prisma.ProjectCreateInput) =>
    prisma.project.create({ data, include: withWorkers }),

  findMany: () =>
    prisma.project.findMany({
      orderBy: { startDate: "desc" },
      include: withWorkers
    }),

  findById: (id: string) =>
    prisma.project.findUnique({
      where: { id },
      include: withWorkers
    }),

  update: (id: string, data: Prisma.ProjectUpdateInput) =>
    prisma.project.update({ where: { id }, data, include: withWorkers }),

  delete: (id: string) => prisma.project.delete({ where: { id } })
};
```

```text
=== apps/api/src/modules/projects/projects.routes.ts ===
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
```

```text
=== apps/api/src/modules/projects/projects.schemas.ts ===
import { z } from "zod";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const baseProjectSchema = z.object({
  name: z.string().trim().min(1).max(120),
  clientName: z.string().trim().min(1).max(120),
  startDate: z.string().regex(isoDateRegex),
  endDate: z.string().regex(isoDateRegex).optional()
});

type ProjectDates = {
  startDate?: string;
  endDate?: string;
};

const withEndDateRule = <T extends z.ZodType<ProjectDates>>(schema: T) =>
  schema.superRefine((data, ctx) => {
    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "endDate must be greater than or equal to startDate"
      });
    }
  });
export const createProjectSchema = withEndDateRule(baseProjectSchema);

export const updateProjectSchema = withEndDateRule(baseProjectSchema.partial());

export const projectIdParamsSchema = z.object({
  projectId: z.string().uuid()
});
```

```text
=== apps/api/src/modules/projects/projects.service.ts ===
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
```

```text
=== apps/api/src/modules/projects/projectsWorkers.controller.ts ===
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
```

```text
=== apps/api/src/modules/projects/projectsWorkers.repository.ts ===
import { prisma } from "../../shared/db/prisma";

export const projectsWorkersRepository = {
  // existe el proyecto?
  projectExists: async (projectId: string) => {
    const p = await prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true }
    });
    return !!p;
  },

  // existe el worker?
  workerExists: async (workerId: string) => {
    const w = await prisma.worker.findUnique({
      where: { id: workerId },
      select: { id: true }
    });
    return !!w;
  },

  // existe la asignación?
  assignmentExists: async (projectId: string, workerId: string) => {
    const pw = await prisma.projectWorker.findUnique({
      where: { projectId_workerId: { projectId, workerId } },
      select: { projectId: true }
    });
    return !!pw;
  },

  createAssignment: (projectId: string, workerId: string) =>
    prisma.projectWorker.create({ data: { projectId, workerId } }),

  deleteAssignment: (projectId: string, workerId: string) =>
    prisma.projectWorker.delete({
      where: { projectId_workerId: { projectId, workerId } }
    })
};
```

```text
=== apps/api/src/modules/projects/projectsWorkers.service.ts ===
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
```

```text
=== apps/api/src/modules/workers/workers.controller.ts ===
import type { FastifyReply, FastifyRequest } from "fastify";
import { requireAuth } from "../../shared/middlewares/auth.js";
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
  await requireAuth(req, reply);

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
  await requireAuth(req, reply);

  const params = parseOrThrow(
    workerIdParamsSchema,
    (req as ReqWithParams).params
  );
  const body = parseOrThrow(workerUpdateBodySchema, (req as ReqWithBody).body);

  const worker = await service.updateWorker(params.workerId, body);

  return reply.send(toWorkerResponseDTO(worker));
}

export async function remove(req: FastifyRequest, reply: FastifyReply) {
  await requireAuth(req, reply);

  const params = parseOrThrow(
    workerIdParamsSchema,
    (req as ReqWithParams).params
  );

  await service.deleteWorker(params.workerId);

  return reply.code(204).send();
}
```

```text
=== apps/api/src/modules/workers/workers.dtos.ts ===
export type WorkerSeniorityDTO = "junior" | "semi-senior" | "senior";

export type WorkerCreateDTO = {
  name: string;
  role: string;
  seniority: WorkerSeniorityDTO;
};

export type WorkerUpdateDTO = Partial<WorkerCreateDTO>;

export type WorkerResponseDTO = {
  id: string;
  name: string;
  role: string;
  seniority: WorkerSeniorityDTO;
};

export type WorkerListResponseDTO = { items: WorkerResponseDTO[] };
```

```text
=== apps/api/src/modules/workers/workers.mappers.ts ===
import type { Seniority, Worker } from "@prisma/client";
import type { WorkerResponseDTO, WorkerSeniorityDTO } from "./workers.dtos";

export function toDtoSeniority(s: Seniority): WorkerSeniorityDTO {
  if (s === "semiSenior") return "semi-senior";
  return s; // junior | senior
}

export function toDbSeniority(s: WorkerSeniorityDTO): Seniority {
  if (s === "semi-senior") return "semiSenior";
  return s;
}

export function toWorkerResponseDTO(worker: Worker): WorkerResponseDTO {
  return {
    id: worker.id,
    name: worker.name,
    role: worker.role,
    seniority: toDtoSeniority(worker.seniority)
  };
}
```

```text
=== apps/api/src/modules/workers/workers.repository.ts ===
import type { Prisma, Worker } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";

export async function create(data: Prisma.WorkerCreateInput): Promise<Worker> {
  return prisma.worker.create({ data });
}

export async function list(): Promise<Worker[]> {
  return prisma.worker.findMany({ orderBy: { name: "asc" } });
}

export async function getById(id: string): Promise<Worker | null> {
  return prisma.worker.findUnique({ where: { id } });
}

export async function update(
  id: string,
  data: Prisma.WorkerUpdateInput
): Promise<Worker | null> {
  try {
    return await prisma.worker.update({ where: { id }, data });
  } catch {
    return null;
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    await prisma.worker.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
```

```text
=== apps/api/src/modules/workers/workers.routes.ts ===
import type { FastifyInstance } from "fastify";
import * as controller from "./workers.controller.js";

export async function workersRoutes(app: FastifyInstance) {
  app.get("/workers", controller.list);
  app.get("/workers/:workerId", controller.getById);
  app.post("/workers", controller.create);
  app.patch("/workers/:workerId", controller.update);
  app.delete("/workers/:workerId", controller.remove);
}
```

```text
=== apps/api/src/modules/workers/workers.schemas.ts ===
import { z } from "zod";

export const workerIdParamsSchema = z.object({
  workerId: z.string().uuid()
});

export const workerSenioritySchema = z.enum([
  "junior",
  "semi-senior",
  "senior"
]);

export const workerCreateBodySchema = z.object({
  name: z.string().min(1).max(120),
  role: z.string().min(1).max(60),
  seniority: workerSenioritySchema
});

export const workerUpdateBodySchema = workerCreateBodySchema.partial();
```

```text
=== apps/api/src/modules/workers/workers.service.ts ===
import { NotFoundError } from "../../shared/errors/AppError.js";
import type { WorkerCreateDTO, WorkerUpdateDTO } from "./workers.dtos.js";
import * as repo from "./workers.repository.js";
import { toDbSeniority } from "./workers.mappers.js";

// Tipo de update para repo (shape DB)
type WorkerUpdateData = {
  name?: string;
  role?: string;
  seniority?: ReturnType<typeof toDbSeniority>;
};

export async function createWorker(dto: WorkerCreateDTO) {
  return repo.create({
    name: dto.name,
    role: dto.role,
    seniority: toDbSeniority(dto.seniority)
  });
}

export async function listWorkers() {
  return repo.list();
}

export async function getWorker(workerId: string) {
  const w = await repo.getById(workerId);
  if (!w) throw new NotFoundError("Worker not found");
  return w;
}

export async function updateWorker(workerId: string, dto: WorkerUpdateDTO) {
  const data: WorkerUpdateData = {};

  if (dto.name !== undefined) data.name = dto.name;
  if (dto.role !== undefined) data.role = dto.role;
  if (dto.seniority !== undefined) {
    data.seniority = toDbSeniority(dto.seniority);
  }

  const w = await repo.update(workerId, data);
  if (!w) throw new NotFoundError("Worker not found");
  return w;
}

export async function deleteWorker(workerId: string) {
  const ok = await repo.remove(workerId);
  if (!ok) throw new NotFoundError("Worker not found");
}
```

```text
=== apps/api/src/shared/db/prisma.ts ===
console.log("[DB]", { cwd: process.cwd(), url: process.env.DATABASE_URL });

import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
```

```text
=== apps/api/src/shared/errors/AppError.ts ===
import type { ErrorDetailDTO } from "../http/types";
import type { ErrorCode } from "./errorCodes";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly status: number;
  public readonly details?: ErrorDetailDTO[];

  constructor(args: {
    code: ErrorCode;
    status: number;
    message: string;
    details?: ErrorDetailDTO[];
  }) {
    super(args.message);
    this.code = args.code;
    this.status = args.status;
    this.details = args.details;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: ErrorDetailDTO[]) {
    super({ code: "VALIDATION_ERROR", status: 400, message, details });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super({ code: "UNAUTHORIZED", status: 401, message });
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message = "Invalid credentials") {
    super({ code: "INVALID_CREDENTIALS", status: 401, message });
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super({ code: "NOT_FOUND", status: 404, message });
  }
}

export class InternalError extends AppError {
  constructor(message = "Internal error") {
    super({ code: "INTERNAL_ERROR", status: 500, message });
  }
}

export class ConflictError extends AppError {
  constructor(code: "ASSIGNMENT_ALREADY_EXISTS" | "PROJECT_ALREADY_EXISTS", message: string) {
    super({ code, status: 409, message });
  }
}
```

```text
=== apps/api/src/shared/errors/HttpErrors.ts ===
import { AppError } from "./AppError.js";
import type { ErrorDetailDTO } from "../http/types.js";

export class ValidationError extends AppError {
  constructor(message: string, details?: ErrorDetailDTO[]) {
    super({ code: "VALIDATION_ERROR", status: 400, message, details });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super({ code: "UNAUTHORIZED", status: 401, message });
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super({ code: "NOT_FOUND", status: 404, message });
  }
}

export class BadRequestError extends Error {
  statusCode = 400 as const;
  code = "BAD_REQUEST" as const;
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class ConflictError extends Error {
  statusCode = 409 as const;
  code = "CONFLICT" as const;
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}
```

```text
=== apps/api/src/shared/errors/errorCodes.ts ===
export const ErrorCode = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  ASSIGNMENT_ALREADY_EXISTS: "ASSIGNMENT_ALREADY_EXISTS",
  PROJECT_ALREADY_EXISTS: "PROJECT_ALREADY_EXISTS"
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
```

```text
=== apps/api/src/shared/http/types.ts ===
export type ErrorDetailDTO = {
  field: string;
  reason: string;
};

export type ErrorResponseDTO = {
  error: {
    code: string;
    message: string;
    details?: ErrorDetailDTO[];
    requestId: string;
  };
};
```

```text
=== apps/api/src/shared/middlewares/auth.ts ===
import type { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../errors/AppError";

export async function requireAuth(req: FastifyRequest, _reply: FastifyReply) {
  req.log.info({ step: "AUTH" }, "requireAuth");
  const auth = req.headers.authorization ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token || token !== "dev-token") {
    throw new UnauthorizedError();
  }

  return;
}
```

```text
=== apps/api/src/shared/validation/zod.ts ===
import type { ZodError, ZodSchema } from "zod";
import { ValidationError } from "../errors/AppError";

function zodToDetails(err: ZodError) {
  return err.issues.map((i) => ({
    field: i.path.join(".") || "body",
    reason: i.code
  }));
}

export function parseOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError("Validation error", zodToDetails(result.error));
  }
  return result.data;
}
```

```text
=== apps/api/tsconfig.json ===
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "types": ["node"],
    "moduleResolution": "Bundler"
  },
  "include": ["src"]
}
```

```text
=== apps/api/vitest.config.ts ===
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node"
  }
});
```

```text
=== apps/web/eslint.config.js ===
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/**"] },

  // ✅ Base JS
  js.configs.recommended,

  // ✅ TypeScript + TSX (incluye parser)
  ...tseslint.configs.recommended,

  // Código del browser (React/Vite)
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // document, fetch, window, etc.
        ...globals.es2021
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettier.rules,
      "prettier/prettier": "error"
    }
  },

  // Archivos de config (Node)
  {
    files: ["*.{js,cjs,mjs}", "vite.config.*", "eslint.config.*"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    }
  }
];
```

```text
=== apps/web/package.json ===
{
  "name": "@app/web",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "index.js",
  "scripts": {
    "test": "echo \"(no tests yet)\"",
    "dev": "vite",
    "build": "tsc -p tsconfig.json && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier -w .",
    "format:check": "prettier -c ."
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^25.3.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.4",
    "eslint": "^10.0.2",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-prettier": "^5.5.5",
    "globals": "^17.4.0",
    "prettier": "^3.8.1",
    "typescript": "^5.9.3",
    "typescript-eslint": "^8.56.1",
    "vite": "^7.3.1"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@tanstack/react-query": "^5.90.21",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-hook-form": "^7.71.2",
    "react-router-dom": "^7.13.1",
    "zod": "^4.3.6"
  }
}
```

```text
=== apps/web/src/App.js ===
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { ProjectsListPage } from "./features/projects/pages/ProjectsListPage";
export function App() {
  return _jsx(BrowserRouter, {
    children: _jsxs("div", {
      style: { fontFamily: "system-ui", padding: 16 },
      children: [
        _jsx("nav", {
          style: { display: "flex", gap: 12, marginBottom: 16 },
          children: _jsx(Link, { to: "/projects", children: "Projects" })
        }),
        _jsxs(Routes, {
          children: [
            _jsx(Route, {
              path: "/",
              element: _jsx(Navigate, { to: "/projects", replace: true })
            }),
            _jsx(Route, {
              path: "/projects",
              element: _jsx(ProjectsListPage, {})
            })
          ]
        })
      ]
    })
  });
}
```

```text
=== apps/web/src/App.tsx ===
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { ProjectsListPage } from "./features/projects/pages/ProjectsListPage";

export function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "system-ui", padding: 16 }}>
        <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <Link to="/projects">Projects</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<ProjectsListPage />} />
          {/* después agregas: <Route path="/projects/:projectId" ... /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

```text
=== apps/web/src/features/projects/api/projectsApi.js ===
import { http } from "@/shared/api/http";
export const projectsApi = {
  list: () => http.get("/projects"),
  getById: (id) => http.get(`/projects/${id}`),
  create: (data) => http.post("/projects", data),
  update: (id, data) => http.patch(`/projects/${id}`, data),
  remove: (id) => http.delete(`/projects/${id}`)
};
```

```text
=== apps/web/src/features/projects/api/projectsApi.ts ===
import { http } from "@/shared/api/http";
import type {
  ProjectCreateDTO,
  ProjectListResponseDTO,
  ProjectResponseDTO,
  ProjectUpdateDTO
} from "../types/projects";

export const projectsApi = {
  list: () => http.get<ProjectListResponseDTO>("/projects"),
  getById: (id: string) => http.get<ProjectResponseDTO>(`/projects/${id}`),
  create: (data: ProjectCreateDTO) =>
    http.post<ProjectResponseDTO>("/projects", data),
  update: (id: string, data: ProjectUpdateDTO) =>
    http.patch<ProjectResponseDTO>(`/projects/${id}`, data),
  remove: (id: string) => http.delete<void>(`/projects/${id}`)
};
```

```text
=== apps/web/src/features/projects/components/ProjectModal.js ===
"use strict";
```

```text
=== apps/web/src/features/projects/components/ProjectModal.tsx ===

```

```text
=== apps/web/src/features/projects/hooks/useProjects.js ===
import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";
export function useProjects() {
  return useQuery({
    queryKey: ["projects", "list"],
    queryFn: () => projectsApi.list(),
    staleTime: 10_000,
    retry: 0,
    refetchOnWindowFocus: false
  });
}
```

```text
=== apps/web/src/features/projects/hooks/useProjects.ts ===
import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";
import type { ProjectListResponseDTO } from "../types/projects";

export function useProjects() {
  return useQuery<ProjectListResponseDTO>({
    queryKey: ["projects", "list"],
    queryFn: () => projectsApi.list(),
    staleTime: 10_000,
    retry: 0,
    refetchOnWindowFocus: false
  });
}
```

```text
=== apps/web/src/features/projects/pages/ProjectsListPage.js ===
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useProjects } from "../hooks/useProjects";
export function ProjectsListPage() {
  const { data, isLoading } = useProjects();
  if (isLoading) return _jsx("div", { children: "Loading..." });
  if (!data?.items.length) return _jsx("div", { children: "No projects yet" });
  return _jsx("div", {
    children: data.items.map((p) =>
      _jsxs(
        "div",
        {
          children: [
            _jsx("h3", { children: p.name }),
            _jsx("p", { children: p.clientName })
          ]
        },
        p.id
      )
    )
  });
}
```

```text
=== apps/web/src/features/projects/pages/ProjectsListPage.tsx ===
import { useProjects } from "../hooks/useProjects";

export function ProjectsListPage() {
  const { data, isLoading } = useProjects();

  if (isLoading) return <div>Loading...</div>;
  if (!data?.items.length) return <div>No projects yet</div>;

  return (
    <div>
      {data.items.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.clientName}</p>
        </div>
      ))}
    </div>
  );
}
```

```text
=== apps/web/src/features/projects/schemas/projectForm.schema.js ===
import { z } from "zod";
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const projectFormSchema = z
  .object({
    name: z.string().min(1),
    clientName: z.string().min(1),
    startDate: z.string().regex(isoDateRegex),
    endDate: z.string().regex(isoDateRegex).optional()
  })
  .refine((data) => !data.endDate || data.endDate >= data.startDate, {
    path: ["endDate"],
    message: "endDate must be greater than or equal to startDate"
  });
```

```text
=== apps/web/src/features/projects/schemas/projectForm.schema.ts ===
import { z } from "zod";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const projectFormSchema = z
  .object({
    name: z.string().min(1),
    clientName: z.string().min(1),
    startDate: z.string().regex(isoDateRegex),
    endDate: z.string().regex(isoDateRegex).optional()
  })
  .refine((data) => !data.endDate || data.endDate >= data.startDate, {
    path: ["endDate"],
    message: "endDate must be greater than or equal to startDate"
  });
```

```text
=== apps/web/src/features/projects/types/projects.js ===
export {};
```

```text
=== apps/web/src/features/projects/types/projects.ts ===
export type ProjectResponseDTO = {
  id: string;
  name: string;
  clientName: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;
  workers: [];
};

export type ProjectListResponseDTO = {
  items: ProjectResponseDTO[];
};

export type ProjectCreateDTO = {
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
};

export type ProjectUpdateDTO = Partial<ProjectCreateDTO>;

export type WorkerDTO = {
  id: string;
  name: string;
  role: string;
  seniority: string;
};

export type ProjectDTO = {
  id: string;
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
  workers: WorkerDTO[];
};

export type ProjectsListDTO = {
  items: ProjectDTO[];
};
```

```text
=== apps/web/src/main.js ===
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  _jsx(React.StrictMode, {
    children: _jsx(QueryClientProvider, {
      client: queryClient,
      children: _jsx(App, {})
    })
  })
);
```

```text
=== apps/web/src/main.tsx ===
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

```text
=== apps/web/src/shared/api/http.js ===
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";
async function request(method, path, body, init) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    body: body ? JSON.stringify(body) : undefined,
    ...init
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw (
      data ?? {
        error: { code: "HTTP_ERROR", message: `HTTP ${res.status}` }
      }
    );
  }
  return data;
}
export const http = {
  get: (path, init) => request("GET", path, undefined, init),
  post: (path, body, init) => request("POST", path, body, init),
  patch: (path, body, init) => request("PATCH", path, body, init),
  delete: (path, init) => request("DELETE", path, undefined, init)
};
```

```text
=== apps/web/src/shared/api/http.ts ===
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    body: body ? JSON.stringify(body) : undefined,
    ...init
  });

  const data = (await res.json().catch(() => null)) as T | null;

  if (!res.ok) {
    throw (
      data ??
      ({
        error: { code: "HTTP_ERROR", message: `HTTP ${res.status}` }
      } as unknown as T)
    );
  }

  return data as T;
}

export const http = {
  get: <T>(path: string, init?: RequestInit) =>
    request<T>("GET", path, undefined, init),
  post: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>("POST", path, body, init),
  patch: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>("PATCH", path, body, init),
  delete: <T>(path: string, init?: RequestInit) =>
    request<T>("DELETE", path, undefined, init)
};
```

```text
=== apps/web/src/vite-env.d.ts ===
/// <reference types="vite/client" />
```

```text
=== apps/web/tsconfig.json ===
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "baseUrl": ".",
    "types": ["vite/client"],
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src", "vite.config.ts"]
}
```

```text
=== apps/web/vite.config.ts ===
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});
```

```text
=== package.json ===
{
  "name": "projects-workers-monorepo",
  "version": "1.0.0",
  "private": true,
  "main": "index.js",
  "workspaces": ["apps/*"],
  "scripts": {
    "test": "npm run test -w apps/api && npm run test -w apps/web",
    "build": "npm run build -w apps/api && npm run build -w apps/web",
    "lint": "npm run lint -w apps/api && npm run lint -w apps/web",
    "format": "npm run format -w apps/api && npm run format -w apps/web",

    "api:dev": "npm --prefix apps/api run dev",
    "api:build": "npm --prefix apps/api run build",
    "api:lint": "npm --prefix apps/api run lint",
    "api:format": "npm --prefix apps/api run format",

    "web:dev": "npm run dev -w apps/web",
    "web:build": "npm run build -w apps/web",
    "web:lint": "npm run lint -w apps/web",
    "web:format": "npm run format -w apps/web",

    "api:prisma:generate": "npm --prefix apps/api run prisma:generate",
    "api:prisma:migrate:dev": "npm --prefix apps/api run prisma:migrate:dev",
    "api:prisma:migrate:reset": "npm --prefix apps/api run prisma:migrate:reset",
    "api:prisma:migrate:deploy": "npm --prefix apps/api run prisma:migrate:deploy",
    "api:prisma:studio": "npm --prefix apps/api run prisma:studio"
  },
  "devDependencies": {
    "eslint": "^10.0.2",
    "prettier": "^3.8.1",
    "prisma": "^6.19.2"
  },
  "dependencies": {
    "@prisma/client": "^6.19.2"
  }
}
```

```text
=== project_context.md ===
# Project Context Package

- Generated at: 2026-03-05T00:21:41-03:00
- Root: `.` (current directory)

## Rules Used

- max_depth: 8
- max_file_size_kb: 200
- ignore_dirs: ['.cache', '.git', '.next', '.turbo', '__pycache__', 'build', 'coverage', 'dist', 'node_modules', 'out', 'target', 'vendor']
- ignore_file_patterns: ['*.log', '*.lock', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', '*.png', '*.jpg', '*.jpeg', '*.gif', '*.pdf', '*.zip', '*.tar', '*.gz', '*.exe', '*.dll', '*.so', '*.bin']
- allowed_exts: ['.js', '.json', '.jsx', '.md', '.prisma', '.sql', '.ts', '.tsx', '.yaml', '.yml']
- allowed_suffixes: ['.env.example']

## Included Tree

```text
.
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   │   ├── migrations/
│   │   │   │   ├── 20260228192745_init_workers/
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20260301024743_projects_crud/
│   │   │   │   │   └── migration.sql
│   │   │   │   └── 20260301205623/
│   │   │   │       └── migration.sql
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── middlewares/
│   │   │   │   │   ├── errorHandler.ts
│   │   │   │   │   ├── notFound.ts
│   │   │   │   │   └── requestId.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── health.routes.ts
│   │   │   │   ├── app.ts
│   │   │   │   └── server.ts
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── auth.controller.ts
│   │   │   │   │   ├── auth.routes.ts
│   │   │   │   │   ├── auth.schemas.ts
│   │   │   │   │   └── auth.service.ts
│   │   │   │   ├── projects/
│   │   │   │   │   ├── projects.controller.ts
│   │   │   │   │   ├── projects.dtos.ts
│   │   │   │   │   ├── projects.mappers.ts
│   │   │   │   │   ├── projects.repository.ts
│   │   │   │   │   ├── projects.routes.ts
│   │   │   │   │   ├── projects.schemas.ts
│   │   │   │   │   ├── projects.service.ts
│   │   │   │   │   ├── projectsWorkers.controller.ts
│   │   │   │   │   ├── projectsWorkers.repository.ts
│   │   │   │   │   └── projectsWorkers.service.ts
│   │   │   │   └── workers/
│   │   │   │       ├── workers.controller.ts
│   │   │   │       ├── workers.dtos.ts
│   │   │   │       ├── workers.mappers.ts
│   │   │   │       ├── workers.repository.ts
│   │   │   │       ├── workers.routes.ts
│   │   │   │       ├── workers.schemas.ts
│   │   │   │       └── workers.service.ts
│   │   │   └── shared/
│   │   │       ├── db/
│   │   │       │   └── prisma.ts
│   │   │       ├── errors/
│   │   │       │   ├── AppError.ts
│   │   │       │   ├── HttpErrors.ts
│   │   │       │   └── errorCodes.ts
│   │   │       ├── http/
│   │   │       │   └── types.ts
│   │   │       ├── middlewares/
│   │   │       │   └── auth.ts
│   │   │       └── validation/
│   │   │           └── zod.ts
│   │   ├── .env.example
│   │   ├── eslint.config.js
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   └── web/
│       ├── src/
│       │   ├── features/
│       │   │   └── projects/
│       │   │       ├── api/
│       │   │       │   ├── projectsApi.js
│       │   │       │   └── projectsApi.ts
│       │   │       ├── components/
│       │   │       │   ├── ProjectModal.js
│       │   │       │   └── ProjectModal.tsx
│       │   │       ├── hooks/
│       │   │       │   ├── useProjects.js
│       │   │       │   └── useProjects.ts
│       │   │       ├── pages/
│       │   │       │   ├── ProjectsListPage.js
│       │   │       │   └── ProjectsListPage.tsx
│       │   │       ├── schemas/
│       │   │       │   ├── projectForm.schema.js
│       │   │       │   └── projectForm.schema.ts
│       │   │       └── types/
│       │   │           ├── projects.js
│       │   │           └── projects.ts
│       │   ├── shared/
│       │   │   └── api/
│       │   │       ├── http.js
│       │   │       └── http.ts
│       │   ├── App.js
│       │   ├── App.tsx
│       │   ├── main.js
│       │   ├── main.tsx
│       │   └── vite-env.d.ts
│       ├── eslint.config.js
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── package.json
├── project_context.md
└── tsconfig.base.json
```

## File Contents

```text
=== apps/api/.env.example ===
PORT=3000
HOST=0.0.0.0
DATABASE_URL="file:./prisma/dev.db"
```

```text
=== apps/api/eslint.config.js ===
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["dist/**", "node_modules/**"]
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  // ✅ forzamos root del tsconfig en ESTE workspace
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname
      }
    }
  },

  prettierConfig,

  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "error"
    }
  }
];
```

```text
=== apps/api/package.json ===
{
  "name": "@app/api",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "dist/app/server.js",
  "scripts": {
    "dev": "tsx watch src/app/server.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/app/server.js",
    "test": "vitest run",
    "lint": "eslint .",
    "format": "prettier -w .",
    "format:check": "prettier -c .",

    "prisma:generate": "prisma generate --schema prisma/schema.prisma",
    "prisma:migrate:dev": "prisma migrate dev --schema prisma/schema.prisma",
    "prisma:migrate:reset": "prisma migrate reset --force --skip-seed --schema prisma/schema.prisma",
    "prisma:migrate:deploy": "prisma migrate deploy --schema prisma/schema.prisma",
    "prisma:studio": "prisma studio --schema prisma/schema.prisma"
  },
  "dependencies": {
    "@fastify/cors": "^11.2.0",
    "@fastify/helmet": "^13.0.2",
    "@fastify/sensible": "^6.0.4",
    "@prisma/client": "^6.19.2",
    "dotenv": "^17.3.1",
    "fastify": "^5.7.4",
    "pino": "^10.3.1",
    "pino-pretty": "^13.1.3",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@types/node": "^25.3.3",
    "eslint": "^10.0.2",
    "prettier": "^3.8.1",
    "prisma": "^6.19.2",
    "tsx": "^4.21.0",
    "typescript": "^5.9.3",
    "vitest": "^4.0.18"
  }
}
```

```text
=== apps/api/prisma/migrations/20260228192745_init_workers/migration.sql ===
-- CreateTable
CREATE TABLE "Worker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "seniority" TEXT NOT NULL
);
```

```text
=== apps/api/prisma/migrations/20260301024743_projects_crud/migration.sql ===
/*
  Warnings:

  - You are about to drop the `Worker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Worker";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "workers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "seniority" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME
);

-- CreateTable
CREATE TABLE "project_workers" (
    "projectId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,

    PRIMARY KEY ("projectId", "workerId"),
    CONSTRAINT "project_workers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "project_workers_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "workers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
```

```text
=== apps/api/prisma/migrations/20260301205623/migration.sql ===
/*
  Warnings:

  - A unique constraint covering the columns `[name,clientName,startDate]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "projects_name_clientName_startDate_key" ON "projects"("name", "clientName", "startDate");
```

```text
=== apps/api/prisma/schema.prisma ===
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

enum Seniority {
  junior
  semiSenior
  senior
}

model Worker {
  id        String @id @default(uuid())
  name      String
  role      String
  seniority Seniority

  projectWorkers ProjectWorker[]

  @@map("workers")
}

model Project {
  id         String    @id @default(uuid())
  name       String
  clientName String
  startDate  DateTime
  endDate    DateTime?

  workers ProjectWorker[]

  @@map("projects")
  @@unique([name, clientName, startDate])
}

model ProjectWorker {
  projectId String
  workerId  String

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  worker  Worker  @relation(fields: [workerId], references: [id], onDelete: Cascade)

  @@id([projectId, workerId])
  @@map("project_workers")
}
```

```text
=== apps/api/src/app/app.ts ===
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import { projectsRoutes } from "../modules/projects/projects.routes";
import { randomUUID } from "node:crypto";

import { registerErrorHandler } from "./middlewares/errorHandler.js";
import { registerNotFoundHandler } from "./middlewares/notFound.js";
import { healthRoutes } from "./routes/health.routes.js";

import { authRoutes } from "../modules/auth/auth.routes.js";
import { workersRoutes } from "../modules/workers/workers.routes.js";

export async function buildApp() {
  const app = Fastify({
    logger: true,
    genReqId: (req) => {
      const incoming = req.headers["x-request-id"];
      return typeof incoming === "string" && incoming.trim()
        ? incoming.trim()
        : randomUUID();
    }
  });

  await app.register(helmet);
  await app.register(cors, { origin: true });
  await app.register(sensible);

  // Siempre devolver x-request-id
  app.addHook("onSend", async (req, reply, payload) => {
    reply.header("x-request-id", req.id);
    return payload;
  });

  app.addHook("onRequest", async (req) => {
    req.log.info({ step: "H_onRequest" }, "hook");
  });

  app.addHook("preParsing", async (req) => {
    req.log.info({ step: "H_preParsing" }, "hook");
  });

  app.addHook("preValidation", async (req) => {
    req.log.info({ step: "H_preValidation" }, "hook");
  });

  app.addHook("preHandler", async (req) => {
    req.log.info({ step: "H_preHandler" }, "hook");
  });

  app.addHook("onResponse", async (req, reply) => {
    req.log.info({ step: "H_onResponse", status: reply.statusCode }, "hook");
  });

  registerNotFoundHandler(app);
  registerErrorHandler(app);

  await app.register(
    async (v1) => {
      await v1.register(healthRoutes);
      await v1.register(authRoutes);
      await v1.register(workersRoutes);
      await v1.register(projectsRoutes);
    },
    { prefix: "/api/v1" }
  );

  return app;
}
```

```text
=== apps/api/src/app/middlewares/errorHandler.ts ===
import type { FastifyError, FastifyInstance } from "fastify";
import { AppError } from "../../shared/errors/AppError.js";
import type { ErrorResponseDTO } from "../../shared/http/types.js";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err: FastifyError | Error, req, reply) => {
    const requestId = String(req.id);

    let status = 500;
    let code: ErrorResponseDTO["error"]["code"] = "INTERNAL_ERROR";
    let message = "Internal error";
    let details: ErrorResponseDTO["error"]["details"] | undefined;

    // 1) Errores de dominio (los tuyos)
    if (err instanceof AppError) {
      status = err.status;
      code = err.code;
      message = err.message;
      details = err.details;
    }
    // 2) Errores propios de Fastify (JSON inválido, etc.)
    else if (typeof (err as any)?.statusCode === "number") {
      status = (err as any).statusCode;

      // Si quieres mapear más fino después, aquí es el lugar.
      code = status >= 500 ? "INTERNAL_ERROR" : "VALIDATION_ERROR";
      message = err.message || (status >= 500 ? "Internal error" : "Validation error");

      // Logueamos igual, pero no lo tratamos como 500
      app.log.warn({ err, requestId }, "Non-domain error");
    }
    // 3) Unknown -> 500
    else {
      app.log.error({ err, requestId }, "Unhandled error");
    }

    const payload: ErrorResponseDTO = {
      error: {
        code,
        message,
        ...(details ? { details } : {}),
        requestId,
      },
    };

    reply.status(status).send(payload);
  });
}
```

```text
=== apps/api/src/app/middlewares/notFound.ts ===
import type { FastifyInstance } from "fastify";
import type { ErrorResponseDTO } from "../../shared/http/types.js";

export function registerNotFoundHandler(app: FastifyInstance) {
  app.setNotFoundHandler((req, reply) => {
    const payload: ErrorResponseDTO = {
      error: {
        code: "NOT_FOUND",
        message: "Route " + req.method + " " + req.url + " not found",
        requestId: String(req.id) // <- si ya usas Fastify req.id
      }
    };

    reply.status(404).send(payload);
  });
}
```

```text
=== apps/api/src/app/middlewares/requestId.ts ===
import type { FastifyPluginAsync } from "fastify";
import { randomUUID } from "node:crypto";

declare module "fastify" {
  interface FastifyRequest {
    requestId: string;
  }
}

export const requestIdPlugin: FastifyPluginAsync = async (app) => {
  app.addHook("onRequest", async (req, reply) => {
    const incoming = req.headers["x-request-id"];
    const requestId =
      typeof incoming === "string" && incoming.trim()
        ? incoming.trim()
        : randomUUID();

    // Fuente de verdad
    req.requestId = requestId;

    // Garantiza disponibilidad en handlers posteriores
    req.headers["x-request-id"] = requestId;

    // Y lo devolvemos siempre
    reply.header("x-request-id", requestId);
  });
};
```

```text
=== apps/api/src/app/routes/health.routes.ts ===
import type { FastifyPluginAsync } from "fastify";

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", async (req, reply) => {
    return reply.send({
      status: "ok",
      requestId: String(req.id)
    });
  });
};
```

```text
=== apps/api/src/app/server.ts ===
import "dotenv/config";

import { buildApp } from "./app.js";

const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "0.0.0.0";

const app = await buildApp();

try {
  await app.listen({ port: PORT, host: HOST });
  app.log.info(`API listening on http://${HOST}:${PORT}/api/v1`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
```

```text
=== apps/api/src/modules/auth/auth.controller.ts ===
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
```

```text
=== apps/api/src/modules/auth/auth.routes.ts ===
import type { FastifyInstance } from "fastify";
import * as controller from "./auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", controller.login);
}
```

```text
=== apps/api/src/modules/auth/auth.schemas.ts ===
import { z } from "zod";

export const loginBodySchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

export type LoginBody = z.infer<typeof loginBodySchema>;
```

```text
=== apps/api/src/modules/auth/auth.service.ts ===
import { InvalidCredentialsError } from "../../shared/errors/AppError";
import type { LoginBody } from "./auth.schemas";

export function login(body: LoginBody) {
  if (body.username !== "admin" || body.password !== "admin123") {
    throw new InvalidCredentialsError();
  }
  return { accessToken: "dev-token", tokenType: "Bearer", expiresIn: 3600 };
}
```

```text
=== apps/api/src/modules/projects/projects.controller.ts ===
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
```

```text
=== apps/api/src/modules/projects/projects.dtos.ts ===
export interface ProjectCreateDTO {
  name: string;
  clientName: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}

export interface ProjectUpdateDTO {
  name?: string;
  clientName?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}

export interface ProjectListResponseDTO {
  items: ProjectResponseDTO[];
}

export type WorkerInProjectDTO = {
  id: string;
  name: string;
  role: string;
  seniority: string;
};

export type ProjectResponseDTO = {
  id: string;
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
  workers: WorkerInProjectDTO[];
};
```

```text
=== apps/api/src/modules/projects/projects.mappers.ts ===
import type { Prisma } from "@prisma/client";

export type ProjectWithWorkers = Prisma.ProjectGetPayload<{
  include: { workers: { include: { worker: true } } };
}>;

export const mapProjectToDTO = (project: ProjectWithWorkers) => ({
  id: project.id,
  name: project.name,
  clientName: project.clientName,
  startDate: project.startDate.toISOString().slice(0, 10),
  endDate: project.endDate
    ? project.endDate.toISOString().slice(0, 10)
    : undefined,
  workers: project.workers.map((pw) => ({
    id: pw.worker.id,
    name: pw.worker.name,
    role: pw.worker.role,
    seniority: pw.worker.seniority
  }))
});
```

```text
=== apps/api/src/modules/projects/projects.repository.ts ===
import { prisma } from "../../shared/db/prisma";
import type { Prisma } from "@prisma/client";

const withWorkers = {
  workers: { include: { worker: true } }
} satisfies Prisma.ProjectInclude;

export const projectsRepository = {
  create: (data: Prisma.ProjectCreateInput) =>
    prisma.project.create({ data, include: withWorkers }),

  findMany: () =>
    prisma.project.findMany({
      orderBy: { startDate: "desc" },
      include: withWorkers
    }),

  findById: (id: string) =>
    prisma.project.findUnique({
      where: { id },
      include: withWorkers
    }),

  update: (id: string, data: Prisma.ProjectUpdateInput) =>
    prisma.project.update({ where: { id }, data, include: withWorkers }),

  delete: (id: string) => prisma.project.delete({ where: { id } })
};
```

```text
=== apps/api/src/modules/projects/projects.routes.ts ===
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
```

```text
=== apps/api/src/modules/projects/projects.schemas.ts ===
import { z } from "zod";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const baseProjectSchema = z.object({
  name: z.string().trim().min(1).max(120),
  clientName: z.string().trim().min(1).max(120),
  startDate: z.string().regex(isoDateRegex),
  endDate: z.string().regex(isoDateRegex).optional()
});

type ProjectDates = {
  startDate?: string;
  endDate?: string;
};

const withEndDateRule = <T extends z.ZodType<ProjectDates>>(schema: T) =>
  schema.superRefine((data, ctx) => {
    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "endDate must be greater than or equal to startDate"
      });
    }
  });
export const createProjectSchema = withEndDateRule(baseProjectSchema);

export const updateProjectSchema = withEndDateRule(baseProjectSchema.partial());

export const projectIdParamsSchema = z.object({
  projectId: z.string().uuid()
});
```

```text
=== apps/api/src/modules/projects/projects.service.ts ===
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
```

```text
=== apps/api/src/modules/projects/projectsWorkers.controller.ts ===
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
```

```text
=== apps/api/src/modules/projects/projectsWorkers.repository.ts ===
import { prisma } from "../../shared/db/prisma";

export const projectsWorkersRepository = {
  // existe el proyecto?
  projectExists: async (projectId: string) => {
    const p = await prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true }
    });
    return !!p;
  },

  // existe el worker?
  workerExists: async (workerId: string) => {
    const w = await prisma.worker.findUnique({
      where: { id: workerId },
      select: { id: true }
    });
    return !!w;
  },

  // existe la asignación?
  assignmentExists: async (projectId: string, workerId: string) => {
    const pw = await prisma.projectWorker.findUnique({
      where: { projectId_workerId: { projectId, workerId } },
      select: { projectId: true }
    });
    return !!pw;
  },

  createAssignment: (projectId: string, workerId: string) =>
    prisma.projectWorker.create({ data: { projectId, workerId } }),

  deleteAssignment: (projectId: string, workerId: string) =>
    prisma.projectWorker.delete({
      where: { projectId_workerId: { projectId, workerId } }
    })
};
```

```text
=== apps/api/src/modules/projects/projectsWorkers.service.ts ===
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
```

```text
=== apps/api/src/modules/workers/workers.controller.ts ===
import type { FastifyReply, FastifyRequest } from "fastify";
import { requireAuth } from "../../shared/middlewares/auth.js";
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
  await requireAuth(req, reply);

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
  await requireAuth(req, reply);

  const params = parseOrThrow(
    workerIdParamsSchema,
    (req as ReqWithParams).params
  );
  const body = parseOrThrow(workerUpdateBodySchema, (req as ReqWithBody).body);

  const worker = await service.updateWorker(params.workerId, body);

  return reply.send(toWorkerResponseDTO(worker));
}

export async function remove(req: FastifyRequest, reply: FastifyReply) {
  await requireAuth(req, reply);

  const params = parseOrThrow(
    workerIdParamsSchema,
    (req as ReqWithParams).params
  );

  await service.deleteWorker(params.workerId);

  return reply.code(204).send();
}
```

```text
=== apps/api/src/modules/workers/workers.dtos.ts ===
export type WorkerSeniorityDTO = "junior" | "semi-senior" | "senior";

export type WorkerCreateDTO = {
  name: string;
  role: string;
  seniority: WorkerSeniorityDTO;
};

export type WorkerUpdateDTO = Partial<WorkerCreateDTO>;

export type WorkerResponseDTO = {
  id: string;
  name: string;
  role: string;
  seniority: WorkerSeniorityDTO;
};

export type WorkerListResponseDTO = { items: WorkerResponseDTO[] };
```

```text
=== apps/api/src/modules/workers/workers.mappers.ts ===
import type { Seniority, Worker } from "@prisma/client";
import type { WorkerResponseDTO, WorkerSeniorityDTO } from "./workers.dtos";

export function toDtoSeniority(s: Seniority): WorkerSeniorityDTO {
  if (s === "semiSenior") return "semi-senior";
  return s; // junior | senior
}

export function toDbSeniority(s: WorkerSeniorityDTO): Seniority {
  if (s === "semi-senior") return "semiSenior";
  return s;
}

export function toWorkerResponseDTO(worker: Worker): WorkerResponseDTO {
  return {
    id: worker.id,
    name: worker.name,
    role: worker.role,
    seniority: toDtoSeniority(worker.seniority)
  };
}
```

```text
=== apps/api/src/modules/workers/workers.repository.ts ===
import type { Prisma, Worker } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";

export async function create(data: Prisma.WorkerCreateInput): Promise<Worker> {
  return prisma.worker.create({ data });
}

export async function list(): Promise<Worker[]> {
  return prisma.worker.findMany({ orderBy: { name: "asc" } });
}

export async function getById(id: string): Promise<Worker | null> {
  return prisma.worker.findUnique({ where: { id } });
}

export async function update(
  id: string,
  data: Prisma.WorkerUpdateInput
): Promise<Worker | null> {
  try {
    return await prisma.worker.update({ where: { id }, data });
  } catch {
    return null;
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    await prisma.worker.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
```

```text
=== apps/api/src/modules/workers/workers.routes.ts ===
import type { FastifyInstance } from "fastify";
import * as controller from "./workers.controller.js";

export async function workersRoutes(app: FastifyInstance) {
  app.get("/workers", controller.list);
  app.get("/workers/:workerId", controller.getById);
  app.post("/workers", controller.create);
  app.patch("/workers/:workerId", controller.update);
  app.delete("/workers/:workerId", controller.remove);
}
```

```text
=== apps/api/src/modules/workers/workers.schemas.ts ===
import { z } from "zod";

export const workerIdParamsSchema = z.object({
  workerId: z.string().uuid()
});

export const workerSenioritySchema = z.enum([
  "junior",
  "semi-senior",
  "senior"
]);

export const workerCreateBodySchema = z.object({
  name: z.string().min(1).max(120),
  role: z.string().min(1).max(60),
  seniority: workerSenioritySchema
});

export const workerUpdateBodySchema = workerCreateBodySchema.partial();
```

```text
=== apps/api/src/modules/workers/workers.service.ts ===
import { NotFoundError } from "../../shared/errors/AppError.js";
import type { WorkerCreateDTO, WorkerUpdateDTO } from "./workers.dtos.js";
import * as repo from "./workers.repository.js";
import { toDbSeniority } from "./workers.mappers.js";

// Tipo de update para repo (shape DB)
type WorkerUpdateData = {
  name?: string;
  role?: string;
  seniority?: ReturnType<typeof toDbSeniority>;
};

export async function createWorker(dto: WorkerCreateDTO) {
  return repo.create({
    name: dto.name,
    role: dto.role,
    seniority: toDbSeniority(dto.seniority)
  });
}

export async function listWorkers() {
  return repo.list();
}

export async function getWorker(workerId: string) {
  const w = await repo.getById(workerId);
  if (!w) throw new NotFoundError("Worker not found");
  return w;
}

export async function updateWorker(workerId: string, dto: WorkerUpdateDTO) {
  const data: WorkerUpdateData = {};

  if (dto.name !== undefined) data.name = dto.name;
  if (dto.role !== undefined) data.role = dto.role;
  if (dto.seniority !== undefined) {
    data.seniority = toDbSeniority(dto.seniority);
  }

  const w = await repo.update(workerId, data);
  if (!w) throw new NotFoundError("Worker not found");
  return w;
}

export async function deleteWorker(workerId: string) {
  const ok = await repo.remove(workerId);
  if (!ok) throw new NotFoundError("Worker not found");
}
```

```text
=== apps/api/src/shared/db/prisma.ts ===
console.log("[DB]", { cwd: process.cwd(), url: process.env.DATABASE_URL });

import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
```

```text
=== apps/api/src/shared/errors/AppError.ts ===
import type { ErrorDetailDTO } from "../http/types";
import type { ErrorCode } from "./errorCodes";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly status: number;
  public readonly details?: ErrorDetailDTO[];

  constructor(args: {
    code: ErrorCode;
    status: number;
    message: string;
    details?: ErrorDetailDTO[];
  }) {
    super(args.message);
    this.code = args.code;
    this.status = args.status;
    this.details = args.details;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: ErrorDetailDTO[]) {
    super({ code: "VALIDATION_ERROR", status: 400, message, details });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super({ code: "UNAUTHORIZED", status: 401, message });
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message = "Invalid credentials") {
    super({ code: "INVALID_CREDENTIALS", status: 401, message });
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super({ code: "NOT_FOUND", status: 404, message });
  }
}

export class InternalError extends AppError {
  constructor(message = "Internal error") {
    super({ code: "INTERNAL_ERROR", status: 500, message });
  }
}

export class ConflictError extends AppError {
  constructor(code: "ASSIGNMENT_ALREADY_EXISTS" | "PROJECT_ALREADY_EXISTS", message: string) {
    super({ code, status: 409, message });
  }
}
```

```text
=== apps/api/src/shared/errors/HttpErrors.ts ===
import { AppError } from "./AppError.js";
import type { ErrorDetailDTO } from "../http/types.js";

export class ValidationError extends AppError {
  constructor(message: string, details?: ErrorDetailDTO[]) {
    super({ code: "VALIDATION_ERROR", status: 400, message, details });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super({ code: "UNAUTHORIZED", status: 401, message });
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super({ code: "NOT_FOUND", status: 404, message });
  }
}

export class BadRequestError extends Error {
  statusCode = 400 as const;
  code = "BAD_REQUEST" as const;
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class ConflictError extends Error {
  statusCode = 409 as const;
  code = "CONFLICT" as const;
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}
```

```text
=== apps/api/src/shared/errors/errorCodes.ts ===
export const ErrorCode = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  ASSIGNMENT_ALREADY_EXISTS: "ASSIGNMENT_ALREADY_EXISTS",
  PROJECT_ALREADY_EXISTS: "PROJECT_ALREADY_EXISTS"
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
```

```text
=== apps/api/src/shared/http/types.ts ===
export type ErrorDetailDTO = {
  field: string;
  reason: string;
};

export type ErrorResponseDTO = {
  error: {
    code: string;
    message: string;
    details?: ErrorDetailDTO[];
    requestId: string;
  };
};
```

```text
=== apps/api/src/shared/middlewares/auth.ts ===
import type { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../errors/AppError";

export async function requireAuth(req: FastifyRequest, _reply: FastifyReply) {
  req.log.info({ step: "AUTH" }, "requireAuth");
  const auth = req.headers.authorization ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token || token !== "dev-token") {
    throw new UnauthorizedError();
  }

  return;
}
```

```text
=== apps/api/src/shared/validation/zod.ts ===
import type { ZodError, ZodSchema } from "zod";
import { ValidationError } from "../errors/AppError";

function zodToDetails(err: ZodError) {
  return err.issues.map((i) => ({
    field: i.path.join(".") || "body",
    reason: i.code
  }));
}

export function parseOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError("Validation error", zodToDetails(result.error));
  }
  return result.data;
}
```

```text
=== apps/api/tsconfig.json ===
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "types": ["node"],
    "moduleResolution": "Bundler"
  },
  "include": ["src"]
}
```

```text
=== apps/api/vitest.config.ts ===
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node"
  }
});
```

```text
=== apps/web/eslint.config.js ===
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/**"] },

  // ✅ Base JS
  js.configs.recommended,

  // ✅ TypeScript + TSX (incluye parser)
  ...tseslint.configs.recommended,

  // Código del browser (React/Vite)
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // document, fetch, window, etc.
        ...globals.es2021
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettier.rules,
      "prettier/prettier": "error"
    }
  },

  // Archivos de config (Node)
  {
    files: ["*.{js,cjs,mjs}", "vite.config.*", "eslint.config.*"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    }
  }
];
```

```text
=== apps/web/package.json ===
{
  "name": "@app/web",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "index.js",
  "scripts": {
    "test": "echo \"(no tests yet)\"",
    "dev": "vite",
    "build": "tsc -p tsconfig.json && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier -w .",
    "format:check": "prettier -c ."
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^25.3.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.4",
    "eslint": "^10.0.2",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-prettier": "^5.5.5",
    "globals": "^17.4.0",
    "prettier": "^3.8.1",
    "typescript": "^5.9.3",
    "typescript-eslint": "^8.56.1",
    "vite": "^7.3.1"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@tanstack/react-query": "^5.90.21",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-hook-form": "^7.71.2",
    "react-router-dom": "^7.13.1",
    "zod": "^4.3.6"
  }
}
```

```text
=== apps/web/src/App.js ===
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { ProjectsListPage } from "./features/projects/pages/ProjectsListPage";
export function App() {
  return _jsx(BrowserRouter, {
    children: _jsxs("div", {
      style: { fontFamily: "system-ui", padding: 16 },
      children: [
        _jsx("nav", {
          style: { display: "flex", gap: 12, marginBottom: 16 },
          children: _jsx(Link, { to: "/projects", children: "Projects" })
        }),
        _jsxs(Routes, {
          children: [
            _jsx(Route, {
              path: "/",
              element: _jsx(Navigate, { to: "/projects", replace: true })
            }),
            _jsx(Route, {
              path: "/projects",
              element: _jsx(ProjectsListPage, {})
            })
          ]
        })
      ]
    })
  });
}
```

```text
=== apps/web/src/App.tsx ===
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { ProjectsListPage } from "./features/projects/pages/ProjectsListPage";

export function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "system-ui", padding: 16 }}>
        <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <Link to="/projects">Projects</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<ProjectsListPage />} />
          {/* después agregas: <Route path="/projects/:projectId" ... /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

```text
=== apps/web/src/features/projects/api/projectsApi.js ===
import { http } from "@/shared/api/http";
export const projectsApi = {
  list: () => http.get("/projects"),
  getById: (id) => http.get(`/projects/${id}`),
  create: (data) => http.post("/projects", data),
  update: (id, data) => http.patch(`/projects/${id}`, data),
  remove: (id) => http.delete(`/projects/${id}`)
};
```

```text
=== apps/web/src/features/projects/api/projectsApi.ts ===
import { http } from "@/shared/api/http";
import type {
  ProjectCreateDTO,
  ProjectListResponseDTO,
  ProjectResponseDTO,
  ProjectUpdateDTO
} from "../types/projects";

export const projectsApi = {
  list: () => http.get<ProjectListResponseDTO>("/projects"),
  getById: (id: string) => http.get<ProjectResponseDTO>(`/projects/${id}`),
  create: (data: ProjectCreateDTO) =>
    http.post<ProjectResponseDTO>("/projects", data),
  update: (id: string, data: ProjectUpdateDTO) =>
    http.patch<ProjectResponseDTO>(`/projects/${id}`, data),
  remove: (id: string) => http.delete<void>(`/projects/${id}`)
};
```

```text
=== apps/web/src/features/projects/components/ProjectModal.js ===
"use strict";
```

```text
=== apps/web/src/features/projects/components/ProjectModal.tsx ===

```

```text
=== apps/web/src/features/projects/hooks/useProjects.js ===
import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";
export function useProjects() {
  return useQuery({
    queryKey: ["projects", "list"],
    queryFn: () => projectsApi.list(),
    staleTime: 10_000,
    retry: 0,
    refetchOnWindowFocus: false
  });
}
```

```text
=== apps/web/src/features/projects/hooks/useProjects.ts ===
import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";
import type { ProjectListResponseDTO } from "../types/projects";

export function useProjects() {
  return useQuery<ProjectListResponseDTO>({
    queryKey: ["projects", "list"],
    queryFn: () => projectsApi.list(),
    staleTime: 10_000,
    retry: 0,
    refetchOnWindowFocus: false
  });
}
```

```text
=== apps/web/src/features/projects/pages/ProjectsListPage.js ===
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useProjects } from "../hooks/useProjects";
export function ProjectsListPage() {
  const { data, isLoading } = useProjects();
  if (isLoading) return _jsx("div", { children: "Loading..." });
  if (!data?.items.length) return _jsx("div", { children: "No projects yet" });
  return _jsx("div", {
    children: data.items.map((p) =>
      _jsxs(
        "div",
        {
          children: [
            _jsx("h3", { children: p.name }),
            _jsx("p", { children: p.clientName })
          ]
        },
        p.id
      )
    )
  });
}
```

```text
=== apps/web/src/features/projects/pages/ProjectsListPage.tsx ===
import { useProjects } from "../hooks/useProjects";

export function ProjectsListPage() {
  const { data, isLoading } = useProjects();

  if (isLoading) return <div>Loading...</div>;
  if (!data?.items.length) return <div>No projects yet</div>;

  return (
    <div>
      {data.items.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.clientName}</p>
        </div>
      ))}
    </div>
  );
}
```

```text
=== apps/web/src/features/projects/schemas/projectForm.schema.js ===
import { z } from "zod";
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const projectFormSchema = z
  .object({
    name: z.string().min(1),
    clientName: z.string().min(1),
    startDate: z.string().regex(isoDateRegex),
    endDate: z.string().regex(isoDateRegex).optional()
  })
  .refine((data) => !data.endDate || data.endDate >= data.startDate, {
    path: ["endDate"],
    message: "endDate must be greater than or equal to startDate"
  });
```

```text
=== apps/web/src/features/projects/schemas/projectForm.schema.ts ===
import { z } from "zod";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const projectFormSchema = z
  .object({
    name: z.string().min(1),
    clientName: z.string().min(1),
    startDate: z.string().regex(isoDateRegex),
    endDate: z.string().regex(isoDateRegex).optional()
  })
  .refine((data) => !data.endDate || data.endDate >= data.startDate, {
    path: ["endDate"],
    message: "endDate must be greater than or equal to startDate"
  });
```

```text
=== apps/web/src/features/projects/types/projects.js ===
export {};
```

```text
=== apps/web/src/features/projects/types/projects.ts ===
export type ProjectResponseDTO = {
  id: string;
  name: string;
  clientName: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;
  workers: [];
};

export type ProjectListResponseDTO = {
  items: ProjectResponseDTO[];
};

export type ProjectCreateDTO = {
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
};

export type ProjectUpdateDTO = Partial<ProjectCreateDTO>;

export type WorkerDTO = {
  id: string;
  name: string;
  role: string;
  seniority: string;
};

export type ProjectDTO = {
  id: string;
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
  workers: WorkerDTO[];
};

export type ProjectsListDTO = {
  items: ProjectDTO[];
};
```

```text
=== apps/web/src/main.js ===
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  _jsx(React.StrictMode, {
    children: _jsx(QueryClientProvider, {
      client: queryClient,
      children: _jsx(App, {})
    })
  })
);
```

```text
=== apps/web/src/main.tsx ===
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

```text
=== apps/web/src/shared/api/http.js ===
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";
async function request(method, path, body, init) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    body: body ? JSON.stringify(body) : undefined,
    ...init
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw (
      data ?? {
        error: { code: "HTTP_ERROR", message: `HTTP ${res.status}` }
      }
    );
  }
  return data;
}
export const http = {
  get: (path, init) => request("GET", path, undefined, init),
  post: (path, body, init) => request("POST", path, body, init),
  patch: (path, body, init) => request("PATCH", path, body, init),
  delete: (path, init) => request("DELETE", path, undefined, init)
};
```

```text
=== tsconfig.base.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUncheckedIndexedAccess": true
  }
}
```

