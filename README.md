
# Projects Workers Monorepo

Fullstack technical project implementing **Workers CRUD** and **Projects CRUD** using a **contract‑first approach** with **TypeScript**.

The repository is structured as a monorepo containing a backend API and a frontend web application.

---

# Architecture

Monorepo structure:

```
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

---

# API Base URL

```
http://localhost:3000/api/v1
```

---

# Features Implemented

## Base Infrastructure

- Request ID middleware
- Global error handler
- Standard error format
- Health endpoint
- Auth middleware (dev token)

Endpoint:

```
GET /api/v1/health
```

Response:

```
{
  "status": "ok",
  "requestId": "..."
}
```

---

# Authentication

Temporary development login.

```
POST /api/v1/auth/login
```

Request:

```
{
  "username": "admin",
  "password": "admin123"
}
```

Response:

```
{
  "accessToken": "dev-token",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

Use token in requests:

```
Authorization: Bearer dev-token
```

---

# Workers CRUD

Model:

```
Worker
- id (UUID)
- name
- role
- seniority (enum)
```

Endpoints:

```
POST   /workers
GET    /workers
GET    /workers/:workerId
PATCH  /workers/:workerId
DELETE /workers/:workerId
```

Example create:

```
POST /workers
{
  "name": "John",
  "role": "Backend Developer",
  "seniority": "junior"
}
```

---

# Projects CRUD

Model:

```
Project
- id (UUID)
- name
- clientName
- startDate (YYYY-MM-DD)
- endDate (optional)
```

Validation rules:

- startDate format must be `YYYY-MM-DD`
- if endDate exists → `endDate >= startDate`

Endpoints:

```
POST   /projects
GET    /projects
GET    /projects/:projectId
PATCH  /projects/:projectId
DELETE /projects/:projectId
```

Unique constraint:

```
(name, clientName, startDate)
```

Duplicate creation returns:

```
409 PROJECT_ALREADY_EXISTS
```

---

# Error Format

All errors follow the same contract.

```
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation error",
    "details": [],
    "requestId": "..."
  }
}
```

---

# Running the Project

Install dependencies:

```
npm install
```

Start API:

```
npm run api:dev
```

Run migrations:

```
npm run api:prisma:migrate:reset
```

---

# Quick API Test

Health:

```
curl http://localhost:3000/api/v1/health
```

Login:

```
curl -X POST http://localhost:3000/api/v1/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}'
```

Create Worker:

```
curl -X POST http://localhost:3000/api/v1/workers -H "Authorization: Bearer dev-token" -H "Content-Type: application/json" -d '{"name":"W1","role":"Dev","seniority":"junior"}'
```

Create Project:

```
curl -X POST http://localhost:3000/api/v1/projects -H "Authorization: Bearer dev-token" -H "Content-Type: application/json" -d '{"name":"P1","clientName":"C1","startDate":"2026-03-01"}'
```

---

# Next Steps

Upcoming slice:

**Project ↔ Worker Assignments**

Endpoints to implement:

```
POST   /projects/:projectId/workers
DELETE /projects/:projectId/workers/:workerId
```

This will allow assigning workers to projects.

---

# Author

Technical implementation created for a fullstack TypeScript coding challenge.
