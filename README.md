# Projects Workers Monorepo

Fullstack technical project implementing a **contract-first
architecture** using a TypeScript monorepo.

Features implemented:

-   Authentication (simple token auth)
-   Workers CRUD
-   Projects CRUD
-   Project ↔ Worker assignments
-   Auth-aware frontend UI

------------------------------------------------------------------------

# Architecture

Monorepo structure:

    apps/
     ├── api      → Fastify backend
     └── web      → React frontend

## Stack

Backend

-   Node.js
-   Fastify
-   Prisma
-   SQLite
-   Zod validation

Frontend

-   React
-   Vite
-   React Query
-   React Hook Form
-   Zod

------------------------------------------------------------------------

# Quick Start (under 5 minutes)

## 1 Install dependencies

``` bash
npm install
```

------------------------------------------------------------------------

## 2 Setup environment

Backend

``` bash
cp apps/api/.env.example apps/api/.env
```

Frontend

``` bash
cp apps/web/.env.example apps/web/.env
```

------------------------------------------------------------------------

## 3 Run migrations

``` bash
npm --prefix apps/api run prisma:migrate:dev
```

------------------------------------------------------------------------

## 4 Seed database

``` bash
npm run api:seed
```

------------------------------------------------------------------------

## 5 Run backend

``` bash
npm run api:dev
```

Backend runs at:

    http://localhost:3000

------------------------------------------------------------------------

## 6 Run frontend

``` bash
npm run web:dev
```

Frontend runs at:

    http://localhost:5173

------------------------------------------------------------------------

# Credentials

    username: admin
    password: admin123

Access token returned:

    Authorization: Bearer dev-token

------------------------------------------------------------------------

# API Endpoints

## Auth

    POST /api/v1/auth/login

------------------------------------------------------------------------

## Workers

    POST /workers
    GET /workers
    GET /workers/:workerId
    PATCH /workers/:workerId
    DELETE /workers/:workerId

------------------------------------------------------------------------

## Projects

    POST /projects
    GET /projects
    GET /projects/:projectId
    PATCH /projects/:projectId
    DELETE /projects/:projectId

------------------------------------------------------------------------

## Assignments

    POST /projects/:projectId/workers
    DELETE /projects/:projectId/workers/:workerId

------------------------------------------------------------------------

# Error Handling

Error format:

``` json
{
  "error": {
    "code": "PROJECT_ALREADY_EXISTS",
    "message": "Project already exists",
    "requestId": "..."
  }
}
```

Examples:

    409 PROJECT_ALREADY_EXISTS
    409 ASSIGNMENT_ALREADY_EXISTS
    404 NOT_FOUND
    401 UNAUTHORIZED

------------------------------------------------------------------------

# Technical Decisions

## Contract-first DTO architecture

DTOs are shared between:

-   controllers
-   services
-   frontend types

Ensuring consistency between API and UI.

------------------------------------------------------------------------

## Zod Validation

Used for:

-   request body validation
-   params validation
-   frontend forms

Ensures consistent validation logic.

------------------------------------------------------------------------

## Layered backend architecture

    routes
    controllers
    services
    repositories

Promotes separation of concerns and testability.

------------------------------------------------------------------------

## React Query

Used for:

-   data fetching
-   caching
-   automatic refetching after mutations.

------------------------------------------------------------------------

# Scripts

## Root scripts

    npm run api:dev
    npm run web:dev
    npm run build
    npm run lint
    npm run format

## API scripts

    npm run prisma:migrate:dev
    npm run prisma:studio
    npm run seed

------------------------------------------------------------------------

# Seed Data

The seed script creates:

-   2 Projects
-   4 Workers
-   2 Project ↔ Worker assignments

Run:

``` bash
npm run api:seed
```

------------------------------------------------------------------------

# Project Structure

    apps/
      api/
        prisma/
        src/
          modules/
            auth/
            workers/
            projects/
          shared/
      web/
        src/
          features/
            auth/
            projects/

------------------------------------------------------------------------

# Notes

This project intentionally keeps authentication simple (hardcoded
credentials and token) to focus on:

-   API design
-   Validation
-   Layered architecture
-   Frontend integration
