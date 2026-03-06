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
