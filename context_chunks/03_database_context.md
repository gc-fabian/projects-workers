# 03 Database Context

- Group file: `03_database_context.md`
- Files included: **4**
- Mode: `summary-only`

## apps/api/prisma/migrations/20260228192745_init_workers/migration.sql

- Tipo inferido: migration
- Líneas totales aprox.: 7

### Observaciones estructurales

- CREATE TABLE "Worker" (

## apps/api/prisma/migrations/20260301024743_projects_crud/migration.sql

- Tipo inferido: migration
- Líneas totales aprox.: 37

### Observaciones estructurales

- CREATE TABLE "workers" (
- CREATE TABLE "projects" (
- CREATE TABLE "project_workers" (
- CONSTRAINT "project_workers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
- CONSTRAINT "project_workers_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "workers" ("id") ON DELETE CASCADE ON UPDATE CASCADE

## apps/api/prisma/migrations/20260301205623/migration.sql

- Tipo inferido: migration
- Líneas totales aprox.: 8

### Preview

```text
/*
  Warnings:

  - A unique constraint covering the columns `[name,clientName,startDate]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "projects_name_clientName_startDate_key" ON "projects"("name", "clientName", "startDate");
```

## apps/api/prisma/schema.prisma

- Tipo inferido: prisma-schema
- Líneas totales aprox.: 49

### Observaciones estructurales

- generator client {
- datasource db {
- model Worker {
- model Project {
- model ProjectWorker {

