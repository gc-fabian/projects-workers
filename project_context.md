# Project Context Package

- Generated at: 2026-03-06T20:36:56-03:00
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
│       │   │   ├── auth/
│       │   │   │   ├── api/
│       │   │   │   │   └── authApi.ts
│       │   │   │   ├── context/
│       │   │   │   │   └── AuthContext.tsx
│       │   │   │   ├── pages/
│       │   │   │   │   └── LoginPage.tsx
│       │   │   │   └── types/
│       │   │   │       └── auth.ts
│       │   │   └── projects/
│       │   │       ├── api/
│       │   │       │   ├── projectsApi.ts
│       │   │       │   └── workersApi.ts
│       │   │       ├── components/
│       │   │       │   ├── ProjectModal.tsx
│       │   │       │   └── WorkerModal.tsx
│       │   │       ├── hooks/
│       │   │       │   ├── useProjectAssignments.ts
│       │   │       │   ├── useProjectById.ts
│       │   │       │   ├── useProjectMutations.ts
│       │   │       │   ├── useProjects.ts
│       │   │       │   ├── useWorkerMutations.ts
│       │   │       │   └── useWorkers.ts
│       │   │       ├── pages/
│       │   │       │   ├── ProjectDetailPage.tsx
│       │   │       │   ├── ProjectsListPage.tsx
│       │   │       │   └── WorkersListPage.tsx
│       │   │       ├── schemas/
│       │   │       │   ├── projectForm.schema.ts
│       │   │       │   └── workerForm.schema.ts
│       │   │       └── types/
│       │   │           └── projects.ts
│       │   ├── shared/
│       │   │   └── api/
│       │   │       └── http.ts
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── vite-env.d.ts
│       ├── .env.example
│       ├── eslint.config.js
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.js
│       └── vite.config.ts
├── README.md
├── package.json
├── project_context.md
└── tsconfig.base.json
```

## File Contents

```text
=== README.md ===
# Projects Workers Monorepo

Fullstack technical project implementing a contract-first monorepo with:

- Authentication
- Workers CRUD
- Projects CRUD
- Project ↔ Worker assignments
- Frontend auth-aware UI for protected mutations

The repository is structured as a monorepo containing a backend API and a frontend web application.

---

# Architecture

Monorepo structure:

```text
apps/
  api/    -> Fastify + TypeScript backend API
  web/    -> React + Vite frontend
```

Backend stack:

- Node.js
- Fastify
- TypeScript
- Prisma ORM
- SQLite
- Zod validation

Frontend stack:

- React
- TypeScript
- Vite
- React Query
- React Hook Form
- Zod
- React Router

---

# API Base URL

```text
http://localhost:3000/api/v1
```

---

# Features Implemented

## Base Infrastructure

- Request ID support via Fastify `req.id`
- `x-request-id` response header on every response
- Global error handler
- Standard error format
- Health endpoint
- Auth middleware for protected write operations

Endpoint:

```http
GET /api/v1/health
```

Response:

```json
{
  "status": "ok",
  "requestId": "..."
}
```

---

# Authentication

Temporary hardcoded login for the technical challenge.

```http
POST /api/v1/auth/login
```

Request:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:

```json
{
  "accessToken": "dev-token",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

Use token in protected requests:

```http
Authorization: Bearer dev-token
```

## Auth behavior

Protected write endpoints require:

```http
Authorization: Bearer <token>
```

If token is missing or invalid:

- `401 UNAUTHORIZED`

If login credentials are invalid:

- `401 INVALID_CREDENTIALS`

### Public endpoints

These remain public:

```http
GET /health
GET /workers
GET /workers/:workerId
GET /projects
GET /projects/:projectId
```

### Protected endpoints

These require auth:

```http
POST   /workers
PATCH  /workers/:workerId
DELETE /workers/:workerId

POST   /projects
PATCH  /projects/:projectId
DELETE /projects/:projectId

POST   /projects/:projectId/workers
DELETE /projects/:projectId/workers/:workerId
```

---

# Workers CRUD

Model:

```text
Worker
- id (UUID)
- name
- role
- seniority (enum)
```

Endpoints:

```http
POST   /workers
GET    /workers
GET    /workers/:workerId
PATCH  /workers/:workerId
DELETE /workers/:workerId
```

Example create:

```http
POST /workers
Authorization: Bearer dev-token
Content-Type: application/json
```

```json
{
  "name": "John",
  "role": "Backend Developer",
  "seniority": "junior"
}
```

---

# Projects CRUD

Model:

```text
Project
- id (UUID)
- name
- clientName
- startDate (YYYY-MM-DD)
- endDate (optional)
```

Validation rules:

- `startDate` format must be `YYYY-MM-DD`
- if `endDate` exists, then `endDate >= startDate`

Endpoints:

```http
POST   /projects
GET    /projects
GET    /projects/:projectId
PATCH  /projects/:projectId
DELETE /projects/:projectId
```

Unique constraint:

```text
(name, clientName, startDate)
```

Duplicate creation/update returns:

```text
409 PROJECT_ALREADY_EXISTS
```

Example create:

```http
POST /projects
Authorization: Bearer dev-token
Content-Type: application/json
```

```json
{
  "name": "P1",
  "clientName": "Client A",
  "startDate": "2026-03-01"
}
```

---

# Project ↔ Worker Assignments

Assignments are modeled as an N:M relation between projects and workers.

Endpoints:

```http
POST   /projects/:projectId/workers
DELETE /projects/:projectId/workers/:workerId
```

Request example:

```http
POST /projects/:projectId/workers
Authorization: Bearer dev-token
Content-Type: application/json
```

```json
{
  "workerId": "..."
}
```

Rules:

- `404 NOT_FOUND` if project does not exist
- `404 NOT_FOUND` if worker does not exist
- `409 ASSIGNMENT_ALREADY_EXISTS` if the assignment already exists
- `404 NOT_FOUND` on delete if assignment does not exist

Project read DTOs already include assigned workers:

```json
{
  "id": "...",
  "name": "Project 1",
  "clientName": "Client A",
  "startDate": "2026-03-05",
  "workers": [
    {
      "id": "...",
      "name": "Worker 1",
      "role": "Tech",
      "seniority": "junior"
    }
  ]
}
```

---

# Frontend Features

The frontend includes:

- public browsing of projects and workers
- login page
- auth provider with token persistence in `localStorage`
- automatic Authorization header injection through shared `http` client
- protected UI actions for create/update/delete
- assignment and unassignment UI in project detail

## Frontend auth behavior

Without login:

- lists remain visible
- detail pages remain visible
- write actions are hidden or redirect to login

With login:

- create/edit/delete actions become available
- assignments can be created/removed
- session persists across refresh via `localStorage`

Logout:

- clears token
- returns UI to public/read-only mode

---

# Error Format

All errors follow the same contract.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation error",
    "details": [
      {
        "field": "fieldName",
        "reason": "invalid_format"
      }
    ],
    "requestId": "..."
  }
}
```

Current project error codes:

- `VALIDATION_ERROR`
- `UNAUTHORIZED`
- `INVALID_CREDENTIALS`
- `NOT_FOUND`
- `ASSIGNMENT_ALREADY_EXISTS`
- `PROJECT_ALREADY_EXISTS`
- `INTERNAL_ERROR`

---

# Environment Files

## Backend tracked example file

Use this file for the repository:

```env
PORT=3000
HOST=0.0.0.0
DATABASE_URL="file:./prisma/dev.db"
```

Recommended file path:

```text
apps/api/.env.example
```

## Local backend file (not committed)

Create a local file for development:

```text
apps/api/.env
```

Example:

```env
PORT=3000
HOST=0.0.0.0
DATABASE_URL="file:./prisma/dev.db"
```

## Frontend optional local env

If needed, create:

```text
apps/web/.env.local
```

Example:

```env
VITE_API_BASE_URL=/api/v1
```

---

# Running the Project

Install dependencies:

```bash
npm install
```

Run Prisma migrations/reset database:

```bash
npm run api:prisma:migrate:reset
```

Start API:

```bash
npm run api:dev
```

Start frontend:

```bash
npm run web:dev
```

Build full monorepo:

```bash
npm run build
```

---

# Quick API Test

Health:

```bash
curl http://localhost:3000/api/v1/health
```

Login:

```bash
curl -X POST http://localhost:3000/api/v1/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}'
```

Create Worker:

```bash
curl -X POST http://localhost:3000/api/v1/workers -H "Authorization: Bearer dev-token" -H "Content-Type: application/json" -d '{"name":"W1","role":"Dev","seniority":"junior"}'
```

Create Project:

```bash
curl -X POST http://localhost:3000/api/v1/projects -H "Authorization: Bearer dev-token" -H "Content-Type: application/json" -d '{"name":"P1","clientName":"C1","startDate":"2026-03-01"}'
```

Assign Worker to Project:

```bash
curl -X POST http://localhost:3000/api/v1/projects/<projectId>/workers -H "Authorization: Bearer dev-token" -H "Content-Type: application/json" -d '{"workerId":"<workerId>"}'
```

---

# Current UI Routes

Frontend routes currently available:

```text
/               -> redirects to /projects
/login          -> login page
/projects       -> projects list + create/edit/delete UI
/projects/:id   -> project detail + assignment UI
/workers        -> workers list + create/edit/delete UI
```

---

# Notes

This project intentionally uses a simple hardcoded auth flow because it is a technical challenge implementation.

It does **not** include:

- JWT signing/verification
- refresh tokens
- cookies
- backend sessions
- RBAC / roles
- complex auth infrastructure

The goal is to keep the solution minimal, contract-first, and consistent with the project architecture.

---

# Author

Technical implementation created for a fullstack TypeScript coding challenge.
```

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
  prettierConfig,

  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" }
      ]
    }
  },

  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.json"]
      }
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

type ErrorWithStatusCode = Error & {
  statusCode?: number;
};

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err: FastifyError | Error, req, reply) => {
    const requestId = String(req.id);

    let status = 500;
    let code: ErrorResponseDTO["error"]["code"] = "INTERNAL_ERROR";
    let message = "Internal error";
    let details: ErrorResponseDTO["error"]["details"] | undefined;

    if (err instanceof AppError) {
      status = err.status;
      code = err.code;
      message = err.message;
      details = err.details;
    } else {
      const fastifyErr = err as ErrorWithStatusCode;

      if (typeof fastifyErr.statusCode === "number") {
        status = fastifyErr.statusCode;
        code = status >= 500 ? "INTERNAL_ERROR" : "VALIDATION_ERROR";
        message =
          err.message ||
          (status >= 500 ? "Internal error" : "Validation error");

        app.log.warn({ err, requestId }, "Non-domain error");
      } else {
        app.log.error({ err, requestId }, "Unhandled error");
      }
    }

    const payload: ErrorResponseDTO = {
      error: {
        code,
        message,
        ...(details ? { details } : {}),
        requestId
      }
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
import * as controller from "./auth.controller.js";

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
import { InvalidCredentialsError } from "../../shared/errors/AppError.js";
import type { LoginBody } from "./auth.schemas.js";

const AUTH_USERNAME = "admin";
const AUTH_PASSWORD = "admin123";
const AUTH_ACCESS_TOKEN = "dev-token";
const AUTH_TOKEN_TYPE = "Bearer" as const;
const AUTH_EXPIRES_IN = 3600;

export function login(body: LoginBody) {
  if (body.username !== AUTH_USERNAME || body.password !== AUTH_PASSWORD) {
    throw new InvalidCredentialsError();
  }

  return {
    accessToken: AUTH_ACCESS_TOKEN,
    tokenType: AUTH_TOKEN_TYPE,
    expiresIn: AUTH_EXPIRES_IN
  };
}

export function isValidAccessToken(token: string) {
  return token === AUTH_ACCESS_TOKEN;
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
  seniority: "junior" | "semi-senior" | "senior";
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
import { toDtoSeniority } from "../workers/workers.mappers.js";

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
    seniority: toDtoSeniority(pw.worker.seniority)
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
import {
  ValidationError,
  NotFoundError,
  ConflictError
} from "../../shared/errors/AppError.js";

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
  const anyErr = e as {
    code?: unknown;
    meta?: unknown;
    name?: unknown;
    message?: unknown;
  };

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
        endDate
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
      data.startDate !== undefined
        ? normalizeDate(data.startDate)
        : current.startDate;

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
        ...(data.clientName !== undefined
          ? { clientName: data.clientName }
          : {}),
        ...(data.startDate !== undefined ? { startDate } : {}),
        ...(data.endDate !== undefined ? { endDate } : {})
      });
    } catch (e) {
      prismaUniqueToConflict(e);
    }
  },

  async remove(id: string) {
    await this.getById(id);
    await projectsRepository.delete(id);
  }
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
import { requireAuth } from "../../shared/middlewares/auth.js";

export async function workersRoutes(app: FastifyInstance) {
  app.get("/workers", controller.list);
  app.get("/workers/:workerId", controller.getById);

  app.post("/workers", { preHandler: [requireAuth] }, controller.create);
  app.patch(
    "/workers/:workerId",
    { preHandler: [requireAuth] },
    controller.update
  );
  app.delete(
    "/workers/:workerId",
    { preHandler: [requireAuth] },
    controller.remove
  );
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
  constructor(
    code: "ASSIGNMENT_ALREADY_EXISTS" | "PROJECT_ALREADY_EXISTS",
    message: string
  ) {
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
import { UnauthorizedError } from "../errors/AppError.js";
import { isValidAccessToken } from "../../modules/auth/auth.service.js";

export async function requireAuth(req: FastifyRequest, _reply: FastifyReply) {
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";

  if (!token || !isValidAccessToken(token)) {
    throw new UnauthorizedError();
  }
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
=== apps/web/.env.example ===
VITE_API_BASE_URL=/api/v1
```

```text
=== apps/web/eslint.config.js ===
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/**", "node_modules/**", "src/**/*.js"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,

  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.json"]
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "error"
    }
  },

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
    "build": "tsc -p tsconfig.json --noEmit && vite build",
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
=== apps/web/src/App.tsx ===
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { ProjectsListPage } from "./features/projects/pages/ProjectsListPage";
import { ProjectDetailPage } from "./features/projects/pages/ProjectDetailPage";
import { WorkersListPage } from "./features/projects/pages/WorkersListPage";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { useAuth } from "./features/auth/context/AuthContext";

function AppShell() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div style={{ fontFamily: "system-ui", padding: 16 }}>
      <nav
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          alignItems: "center"
        }}
      >
        <Link to="/projects">Projects</Link>
        <Link to="/workers">Workers</Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          {isAuthenticated ? (
            <>
              <span>Authenticated</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/workers" element={<WorkersListPage />} />
      </Routes>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
```

```text
=== apps/web/src/features/auth/api/authApi.ts ===
import { http } from "@/shared/api/http";
import type { LoginRequestDTO, LoginResponseDTO } from "../types/auth";

export const authApi = {
  login: (data: LoginRequestDTO) =>
    http.post<LoginResponseDTO>("/auth/login", data)
};
```

```text
=== apps/web/src/features/auth/context/AuthContext.tsx ===
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { authApi } from "../api/authApi";
import type { LoginRequestDTO } from "../types/auth";
import { setHttpAuthToken } from "@/shared/api/http";

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  login: (data: LoginRequestDTO) => Promise<void>;
  logout: () => void;
};

const AUTH_STORAGE_KEY = "auth.token";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY);
  });

  useEffect(() => {
    setHttpAuthToken(token);
  }, [token]);

  const login = useCallback(async (data: LoginRequestDTO) => {
    const result = await authApi.login(data);
    setToken(result.accessToken);
    localStorage.setItem(AUTH_STORAGE_KEY, result.accessToken);
    setHttpAuthToken(result.accessToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setHttpAuthToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated: !!token,
      login,
      logout
    }),
    [token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
```

```text
=== apps/web/src/features/auth/pages/LoginPage.tsx ===
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { isAuthErrorResponse } from "../types/auth";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginLocationState = {
  from?: string;
};

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitError, setSubmitError] = useState("");

  const from =
    ((location.state as LoginLocationState | null)?.from ?? "/projects") ||
    "/projects";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  if (isAuthenticated) {
    return <Navigate to="/projects" replace />;
  }

  async function onSubmit(values: LoginFormValues) {
    setSubmitError("");

    try {
      await login(values);
      navigate(from, { replace: true });
    } catch (error: unknown) {
      if (
        isAuthErrorResponse(error) &&
        error.error.code === "INVALID_CREDENTIALS"
      ) {
        setSubmitError("Credenciales inválidas.");
        return;
      }

      if (
        isAuthErrorResponse(error) &&
        error.error.code === "VALIDATION_ERROR"
      ) {
        setSubmitError("Debes completar username y password.");
        return;
      }

      setSubmitError("No se pudo iniciar sesión.");
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h1 style={{ marginBottom: 16 }}>Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "grid", gap: 12 }}
      >
        <div style={{ display: "grid", gap: 6 }}>
          <label htmlFor="username">Username</label>
          <input id="username" {...register("username")} />
          {errors.username ? (
            <span style={{ color: "crimson" }}>{errors.username.message}</span>
          ) : null}
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password ? (
            <span style={{ color: "crimson" }}>{errors.password.message}</span>
          ) : null}
        </div>

        {submitError ? (
          <div style={{ color: "crimson" }}>{submitError}</div>
        ) : null}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
```

```text
=== apps/web/src/features/auth/types/auth.ts ===
export type LoginRequestDTO = {
  username: string;
  password: string;
};

export type LoginResponseDTO = {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
};

export type AuthErrorResponseDTO = {
  error: {
    code: string;
    message: string;
    details?: { field: string; reason: string }[];
    requestId?: string;
  };
};

export function isAuthErrorResponse(
  value: unknown
): value is AuthErrorResponseDTO {
  if (!value || typeof value !== "object") return false;
  if (!("error" in value)) return false;

  const maybeError = (value as { error?: unknown }).error;
  if (!maybeError || typeof maybeError !== "object") return false;

  return typeof (maybeError as { code?: unknown }).code === "string";
}
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

  remove: (id: string) => http.delete<void>(`/projects/${id}`),

  assignWorker: (projectId: string, workerId: string) =>
    http.post<void>(`/projects/${projectId}/workers`, { workerId }),

  unassignWorker: (projectId: string, workerId: string) =>
    http.delete<void>(`/projects/${projectId}/workers/${workerId}`)
};
```

```text
=== apps/web/src/features/projects/api/workersApi.ts ===
import { http } from "@/shared/api/http";
import type {
  WorkerCreateDTO,
  WorkerDTO,
  WorkerUpdateDTO
} from "../types/projects";

export type WorkersListResponseDTO = {
  items: WorkerDTO[];
};

export const workersApi = {
  list: () => http.get<WorkersListResponseDTO>("/workers"),

  create: (data: WorkerCreateDTO) => http.post<WorkerDTO>("/workers", data),

  update: (workerId: string, data: WorkerUpdateDTO) =>
    http.patch<WorkerDTO>(`/workers/${workerId}`, data),

  remove: (workerId: string) => http.delete<void>(`/workers/${workerId}`)
};
```

```text
=== apps/web/src/features/projects/components/ProjectModal.tsx ===
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectFormSchema,
  type ProjectFormValues
} from "../schemas/projectForm.schema";

type ProjectModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  initialValues?: Partial<ProjectFormValues>;
  isSubmitting: boolean;
  errorMessage: string;
  onClose: () => void;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
};

const emptyValues: ProjectFormValues = {
  name: "",
  clientName: "",
  startDate: "",
  endDate: ""
};

export function ProjectModal({
  isOpen,
  mode,
  initialValues,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit
}: ProjectModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: emptyValues
  });

  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: initialValues?.name ?? "",
      clientName: initialValues?.clientName ?? "",
      startDate: initialValues?.startDate ?? "",
      endDate: initialValues?.endDate ?? ""
    });
  }, [initialValues, isOpen, reset]);

  if (!isOpen) return null;

  async function submit(values: ProjectFormValues) {
    await onSubmit({
      ...values,
      endDate: values.endDate?.trim() ? values.endDate : undefined
    });
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          width: 520,
          maxWidth: "100%",
          borderRadius: 12,
          padding: 16
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <h3 style={{ marginTop: 0 }}>
          {mode === "create" ? "Create project" : "Edit project"}
        </h3>

        <form
          onSubmit={handleSubmit(submit)}
          style={{ display: "grid", gap: 12 }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="project-name">Name</label>
            <input id="project-name" {...register("name")} />
            {errors.name ? (
              <span style={{ color: "crimson" }}>{errors.name.message}</span>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="project-clientName">Client</label>
            <input id="project-clientName" {...register("clientName")} />
            {errors.clientName ? (
              <span style={{ color: "crimson" }}>
                {errors.clientName.message}
              </span>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="project-startDate">Start date</label>
            <input
              id="project-startDate"
              type="date"
              {...register("startDate")}
            />
            {errors.startDate ? (
              <span style={{ color: "crimson" }}>
                {errors.startDate.message}
              </span>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="project-endDate">End date</label>
            <input id="project-endDate" type="date" {...register("endDate")} />
            {errors.endDate ? (
              <span style={{ color: "crimson" }}>{errors.endDate.message}</span>
            ) : null}
          </div>

          {errorMessage ? (
            <div style={{ color: "crimson" }}>{errorMessage}</div>
          ) : null}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                  ? "Create"
                  : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

```text
=== apps/web/src/features/projects/components/WorkerModal.tsx ===
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  workerFormSchema,
  type WorkerFormValues
} from "../schemas/workerForm.schema";

type WorkerModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  initialValues?: Partial<WorkerFormValues>;
  isSubmitting: boolean;
  errorMessage: string;
  onClose: () => void;
  onSubmit: (values: WorkerFormValues) => Promise<void>;
};

const emptyValues: WorkerFormValues = {
  name: "",
  role: "",
  seniority: "junior"
};

export function WorkerModal({
  isOpen,
  mode,
  initialValues,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit
}: WorkerModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<WorkerFormValues>({
    resolver: zodResolver(workerFormSchema),
    defaultValues: emptyValues
  });

  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: initialValues?.name ?? "",
      role: initialValues?.role ?? "",
      seniority: initialValues?.seniority ?? "junior"
    });
  }, [initialValues, isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          width: 520,
          maxWidth: "100%",
          borderRadius: 12,
          padding: 16
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <h3 style={{ marginTop: 0 }}>
          {mode === "create" ? "Create worker" : "Edit worker"}
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "grid", gap: 12 }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="worker-name">Name</label>
            <input id="worker-name" {...register("name")} />
            {errors.name ? (
              <span style={{ color: "crimson" }}>{errors.name.message}</span>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="worker-role">Role</label>
            <input id="worker-role" {...register("role")} />
            {errors.role ? (
              <span style={{ color: "crimson" }}>{errors.role.message}</span>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="worker-seniority">Seniority</label>
            <select id="worker-seniority" {...register("seniority")}>
              <option value="junior">junior</option>
              <option value="semi-senior">semi-senior</option>
              <option value="senior">senior</option>
            </select>
            {errors.seniority ? (
              <span style={{ color: "crimson" }}>
                {errors.seniority.message}
              </span>
            ) : null}
          </div>

          {errorMessage ? (
            <div style={{ color: "crimson" }}>{errorMessage}</div>
          ) : null}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                  ? "Create"
                  : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

```text
=== apps/web/src/features/projects/hooks/useProjectAssignments.ts ===
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";

export function useAssignWorker() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { projectId: string; workerId: string }) =>
      projectsApi.assignWorker(args.projectId, args.workerId),
    onSuccess: async (_data, vars) => {
      await qc.invalidateQueries({
        queryKey: ["projects", "byId", vars.projectId]
      });
      await qc.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}

export function useUnassignWorker() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { projectId: string; workerId: string }) =>
      projectsApi.unassignWorker(args.projectId, args.workerId),
    onSuccess: async (_data, vars) => {
      await qc.invalidateQueries({
        queryKey: ["projects", "byId", vars.projectId]
      });
      await qc.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}
```

```text
=== apps/web/src/features/projects/hooks/useProjectById.ts ===
import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";
import type { ProjectResponseDTO } from "../types/projects";

export function useProjectById(projectId: string) {
  return useQuery<ProjectResponseDTO>({
    queryKey: ["projects", "byId", projectId],
    queryFn: () => projectsApi.getById(projectId),
    staleTime: 10_000,
    retry: 0,
    refetchOnWindowFocus: false,
    enabled: !!projectId
  });
}
```

```text
=== apps/web/src/features/projects/hooks/useProjectMutations.ts ===
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";
import type { ProjectCreateDTO, ProjectUpdateDTO } from "../types/projects";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectCreateDTO) => projectsApi.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { projectId: string; data: ProjectUpdateDTO }) =>
      projectsApi.update(args.projectId, args.data),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
      await queryClient.invalidateQueries({
        queryKey: ["projects", "byId", variables.projectId]
      });
    }
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => projectsApi.remove(projectId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
    }
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
=== apps/web/src/features/projects/hooks/useWorkerMutations.ts ===
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workersApi } from "../api/workersApi";
import type { WorkerCreateDTO, WorkerUpdateDTO } from "../types/projects";

export function useCreateWorker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WorkerCreateDTO) => workersApi.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workers", "list"] });
    }
  });
}

export function useUpdateWorker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { workerId: string; data: WorkerUpdateDTO }) =>
      workersApi.update(args.workerId, args.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workers", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}

export function useDeleteWorker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workerId: string) => workersApi.remove(workerId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workers", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}
```

```text
=== apps/web/src/features/projects/hooks/useWorkers.ts ===
import { useQuery } from "@tanstack/react-query";
import { workersApi } from "../api/workersApi";
import type { WorkersListResponseDTO } from "../api/workersApi";

export function useWorkers() {
  return useQuery<WorkersListResponseDTO>({
    queryKey: ["workers", "list"],
    queryFn: () => workersApi.list(),
    staleTime: 10_000,
    retry: 0,
    refetchOnWindowFocus: false
  });
}
```

```text
=== apps/web/src/features/projects/pages/ProjectDetailPage.tsx ===
import { useMemo, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useProjectById } from "../hooks/useProjectById";
import { useWorkers } from "../hooks/useWorkers";
import {
  useAssignWorker,
  useUnassignWorker
} from "../hooks/useProjectAssignments";
import type { WorkerDTO } from "../types/projects";
import { isApiErrorResponse } from "../types/projects";
import { useAuth } from "@/features/auth/context/AuthContext";

export function ProjectDetailPage() {
  const { projectId = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const { data: project, isLoading, error } = useProjectById(projectId);
  const { data: workersList } = useWorkers();
  const assign = useAssignWorker();
  const unassign = useUnassignWorker();

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>("");
  const [assignErrorMsg, setAssignErrorMsg] = useState<string>("");
  const [actionMessage, setActionMessage] = useState<string>("");

  const assignedIds = useMemo(
    () => new Set((project?.workers ?? []).map((worker) => worker.id)),
    [project]
  );

  const availableWorkers: WorkerDTO[] = useMemo(() => {
    const allWorkers = workersList?.items ?? [];
    return allWorkers.filter((worker) => !assignedIds.has(worker.id));
  }, [workersList, assignedIds]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project</div>;
  if (!project) return <div>Project not found</div>;

  function goToLoginWithReturn() {
    navigate("/login", {
      state: { from: location.pathname }
    });
  }

  async function onAssign() {
    if (!project) return;

    setAssignErrorMsg("");
    setActionMessage("");

    if (!isAuthenticated) {
      setAssignErrorMsg("Debes iniciar sesión para asignar trabajadores.");
      goToLoginWithReturn();
      return;
    }

    if (!selectedWorkerId) return;

    const currentProjectId = project.id;

    try {
      await assign.mutateAsync({
        projectId: currentProjectId,
        workerId: selectedWorkerId
      });

      setIsAssignOpen(false);
      setSelectedWorkerId("");
    } catch (error: unknown) {
      if (
        isApiErrorResponse(error) &&
        error.error.code === "ASSIGNMENT_ALREADY_EXISTS"
      ) {
        setAssignErrorMsg("Este trabajador ya está asignado a este proyecto.");
        return;
      }

      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        setAssignErrorMsg("Debes iniciar sesión para asignar trabajadores.");
        goToLoginWithReturn();
        return;
      }

      setAssignErrorMsg("No se pudo asignar el trabajador.");
    }
  }

  async function onUnassign(workerId: string) {
    if (!project) return;

    setActionMessage("");

    if (!isAuthenticated) {
      setActionMessage("Debes iniciar sesión para desasignar trabajadores.");
      goToLoginWithReturn();
      return;
    }

    const currentProjectId = project.id;

    try {
      await unassign.mutateAsync({
        projectId: currentProjectId,
        workerId
      });
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        setActionMessage("Debes iniciar sesión para desasignar trabajadores.");
        goToLoginWithReturn();
        return;
      }

      setActionMessage("No se pudo desasignar el trabajador.");
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Link to="/projects">← Back</Link>
      </div>

      <h2 style={{ margin: 0 }}>{project.name}</h2>

      <p style={{ marginTop: 6 }}>
        <strong>Client:</strong> {project.clientName}
      </p>

      <p style={{ marginTop: 6 }}>
        <strong>Dates:</strong> {project.startDate}{" "}
        {project.endDate ? `→ ${project.endDate}` : ""}
      </p>

      {!isAuthenticated ? (
        <div style={{ marginTop: 12, color: "#555" }}>
          Debes iniciar sesión para gestionar asignaciones.
        </div>
      ) : null}

      {actionMessage ? (
        <div style={{ marginTop: 12, color: "crimson" }}>{actionMessage}</div>
      ) : null}

      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 12
        }}
      >
        <h3 style={{ margin: 0 }}>Assigned workers</h3>

        {isAuthenticated ? (
          <button onClick={() => setIsAssignOpen(true)}>Assign worker</button>
        ) : (
          <button onClick={goToLoginWithReturn}>Assign worker</button>
        )}
      </div>

      {!project.workers.length ? (
        <div style={{ marginTop: 12 }}>No workers assigned yet</div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {project.workers.map((worker) => (
            <div
              key={worker.id}
              style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{worker.name}</div>
                  <div style={{ fontSize: 14, opacity: 0.8 }}>
                    {worker.role} · {worker.seniority}
                  </div>
                </div>

                {isAuthenticated ? (
                  <button
                    onClick={() => onUnassign(worker.id)}
                    disabled={unassign.isPending}
                    title="Unassign"
                  >
                    {unassign.isPending ? "..." : "Unassign"}
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {isAssignOpen && isAuthenticated && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16
          }}
          onClick={() => setIsAssignOpen(false)}
        >
          <div
            style={{
              background: "white",
              width: 480,
              maxWidth: "100%",
              borderRadius: 12,
              padding: 16
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <h3 style={{ marginTop: 0 }}>Assign worker</h3>

            {!availableWorkers.length ? (
              <div style={{ marginBottom: 12 }}>
                No available workers to assign.
              </div>
            ) : (
              <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
                <label style={{ fontSize: 14 }}>Worker</label>
                <select
                  value={selectedWorkerId}
                  onChange={(event) => setSelectedWorkerId(event.target.value)}
                >
                  <option value="">Select...</option>
                  {availableWorkers.map((worker) => (
                    <option key={worker.id} value={worker.id}>
                      {worker.name} — {worker.role} ({worker.seniority})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {assignErrorMsg ? (
              <div style={{ color: "crimson", marginBottom: 12 }}>
                {assignErrorMsg}
              </div>
            ) : null}

            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <button onClick={() => setIsAssignOpen(false)}>Cancel</button>
              <button
                onClick={onAssign}
                disabled={
                  !selectedWorkerId ||
                  assign.isPending ||
                  !availableWorkers.length
                }
              >
                {assign.isPending ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

```text
=== apps/web/src/features/projects/pages/ProjectsListPage.tsx ===
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import {
  useCreateProject,
  useDeleteProject,
  useUpdateProject
} from "../hooks/useProjectMutations";
import { ProjectModal } from "../components/ProjectModal";
import { useAuth } from "@/features/auth/context/AuthContext";
import { isApiErrorResponse, type ProjectResponseDTO } from "../types/projects";
import type { ProjectFormValues } from "../schemas/projectForm.schema";

type ProjectModalState =
  | { mode: "create"; project: null }
  | { mode: "edit"; project: ProjectResponseDTO }
  | null;

export function ProjectsListPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useProjects();

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [modalState, setModalState] = useState<ProjectModalState>(null);
  const [submitError, setSubmitError] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  const projects = data?.items ?? [];

  async function handleCreate(values: ProjectFormValues) {
    setSubmitError("");

    try {
      await createProject.mutateAsync(values);
      setModalState(null);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/projects" } });
        return;
      }

      if (
        isApiErrorResponse(error) &&
        error.error.code === "PROJECT_ALREADY_EXISTS"
      ) {
        setSubmitError(
          "A project with the same name, client and date already exists."
        );
        return;
      }

      setSubmitError("Could not create project.");
    }
  }

  async function handleUpdate(values: ProjectFormValues) {
    if (!modalState || modalState.mode !== "edit") return;

    setSubmitError("");

    try {
      await updateProject.mutateAsync({
        projectId: modalState.project.id,
        data: values
      });
      setModalState(null);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/projects" } });
        return;
      }

      if (
        isApiErrorResponse(error) &&
        error.error.code === "PROJECT_ALREADY_EXISTS"
      ) {
        setSubmitError(
          "A project with the same name, client and date already exists."
        );
        return;
      }

      setSubmitError("Could not update project.");
    }
  }

  async function handleDelete(projectId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmed) return;

    try {
      await deleteProject.mutateAsync(projectId);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/projects" } });
        return;
      }

      window.alert("Could not delete project.");
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16
        }}
      >
        <h2 style={{ margin: 0 }}>Projects</h2>

        {isAuthenticated ? (
          <button
            onClick={() => setModalState({ mode: "create", project: null })}
          >
            Create project
          </button>
        ) : (
          <button
            onClick={() => navigate("/login", { state: { from: "/projects" } })}
          >
            Login to create
          </button>
        )}
      </div>

      {!projects.length ? <div>No projects yet</div> : null}

      {projects.map((project) => (
        <div
          key={project.id}
          style={{
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 12
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              gap: 12
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
              </h3>
              <p style={{ margin: "6px 0 0 0" }}>{project.clientName}</p>
              <p style={{ margin: "6px 0 0 0", fontSize: 14 }}>
                {project.startDate}{" "}
                {project.endDate ? `→ ${project.endDate}` : ""}
              </p>
            </div>

            {isAuthenticated ? (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setModalState({ mode: "edit", project })}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  disabled={deleteProject.isPending}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ))}

      <ProjectModal
        isOpen={modalState !== null}
        mode={modalState?.mode ?? "create"}
        initialValues={
          modalState?.mode === "edit"
            ? {
                name: modalState.project.name,
                clientName: modalState.project.clientName,
                startDate: modalState.project.startDate,
                endDate: modalState.project.endDate
              }
            : undefined
        }
        isSubmitting={createProject.isPending || updateProject.isPending}
        errorMessage={submitError}
        onClose={() => {
          setModalState(null);
          setSubmitError("");
        }}
        onSubmit={modalState?.mode === "edit" ? handleUpdate : handleCreate}
      />
    </div>
  );
}
```

```text
=== apps/web/src/features/projects/pages/WorkersListPage.tsx ===
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkers } from "../hooks/useWorkers";
import {
  useCreateWorker,
  useDeleteWorker,
  useUpdateWorker
} from "../hooks/useWorkerMutations";
import { WorkerModal } from "../components/WorkerModal";
import { useAuth } from "@/features/auth/context/AuthContext";
import { isApiErrorResponse, type WorkerDTO } from "../types/projects";
import type { WorkerFormValues } from "../schemas/workerForm.schema";

type WorkerModalState =
  | { mode: "create"; worker: null }
  | { mode: "edit"; worker: WorkerDTO }
  | null;

export function WorkersListPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useWorkers();

  const createWorker = useCreateWorker();
  const updateWorker = useUpdateWorker();
  const deleteWorker = useDeleteWorker();

  const [modalState, setModalState] = useState<WorkerModalState>(null);
  const [submitError, setSubmitError] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading workers</div>;

  const workers = data?.items ?? [];

  async function handleCreate(values: WorkerFormValues) {
    setSubmitError("");

    try {
      await createWorker.mutateAsync(values);
      setModalState(null);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/workers" } });
        return;
      }

      setSubmitError("Could not create worker.");
    }
  }

  async function handleUpdate(values: WorkerFormValues) {
    if (!modalState || modalState.mode !== "edit") return;

    setSubmitError("");

    try {
      await updateWorker.mutateAsync({
        workerId: modalState.worker.id,
        data: values
      });
      setModalState(null);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/workers" } });
        return;
      }

      setSubmitError("Could not update worker.");
    }
  }

  async function handleDelete(workerId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this worker?"
    );
    if (!confirmed) return;

    try {
      await deleteWorker.mutateAsync(workerId);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/workers" } });
        return;
      }

      window.alert("Could not delete worker.");
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16
        }}
      >
        <h2 style={{ margin: 0 }}>Workers</h2>

        {isAuthenticated ? (
          <button
            onClick={() => setModalState({ mode: "create", worker: null })}
          >
            Create worker
          </button>
        ) : (
          <button
            onClick={() => navigate("/login", { state: { from: "/workers" } })}
          >
            Login to create
          </button>
        )}
      </div>

      {!workers.length ? <div>No workers yet</div> : null}

      {workers.map((worker) => (
        <div
          key={worker.id}
          style={{
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 12
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              gap: 12
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>{worker.name}</h3>
              <p style={{ margin: "6px 0 0 0" }}>{worker.role}</p>
              <p style={{ margin: "6px 0 0 0", fontSize: 14 }}>
                {worker.seniority}
              </p>
            </div>

            {isAuthenticated ? (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setModalState({ mode: "edit", worker })}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(worker.id)}
                  disabled={deleteWorker.isPending}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ))}

      <WorkerModal
        isOpen={modalState !== null}
        mode={modalState?.mode ?? "create"}
        initialValues={
          modalState?.mode === "edit"
            ? {
                name: modalState.worker.name,
                role: modalState.worker.role,
                seniority: modalState.worker.seniority
              }
            : undefined
        }
        isSubmitting={createWorker.isPending || updateWorker.isPending}
        errorMessage={submitError}
        onClose={() => {
          setModalState(null);
          setSubmitError("");
        }}
        onSubmit={modalState?.mode === "edit" ? handleUpdate : handleCreate}
      />
    </div>
  );
}
```

```text
=== apps/web/src/features/projects/schemas/projectForm.schema.ts ===
import { z } from "zod";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const projectFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    clientName: z.string().min(1, "Client name is required"),
    startDate: z.string().regex(isoDateRegex, "Invalid date format"),
    endDate: z
      .string()
      .regex(isoDateRegex, "Invalid date format")
      .optional()
      .or(z.literal(""))
  })
  .superRefine((data, ctx) => {
    const normalizedEndDate = data.endDate === "" ? undefined : data.endDate;

    if (normalizedEndDate && normalizedEndDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "endDate must be greater than or equal to startDate"
      });
    }
  });

export type ProjectFormValues = {
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
};
```

```text
=== apps/web/src/features/projects/schemas/workerForm.schema.ts ===
import { z } from "zod";

export const workerFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(120, "Max 120 chars"),
  role: z.string().min(1, "Role is required").max(60, "Max 60 chars"),
  seniority: z.enum(["junior", "semi-senior", "senior"])
});

export type WorkerFormValues = z.infer<typeof workerFormSchema>;
```

```text
=== apps/web/src/features/projects/types/projects.ts ===
export type WorkerDTO = {
  id: string;
  name: string;
  role: string;
  seniority: "junior" | "semi-senior" | "senior";
};

export type WorkerCreateDTO = {
  name: string;
  role: string;
  seniority: "junior" | "semi-senior" | "senior";
};

export type WorkerUpdateDTO = Partial<WorkerCreateDTO>;

export type ProjectResponseDTO = {
  id: string;
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
  workers: WorkerDTO[];
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

export type ApiErrorResponseDTO = {
  error: {
    code: string;
    message: string;
    details?: { field: string; reason: string }[];
    requestId?: string;
  };
};

export function isApiErrorResponse(
  error: unknown
): error is ApiErrorResponseDTO {
  if (!error || typeof error !== "object") return false;
  if (!("error" in error)) return false;

  const maybeError = (error as { error?: unknown }).error;
  if (!maybeError || typeof maybeError !== "object") return false;

  return typeof (maybeError as { code?: unknown }).code === "string";
}
```

```text
=== apps/web/src/main.tsx ===
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { AuthProvider } from "./features/auth/context/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
```

```text
=== apps/web/src/shared/api/http.ts ===
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

let authToken: string | null = null;

export function setHttpAuthToken(token: string | null) {
  authToken = token;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const headers = new Headers(init?.headers);

  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (authToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  const data = (await response.json().catch(() => null)) as T | null;

  if (!response.ok) {
    throw (
      data ??
      ({
        error: { code: "HTTP_ERROR", message: `HTTP ${response.status}` }
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
    "noEmit": true,
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src", "vite.config.ts"]
}
```

```text
=== apps/web/vite.config.js ===
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

- Generated at: 2026-03-06T20:36:56-03:00
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
│       │   │   ├── auth/
│       │   │   │   ├── api/
│       │   │   │   │   └── authApi.ts
│       │   │   │   ├── context/
│       │   │   │   │   └── AuthContext.tsx
│       │   │   │   ├── pages/
│       │   │   │   │   └── LoginPage.tsx
│       │   │   │   └── types/
│       │   │   │       └── auth.ts
│       │   │   └── projects/
│       │   │       ├── api/
│       │   │       │   ├── projectsApi.ts
│       │   │       │   └── workersApi.ts
│       │   │       ├── components/
│       │   │       │   ├── ProjectModal.tsx
│       │   │       │   └── WorkerModal.tsx
│       │   │       ├── hooks/
│       │   │       │   ├── useProjectAssignments.ts
│       │   │       │   ├── useProjectById.ts
│       │   │       │   ├── useProjectMutations.ts
│       │   │       │   ├── useProjects.ts
│       │   │       │   ├── useWorkerMutations.ts
│       │   │       │   └── useWorkers.ts
│       │   │       ├── pages/
│       │   │       │   ├── ProjectDetailPage.tsx
│       │   │       │   ├── ProjectsListPage.tsx
│       │   │       │   └── WorkersListPage.tsx
│       │   │       ├── schemas/
│       │   │       │   ├── projectForm.schema.ts
│       │   │       │   └── workerForm.schema.ts
│       │   │       └── types/
│       │   │           └── projects.ts
│       │   ├── shared/
│       │   │   └── api/
│       │   │       └── http.ts
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── vite-env.d.ts
│       ├── .env.example
│       ├── eslint.config.js
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.js
│       └── vite.config.ts
├── README.md
├── package.json
├── project_context.md
└── tsconfig.base.json
```

## File Contents

```text
=== README.md ===
# Projects Workers Monorepo

Fullstack technical project implementing a contract-first monorepo with:

- Authentication
- Workers CRUD
- Projects CRUD
- Project ↔ Worker assignments
- Frontend auth-aware UI for protected mutations

The repository is structured as a monorepo containing a backend API and a frontend web application.

---

# Architecture

Monorepo structure:

```text
apps/
  api/    -> Fastify + TypeScript backend API
  web/    -> React + Vite frontend
```

Backend stack:

- Node.js
- Fastify
- TypeScript
- Prisma ORM
- SQLite
- Zod validation

Frontend stack:

- React
- TypeScript
- Vite
- React Query
- React Hook Form
- Zod
- React Router

---

# API Base URL

```text
http://localhost:3000/api/v1
```

---

# Features Implemented

## Base Infrastructure

- Request ID support via Fastify `req.id`
- `x-request-id` response header on every response
- Global error handler
- Standard error format
- Health endpoint
- Auth middleware for protected write operations

Endpoint:

```http
GET /api/v1/health
```

Response:

```json
{
  "status": "ok",
  "requestId": "..."
}
```

---

# Authentication

Temporary hardcoded login for the technical challenge.

```http
POST /api/v1/auth/login
```

Request:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:

```json
{
  "accessToken": "dev-token",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

Use token in protected requests:

```http
Authorization: Bearer dev-token
```

## Auth behavior

Protected write endpoints require:

```http
Authorization: Bearer <token>
```

If token is missing or invalid:

- `401 UNAUTHORIZED`

If login credentials are invalid:

- `401 INVALID_CREDENTIALS`

### Public endpoints

These remain public:

```http
GET /health
GET /workers
GET /workers/:workerId
GET /projects
GET /projects/:projectId
```

### Protected endpoints

These require auth:

```http
POST   /workers
PATCH  /workers/:workerId
DELETE /workers/:workerId

POST   /projects
PATCH  /projects/:projectId
DELETE /projects/:projectId

POST   /projects/:projectId/workers
DELETE /projects/:projectId/workers/:workerId
```

---

# Workers CRUD

Model:

```text
Worker
- id (UUID)
- name
- role
- seniority (enum)
```

Endpoints:

```http
POST   /workers
GET    /workers
GET    /workers/:workerId
PATCH  /workers/:workerId
DELETE /workers/:workerId
```

Example create:

```http
POST /workers
Authorization: Bearer dev-token
Content-Type: application/json
```

```json
{
  "name": "John",
  "role": "Backend Developer",
  "seniority": "junior"
}
```

---

# Projects CRUD

Model:

```text
Project
- id (UUID)
- name
- clientName
- startDate (YYYY-MM-DD)
- endDate (optional)
```

Validation rules:

- `startDate` format must be `YYYY-MM-DD`
- if `endDate` exists, then `endDate >= startDate`

Endpoints:

```http
POST   /projects
GET    /projects
GET    /projects/:projectId
PATCH  /projects/:projectId
DELETE /projects/:projectId
```

Unique constraint:

```text
(name, clientName, startDate)
```

Duplicate creation/update returns:

```text
409 PROJECT_ALREADY_EXISTS
```

Example create:

```http
POST /projects
Authorization: Bearer dev-token
Content-Type: application/json
```

```json
{
  "name": "P1",
  "clientName": "Client A",
  "startDate": "2026-03-01"
}
```

---

# Project ↔ Worker Assignments

Assignments are modeled as an N:M relation between projects and workers.

Endpoints:

```http
POST   /projects/:projectId/workers
DELETE /projects/:projectId/workers/:workerId
```

Request example:

```http
POST /projects/:projectId/workers
Authorization: Bearer dev-token
Content-Type: application/json
```

```json
{
  "workerId": "..."
}
```

Rules:

- `404 NOT_FOUND` if project does not exist
- `404 NOT_FOUND` if worker does not exist
- `409 ASSIGNMENT_ALREADY_EXISTS` if the assignment already exists
- `404 NOT_FOUND` on delete if assignment does not exist

Project read DTOs already include assigned workers:

```json
{
  "id": "...",
  "name": "Project 1",
  "clientName": "Client A",
  "startDate": "2026-03-05",
  "workers": [
    {
      "id": "...",
      "name": "Worker 1",
      "role": "Tech",
      "seniority": "junior"
    }
  ]
}
```

---

# Frontend Features

The frontend includes:

- public browsing of projects and workers
- login page
- auth provider with token persistence in `localStorage`
- automatic Authorization header injection through shared `http` client
- protected UI actions for create/update/delete
- assignment and unassignment UI in project detail

## Frontend auth behavior

Without login:

- lists remain visible
- detail pages remain visible
- write actions are hidden or redirect to login

With login:

- create/edit/delete actions become available
- assignments can be created/removed
- session persists across refresh via `localStorage`

Logout:

- clears token
- returns UI to public/read-only mode

---

# Error Format

All errors follow the same contract.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation error",
    "details": [
      {
        "field": "fieldName",
        "reason": "invalid_format"
      }
    ],
    "requestId": "..."
  }
}
```

Current project error codes:

- `VALIDATION_ERROR`
- `UNAUTHORIZED`
- `INVALID_CREDENTIALS`
- `NOT_FOUND`
- `ASSIGNMENT_ALREADY_EXISTS`
- `PROJECT_ALREADY_EXISTS`
- `INTERNAL_ERROR`

---

# Environment Files

## Backend tracked example file

Use this file for the repository:

```env
PORT=3000
HOST=0.0.0.0
DATABASE_URL="file:./prisma/dev.db"
```

Recommended file path:

```text
apps/api/.env.example
```

## Local backend file (not committed)

Create a local file for development:

```text
apps/api/.env
```

Example:

```env
PORT=3000
HOST=0.0.0.0
DATABASE_URL="file:./prisma/dev.db"
```

## Frontend optional local env

If needed, create:

```text
apps/web/.env.local
```

Example:

```env
VITE_API_BASE_URL=/api/v1
```

---

# Running the Project

Install dependencies:

```bash
npm install
```

Run Prisma migrations/reset database:

```bash
npm run api:prisma:migrate:reset
```

Start API:

```bash
npm run api:dev
```

Start frontend:

```bash
npm run web:dev
```

Build full monorepo:

```bash
npm run build
```

---

# Quick API Test

Health:

```bash
curl http://localhost:3000/api/v1/health
```

Login:

```bash
curl -X POST http://localhost:3000/api/v1/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}'
```

Create Worker:

```bash
curl -X POST http://localhost:3000/api/v1/workers -H "Authorization: Bearer dev-token" -H "Content-Type: application/json" -d '{"name":"W1","role":"Dev","seniority":"junior"}'
```

Create Project:

```bash
curl -X POST http://localhost:3000/api/v1/projects -H "Authorization: Bearer dev-token" -H "Content-Type: application/json" -d '{"name":"P1","clientName":"C1","startDate":"2026-03-01"}'
```

Assign Worker to Project:

```bash
curl -X POST http://localhost:3000/api/v1/projects/<projectId>/workers -H "Authorization: Bearer dev-token" -H "Content-Type: application/json" -d '{"workerId":"<workerId>"}'
```

---

# Current UI Routes

Frontend routes currently available:

```text
/               -> redirects to /projects
/login          -> login page
/projects       -> projects list + create/edit/delete UI
/projects/:id   -> project detail + assignment UI
/workers        -> workers list + create/edit/delete UI
```

---

# Notes

This project intentionally uses a simple hardcoded auth flow because it is a technical challenge implementation.

It does **not** include:

- JWT signing/verification
- refresh tokens
- cookies
- backend sessions
- RBAC / roles
- complex auth infrastructure

The goal is to keep the solution minimal, contract-first, and consistent with the project architecture.

---

# Author

Technical implementation created for a fullstack TypeScript coding challenge.
```

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
  prettierConfig,

  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" }
      ]
    }
  },

  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.json"]
      }
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

type ErrorWithStatusCode = Error & {
  statusCode?: number;
};

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err: FastifyError | Error, req, reply) => {
    const requestId = String(req.id);

    let status = 500;
    let code: ErrorResponseDTO["error"]["code"] = "INTERNAL_ERROR";
    let message = "Internal error";
    let details: ErrorResponseDTO["error"]["details"] | undefined;

    if (err instanceof AppError) {
      status = err.status;
      code = err.code;
      message = err.message;
      details = err.details;
    } else {
      const fastifyErr = err as ErrorWithStatusCode;

      if (typeof fastifyErr.statusCode === "number") {
        status = fastifyErr.statusCode;
        code = status >= 500 ? "INTERNAL_ERROR" : "VALIDATION_ERROR";
        message =
          err.message ||
          (status >= 500 ? "Internal error" : "Validation error");

        app.log.warn({ err, requestId }, "Non-domain error");
      } else {
        app.log.error({ err, requestId }, "Unhandled error");
      }
    }

    const payload: ErrorResponseDTO = {
      error: {
        code,
        message,
        ...(details ? { details } : {}),
        requestId
      }
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
import * as controller from "./auth.controller.js";

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
import { InvalidCredentialsError } from "../../shared/errors/AppError.js";
import type { LoginBody } from "./auth.schemas.js";

const AUTH_USERNAME = "admin";
const AUTH_PASSWORD = "admin123";
const AUTH_ACCESS_TOKEN = "dev-token";
const AUTH_TOKEN_TYPE = "Bearer" as const;
const AUTH_EXPIRES_IN = 3600;

export function login(body: LoginBody) {
  if (body.username !== AUTH_USERNAME || body.password !== AUTH_PASSWORD) {
    throw new InvalidCredentialsError();
  }

  return {
    accessToken: AUTH_ACCESS_TOKEN,
    tokenType: AUTH_TOKEN_TYPE,
    expiresIn: AUTH_EXPIRES_IN
  };
}

export function isValidAccessToken(token: string) {
  return token === AUTH_ACCESS_TOKEN;
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
  seniority: "junior" | "semi-senior" | "senior";
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
import { toDtoSeniority } from "../workers/workers.mappers.js";

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
    seniority: toDtoSeniority(pw.worker.seniority)
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
import {
  ValidationError,
  NotFoundError,
  ConflictError
} from "../../shared/errors/AppError.js";

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
  const anyErr = e as {
    code?: unknown;
    meta?: unknown;
    name?: unknown;
    message?: unknown;
  };

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
        endDate
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
      data.startDate !== undefined
        ? normalizeDate(data.startDate)
        : current.startDate;

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
        ...(data.clientName !== undefined
          ? { clientName: data.clientName }
          : {}),
        ...(data.startDate !== undefined ? { startDate } : {}),
        ...(data.endDate !== undefined ? { endDate } : {})
      });
    } catch (e) {
      prismaUniqueToConflict(e);
    }
  },

  async remove(id: string) {
    await this.getById(id);
    await projectsRepository.delete(id);
  }
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
import { requireAuth } from "../../shared/middlewares/auth.js";

export async function workersRoutes(app: FastifyInstance) {
  app.get("/workers", controller.list);
  app.get("/workers/:workerId", controller.getById);

  app.post("/workers", { preHandler: [requireAuth] }, controller.create);
  app.patch(
    "/workers/:workerId",
    { preHandler: [requireAuth] },
    controller.update
  );
  app.delete(
    "/workers/:workerId",
    { preHandler: [requireAuth] },
    controller.remove
  );
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
  constructor(
    code: "ASSIGNMENT_ALREADY_EXISTS" | "PROJECT_ALREADY_EXISTS",
    message: string
  ) {
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
import { UnauthorizedError } from "../errors/AppError.js";
import { isValidAccessToken } from "../../modules/auth/auth.service.js";

export async function requireAuth(req: FastifyRequest, _reply: FastifyReply) {
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";

  if (!token || !isValidAccessToken(token)) {
    throw new UnauthorizedError();
  }
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
=== apps/web/.env.example ===
VITE_API_BASE_URL=/api/v1
```

```text
=== apps/web/eslint.config.js ===
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/**", "node_modules/**", "src/**/*.js"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,

  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.json"]
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "error"
    }
  },

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
    "build": "tsc -p tsconfig.json --noEmit && vite build",
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
=== apps/web/src/App.tsx ===
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { ProjectsListPage } from "./features/projects/pages/ProjectsListPage";
import { ProjectDetailPage } from "./features/projects/pages/ProjectDetailPage";
import { WorkersListPage } from "./features/projects/pages/WorkersListPage";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { useAuth } from "./features/auth/context/AuthContext";

function AppShell() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div style={{ fontFamily: "system-ui", padding: 16 }}>
      <nav
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          alignItems: "center"
        }}
      >
        <Link to="/projects">Projects</Link>
        <Link to="/workers">Workers</Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          {isAuthenticated ? (
            <>
              <span>Authenticated</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/workers" element={<WorkersListPage />} />
      </Routes>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
```

```text
=== apps/web/src/features/auth/api/authApi.ts ===
import { http } from "@/shared/api/http";
import type { LoginRequestDTO, LoginResponseDTO } from "../types/auth";

export const authApi = {
  login: (data: LoginRequestDTO) =>
    http.post<LoginResponseDTO>("/auth/login", data)
};
```

```text
=== apps/web/src/features/auth/context/AuthContext.tsx ===
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { authApi } from "../api/authApi";
import type { LoginRequestDTO } from "../types/auth";
import { setHttpAuthToken } from "@/shared/api/http";

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  login: (data: LoginRequestDTO) => Promise<void>;
  logout: () => void;
};

const AUTH_STORAGE_KEY = "auth.token";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY);
  });

  useEffect(() => {
    setHttpAuthToken(token);
  }, [token]);

  const login = useCallback(async (data: LoginRequestDTO) => {
    const result = await authApi.login(data);
    setToken(result.accessToken);
    localStorage.setItem(AUTH_STORAGE_KEY, result.accessToken);
    setHttpAuthToken(result.accessToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setHttpAuthToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated: !!token,
      login,
      logout
    }),
    [token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
```

```text
=== apps/web/src/features/auth/pages/LoginPage.tsx ===
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { isAuthErrorResponse } from "../types/auth";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginLocationState = {
  from?: string;
};

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitError, setSubmitError] = useState("");

  const from =
    ((location.state as LoginLocationState | null)?.from ?? "/projects") ||
    "/projects";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  if (isAuthenticated) {
    return <Navigate to="/projects" replace />;
  }

  async function onSubmit(values: LoginFormValues) {
    setSubmitError("");

    try {
      await login(values);
      navigate(from, { replace: true });
    } catch (error: unknown) {
      if (
        isAuthErrorResponse(error) &&
        error.error.code === "INVALID_CREDENTIALS"
      ) {
        setSubmitError("Credenciales inválidas.");
        return;
      }

      if (
        isAuthErrorResponse(error) &&
        error.error.code === "VALIDATION_ERROR"
      ) {
        setSubmitError("Debes completar username y password.");
        return;
      }

      setSubmitError("No se pudo iniciar sesión.");
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h1 style={{ marginBottom: 16 }}>Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "grid", gap: 12 }}
      >
        <div style={{ display: "grid", gap: 6 }}>
          <label htmlFor="username">Username</label>
          <input id="username" {...register("username")} />
          {errors.username ? (
            <span style={{ color: "crimson" }}>{errors.username.message}</span>
          ) : null}
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password ? (
            <span style={{ color: "crimson" }}>{errors.password.message}</span>
          ) : null}
        </div>

        {submitError ? (
          <div style={{ color: "crimson" }}>{submitError}</div>
        ) : null}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
```

```text
=== apps/web/src/features/auth/types/auth.ts ===
export type LoginRequestDTO = {
  username: string;
  password: string;
};

export type LoginResponseDTO = {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
};

export type AuthErrorResponseDTO = {
  error: {
    code: string;
    message: string;
    details?: { field: string; reason: string }[];
    requestId?: string;
  };
};

export function isAuthErrorResponse(
  value: unknown
): value is AuthErrorResponseDTO {
  if (!value || typeof value !== "object") return false;
  if (!("error" in value)) return false;

  const maybeError = (value as { error?: unknown }).error;
  if (!maybeError || typeof maybeError !== "object") return false;

  return typeof (maybeError as { code?: unknown }).code === "string";
}
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

  remove: (id: string) => http.delete<void>(`/projects/${id}`),

  assignWorker: (projectId: string, workerId: string) =>
    http.post<void>(`/projects/${projectId}/workers`, { workerId }),

  unassignWorker: (projectId: string, workerId: string) =>
    http.delete<void>(`/projects/${projectId}/workers/${workerId}`)
};
```

```text
=== apps/web/src/features/projects/api/workersApi.ts ===
import { http } from "@/shared/api/http";
import type {
  WorkerCreateDTO,
  WorkerDTO,
  WorkerUpdateDTO
} from "../types/projects";

export type WorkersListResponseDTO = {
  items: WorkerDTO[];
};

export const workersApi = {
  list: () => http.get<WorkersListResponseDTO>("/workers"),

  create: (data: WorkerCreateDTO) => http.post<WorkerDTO>("/workers", data),

  update: (workerId: string, data: WorkerUpdateDTO) =>
    http.patch<WorkerDTO>(`/workers/${workerId}`, data),

  remove: (workerId: string) => http.delete<void>(`/workers/${workerId}`)
};
```

```text
=== apps/web/src/features/projects/components/ProjectModal.tsx ===
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectFormSchema,
  type ProjectFormValues
} from "../schemas/projectForm.schema";

type ProjectModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  initialValues?: Partial<ProjectFormValues>;
  isSubmitting: boolean;
  errorMessage: string;
  onClose: () => void;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
};

const emptyValues: ProjectFormValues = {
  name: "",
  clientName: "",
  startDate: "",
  endDate: ""
};

export function ProjectModal({
  isOpen,
  mode,
  initialValues,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit
}: ProjectModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: emptyValues
  });

  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: initialValues?.name ?? "",
      clientName: initialValues?.clientName ?? "",
      startDate: initialValues?.startDate ?? "",
      endDate: initialValues?.endDate ?? ""
    });
  }, [initialValues, isOpen, reset]);

  if (!isOpen) return null;

  async function submit(values: ProjectFormValues) {
    await onSubmit({
      ...values,
      endDate: values.endDate?.trim() ? values.endDate : undefined
    });
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          width: 520,
          maxWidth: "100%",
          borderRadius: 12,
          padding: 16
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <h3 style={{ marginTop: 0 }}>
          {mode === "create" ? "Create project" : "Edit project"}
        </h3>

        <form
          onSubmit={handleSubmit(submit)}
          style={{ display: "grid", gap: 12 }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="project-name">Name</label>
            <input id="project-name" {...register("name")} />
            {errors.name ? (
              <span style={{ color: "crimson" }}>{errors.name.message}</span>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="project-clientName">Client</label>
            <input id="project-clientName" {...register("clientName")} />
            {errors.clientName ? (
              <span style={{ color: "crimson" }}>
                {errors.clientName.message}
              </span>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="project-startDate">Start date</label>
            <input
              id="project-startDate"
              type="date"
              {...register("startDate")}
            />
            {errors.startDate ? (
              <span style={{ color: "crimson" }}>
                {errors.startDate.message}
              </span>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="project-endDate">End date</label>
            <input id="project-endDate" type="date" {...register("endDate")} />
            {errors.endDate ? (
              <span style={{ color: "crimson" }}>{errors.endDate.message}</span>
            ) : null}
          </div>

          {errorMessage ? (
            <div style={{ color: "crimson" }}>{errorMessage}</div>
          ) : null}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                  ? "Create"
                  : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

```text
=== apps/web/src/features/projects/components/WorkerModal.tsx ===
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  workerFormSchema,
  type WorkerFormValues
} from "../schemas/workerForm.schema";

type WorkerModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  initialValues?: Partial<WorkerFormValues>;
  isSubmitting: boolean;
  errorMessage: string;
  onClose: () => void;
  onSubmit: (values: WorkerFormValues) => Promise<void>;
};

const emptyValues: WorkerFormValues = {
  name: "",
  role: "",
  seniority: "junior"
};

export function WorkerModal({
  isOpen,
  mode,
  initialValues,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit
}: WorkerModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<WorkerFormValues>({
    resolver: zodResolver(workerFormSchema),
    defaultValues: emptyValues
  });

  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: initialValues?.name ?? "",
      role: initialValues?.role ?? "",
      seniority: initialValues?.seniority ?? "junior"
    });
  }, [initialValues, isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          width: 520,
          maxWidth: "100%",
          borderRadius: 12,
          padding: 16
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <h3 style={{ marginTop: 0 }}>
          {mode === "create" ? "Create worker" : "Edit worker"}
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "grid", gap: 12 }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="worker-name">Name</label>
            <input id="worker-name" {...register("name")} />
            {errors.name ? (
              <span style={{ color: "crimson" }}>{errors.name.message}</span>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="worker-role">Role</label>
            <input id="worker-role" {...register("role")} />
            {errors.role ? (
              <span style={{ color: "crimson" }}>{errors.role.message}</span>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="worker-seniority">Seniority</label>
            <select id="worker-seniority" {...register("seniority")}>
              <option value="junior">junior</option>
              <option value="semi-senior">semi-senior</option>
              <option value="senior">senior</option>
            </select>
            {errors.seniority ? (
              <span style={{ color: "crimson" }}>
                {errors.seniority.message}
              </span>
            ) : null}
          </div>

          {errorMessage ? (
            <div style={{ color: "crimson" }}>{errorMessage}</div>
          ) : null}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                  ? "Create"
                  : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

```text
=== apps/web/src/features/projects/hooks/useProjectAssignments.ts ===
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";

export function useAssignWorker() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { projectId: string; workerId: string }) =>
      projectsApi.assignWorker(args.projectId, args.workerId),
    onSuccess: async (_data, vars) => {
      await qc.invalidateQueries({
        queryKey: ["projects", "byId", vars.projectId]
      });
      await qc.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}

export function useUnassignWorker() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { projectId: string; workerId: string }) =>
      projectsApi.unassignWorker(args.projectId, args.workerId),
    onSuccess: async (_data, vars) => {
      await qc.invalidateQueries({
        queryKey: ["projects", "byId", vars.projectId]
      });
      await qc.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}
```

```text
=== apps/web/src/features/projects/hooks/useProjectById.ts ===
import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";
import type { ProjectResponseDTO } from "../types/projects";

export function useProjectById(projectId: string) {
  return useQuery<ProjectResponseDTO>({
    queryKey: ["projects", "byId", projectId],
    queryFn: () => projectsApi.getById(projectId),
    staleTime: 10_000,
    retry: 0,
    refetchOnWindowFocus: false,
    enabled: !!projectId
  });
}
```

```text
=== apps/web/src/features/projects/hooks/useProjectMutations.ts ===
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../api/projectsApi";
import type { ProjectCreateDTO, ProjectUpdateDTO } from "../types/projects";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectCreateDTO) => projectsApi.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { projectId: string; data: ProjectUpdateDTO }) =>
      projectsApi.update(args.projectId, args.data),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
      await queryClient.invalidateQueries({
        queryKey: ["projects", "byId", variables.projectId]
      });
    }
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => projectsApi.remove(projectId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
    }
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
=== apps/web/src/features/projects/hooks/useWorkerMutations.ts ===
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workersApi } from "../api/workersApi";
import type { WorkerCreateDTO, WorkerUpdateDTO } from "../types/projects";

export function useCreateWorker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WorkerCreateDTO) => workersApi.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workers", "list"] });
    }
  });
}

export function useUpdateWorker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { workerId: string; data: WorkerUpdateDTO }) =>
      workersApi.update(args.workerId, args.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workers", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}

export function useDeleteWorker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workerId: string) => workersApi.remove(workerId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workers", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
    }
  });
}
```

```text
=== apps/web/src/features/projects/hooks/useWorkers.ts ===
import { useQuery } from "@tanstack/react-query";
import { workersApi } from "../api/workersApi";
import type { WorkersListResponseDTO } from "../api/workersApi";

export function useWorkers() {
  return useQuery<WorkersListResponseDTO>({
    queryKey: ["workers", "list"],
    queryFn: () => workersApi.list(),
    staleTime: 10_000,
    retry: 0,
    refetchOnWindowFocus: false
  });
}
```

```text
=== apps/web/src/features/projects/pages/ProjectDetailPage.tsx ===
import { useMemo, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useProjectById } from "../hooks/useProjectById";
import { useWorkers } from "../hooks/useWorkers";
import {
  useAssignWorker,
  useUnassignWorker
} from "../hooks/useProjectAssignments";
import type { WorkerDTO } from "../types/projects";
import { isApiErrorResponse } from "../types/projects";
import { useAuth } from "@/features/auth/context/AuthContext";

export function ProjectDetailPage() {
  const { projectId = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const { data: project, isLoading, error } = useProjectById(projectId);
  const { data: workersList } = useWorkers();
  const assign = useAssignWorker();
  const unassign = useUnassignWorker();

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>("");
  const [assignErrorMsg, setAssignErrorMsg] = useState<string>("");
  const [actionMessage, setActionMessage] = useState<string>("");

  const assignedIds = useMemo(
    () => new Set((project?.workers ?? []).map((worker) => worker.id)),
    [project]
  );

  const availableWorkers: WorkerDTO[] = useMemo(() => {
    const allWorkers = workersList?.items ?? [];
    return allWorkers.filter((worker) => !assignedIds.has(worker.id));
  }, [workersList, assignedIds]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project</div>;
  if (!project) return <div>Project not found</div>;

  function goToLoginWithReturn() {
    navigate("/login", {
      state: { from: location.pathname }
    });
  }

  async function onAssign() {
    if (!project) return;

    setAssignErrorMsg("");
    setActionMessage("");

    if (!isAuthenticated) {
      setAssignErrorMsg("Debes iniciar sesión para asignar trabajadores.");
      goToLoginWithReturn();
      return;
    }

    if (!selectedWorkerId) return;

    const currentProjectId = project.id;

    try {
      await assign.mutateAsync({
        projectId: currentProjectId,
        workerId: selectedWorkerId
      });

      setIsAssignOpen(false);
      setSelectedWorkerId("");
    } catch (error: unknown) {
      if (
        isApiErrorResponse(error) &&
        error.error.code === "ASSIGNMENT_ALREADY_EXISTS"
      ) {
        setAssignErrorMsg("Este trabajador ya está asignado a este proyecto.");
        return;
      }

      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        setAssignErrorMsg("Debes iniciar sesión para asignar trabajadores.");
        goToLoginWithReturn();
        return;
      }

      setAssignErrorMsg("No se pudo asignar el trabajador.");
    }
  }

  async function onUnassign(workerId: string) {
    if (!project) return;

    setActionMessage("");

    if (!isAuthenticated) {
      setActionMessage("Debes iniciar sesión para desasignar trabajadores.");
      goToLoginWithReturn();
      return;
    }

    const currentProjectId = project.id;

    try {
      await unassign.mutateAsync({
        projectId: currentProjectId,
        workerId
      });
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        setActionMessage("Debes iniciar sesión para desasignar trabajadores.");
        goToLoginWithReturn();
        return;
      }

      setActionMessage("No se pudo desasignar el trabajador.");
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Link to="/projects">← Back</Link>
      </div>

      <h2 style={{ margin: 0 }}>{project.name}</h2>

      <p style={{ marginTop: 6 }}>
        <strong>Client:</strong> {project.clientName}
      </p>

      <p style={{ marginTop: 6 }}>
        <strong>Dates:</strong> {project.startDate}{" "}
        {project.endDate ? `→ ${project.endDate}` : ""}
      </p>

      {!isAuthenticated ? (
        <div style={{ marginTop: 12, color: "#555" }}>
          Debes iniciar sesión para gestionar asignaciones.
        </div>
      ) : null}

      {actionMessage ? (
        <div style={{ marginTop: 12, color: "crimson" }}>{actionMessage}</div>
      ) : null}

      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 12
        }}
      >
        <h3 style={{ margin: 0 }}>Assigned workers</h3>

        {isAuthenticated ? (
          <button onClick={() => setIsAssignOpen(true)}>Assign worker</button>
        ) : (
          <button onClick={goToLoginWithReturn}>Assign worker</button>
        )}
      </div>

      {!project.workers.length ? (
        <div style={{ marginTop: 12 }}>No workers assigned yet</div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {project.workers.map((worker) => (
            <div
              key={worker.id}
              style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{worker.name}</div>
                  <div style={{ fontSize: 14, opacity: 0.8 }}>
                    {worker.role} · {worker.seniority}
                  </div>
                </div>

                {isAuthenticated ? (
                  <button
                    onClick={() => onUnassign(worker.id)}
                    disabled={unassign.isPending}
                    title="Unassign"
                  >
                    {unassign.isPending ? "..." : "Unassign"}
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {isAssignOpen && isAuthenticated && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16
          }}
          onClick={() => setIsAssignOpen(false)}
        >
          <div
            style={{
              background: "white",
              width: 480,
              maxWidth: "100%",
              borderRadius: 12,
              padding: 16
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <h3 style={{ marginTop: 0 }}>Assign worker</h3>

            {!availableWorkers.length ? (
              <div style={{ marginBottom: 12 }}>
                No available workers to assign.
              </div>
            ) : (
              <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
                <label style={{ fontSize: 14 }}>Worker</label>
                <select
                  value={selectedWorkerId}
                  onChange={(event) => setSelectedWorkerId(event.target.value)}
                >
                  <option value="">Select...</option>
                  {availableWorkers.map((worker) => (
                    <option key={worker.id} value={worker.id}>
                      {worker.name} — {worker.role} ({worker.seniority})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {assignErrorMsg ? (
              <div style={{ color: "crimson", marginBottom: 12 }}>
                {assignErrorMsg}
              </div>
            ) : null}

            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <button onClick={() => setIsAssignOpen(false)}>Cancel</button>
              <button
                onClick={onAssign}
                disabled={
                  !selectedWorkerId ||
                  assign.isPending ||
                  !availableWorkers.length
                }
              >
                {assign.isPending ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

```text
=== apps/web/src/features/projects/pages/ProjectsListPage.tsx ===
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import {
  useCreateProject,
  useDeleteProject,
  useUpdateProject
} from "../hooks/useProjectMutations";
import { ProjectModal } from "../components/ProjectModal";
import { useAuth } from "@/features/auth/context/AuthContext";
import { isApiErrorResponse, type ProjectResponseDTO } from "../types/projects";
import type { ProjectFormValues } from "../schemas/projectForm.schema";

type ProjectModalState =
  | { mode: "create"; project: null }
  | { mode: "edit"; project: ProjectResponseDTO }
  | null;

export function ProjectsListPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useProjects();

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [modalState, setModalState] = useState<ProjectModalState>(null);
  const [submitError, setSubmitError] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  const projects = data?.items ?? [];

  async function handleCreate(values: ProjectFormValues) {
    setSubmitError("");

    try {
      await createProject.mutateAsync(values);
      setModalState(null);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/projects" } });
        return;
      }

      if (
        isApiErrorResponse(error) &&
        error.error.code === "PROJECT_ALREADY_EXISTS"
      ) {
        setSubmitError(
          "A project with the same name, client and date already exists."
        );
        return;
      }

      setSubmitError("Could not create project.");
    }
  }

  async function handleUpdate(values: ProjectFormValues) {
    if (!modalState || modalState.mode !== "edit") return;

    setSubmitError("");

    try {
      await updateProject.mutateAsync({
        projectId: modalState.project.id,
        data: values
      });
      setModalState(null);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/projects" } });
        return;
      }

      if (
        isApiErrorResponse(error) &&
        error.error.code === "PROJECT_ALREADY_EXISTS"
      ) {
        setSubmitError(
          "A project with the same name, client and date already exists."
        );
        return;
      }

      setSubmitError("Could not update project.");
    }
  }

  async function handleDelete(projectId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmed) return;

    try {
      await deleteProject.mutateAsync(projectId);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/projects" } });
        return;
      }

      window.alert("Could not delete project.");
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16
        }}
      >
        <h2 style={{ margin: 0 }}>Projects</h2>

        {isAuthenticated ? (
          <button
            onClick={() => setModalState({ mode: "create", project: null })}
          >
            Create project
          </button>
        ) : (
          <button
            onClick={() => navigate("/login", { state: { from: "/projects" } })}
          >
            Login to create
          </button>
        )}
      </div>

      {!projects.length ? <div>No projects yet</div> : null}

      {projects.map((project) => (
        <div
          key={project.id}
          style={{
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 12
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              gap: 12
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
              </h3>
              <p style={{ margin: "6px 0 0 0" }}>{project.clientName}</p>
              <p style={{ margin: "6px 0 0 0", fontSize: 14 }}>
                {project.startDate}{" "}
                {project.endDate ? `→ ${project.endDate}` : ""}
              </p>
            </div>

            {isAuthenticated ? (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setModalState({ mode: "edit", project })}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  disabled={deleteProject.isPending}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ))}

      <ProjectModal
        isOpen={modalState !== null}
        mode={modalState?.mode ?? "create"}
        initialValues={
          modalState?.mode === "edit"
            ? {
                name: modalState.project.name,
                clientName: modalState.project.clientName,
                startDate: modalState.project.startDate,
                endDate: modalState.project.endDate
              }
            : undefined
        }
        isSubmitting={createProject.isPending || updateProject.isPending}
        errorMessage={submitError}
        onClose={() => {
          setModalState(null);
          setSubmitError("");
        }}
        onSubmit={modalState?.mode === "edit" ? handleUpdate : handleCreate}
      />
    </div>
  );
}
```

```text
=== apps/web/src/features/projects/pages/WorkersListPage.tsx ===
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkers } from "../hooks/useWorkers";
import {
  useCreateWorker,
  useDeleteWorker,
  useUpdateWorker
} from "../hooks/useWorkerMutations";
import { WorkerModal } from "../components/WorkerModal";
import { useAuth } from "@/features/auth/context/AuthContext";
import { isApiErrorResponse, type WorkerDTO } from "../types/projects";
import type { WorkerFormValues } from "../schemas/workerForm.schema";

type WorkerModalState =
  | { mode: "create"; worker: null }
  | { mode: "edit"; worker: WorkerDTO }
  | null;

export function WorkersListPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useWorkers();

  const createWorker = useCreateWorker();
  const updateWorker = useUpdateWorker();
  const deleteWorker = useDeleteWorker();

  const [modalState, setModalState] = useState<WorkerModalState>(null);
  const [submitError, setSubmitError] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading workers</div>;

  const workers = data?.items ?? [];

  async function handleCreate(values: WorkerFormValues) {
    setSubmitError("");

    try {
      await createWorker.mutateAsync(values);
      setModalState(null);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/workers" } });
        return;
      }

      setSubmitError("Could not create worker.");
    }
  }

  async function handleUpdate(values: WorkerFormValues) {
    if (!modalState || modalState.mode !== "edit") return;

    setSubmitError("");

    try {
      await updateWorker.mutateAsync({
        workerId: modalState.worker.id,
        data: values
      });
      setModalState(null);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/workers" } });
        return;
      }

      setSubmitError("Could not update worker.");
    }
  }

  async function handleDelete(workerId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this worker?"
    );
    if (!confirmed) return;

    try {
      await deleteWorker.mutateAsync(workerId);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/workers" } });
        return;
      }

      window.alert("Could not delete worker.");
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16
        }}
      >
        <h2 style={{ margin: 0 }}>Workers</h2>

        {isAuthenticated ? (
          <button
            onClick={() => setModalState({ mode: "create", worker: null })}
          >
            Create worker
          </button>
        ) : (
          <button
            onClick={() => navigate("/login", { state: { from: "/workers" } })}
          >
            Login to create
          </button>
        )}
      </div>

      {!workers.length ? <div>No workers yet</div> : null}

      {workers.map((worker) => (
        <div
          key={worker.id}
          style={{
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 12
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              gap: 12
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>{worker.name}</h3>
              <p style={{ margin: "6px 0 0 0" }}>{worker.role}</p>
              <p style={{ margin: "6px 0 0 0", fontSize: 14 }}>
                {worker.seniority}
              </p>
            </div>

            {isAuthenticated ? (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setModalState({ mode: "edit", worker })}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(worker.id)}
                  disabled={deleteWorker.isPending}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ))}

      <WorkerModal
        isOpen={modalState !== null}
        mode={modalState?.mode ?? "create"}
        initialValues={
          modalState?.mode === "edit"
            ? {
                name: modalState.worker.name,
                role: modalState.worker.role,
                seniority: modalState.worker.seniority
              }
            : undefined
        }
        isSubmitting={createWorker.isPending || updateWorker.isPending}
        errorMessage={submitError}
        onClose={() => {
          setModalState(null);
          setSubmitError("");
        }}
        onSubmit={modalState?.mode === "edit" ? handleUpdate : handleCreate}
      />
    </div>
  );
}
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

