# 07 Assignments Context

- Group file: `07_assignments_context.md`
- Files included: **4**
- Mode: `summary-only`

## apps/api/src/modules/projects/projectsWorkers.controller.ts

- Tipo inferido: controller
- Líneas totales aprox.: 34

### Imports relevantes

- import type { FastifyReply, FastifyRequest } from "fastify";
- import { parseOrThrow } from "../../shared/validation/zod";
- import { projectIdParamsSchema } from "./projects.schemas";
- import { z } from "zod";
- import { projectsWorkersService } from "./projectsWorkers.service";

### Exports

- export const projectsWorkersController = {

### Funciones/líneas clave

- const assignBodySchema = z.object({
- const workerIdParamsSchema = z.object({
- async assign(req: FastifyRequest, reply: FastifyReply) {
- const { projectId } = parseOrThrow(projectIdParamsSchema, req.params);
- const { workerId } = parseOrThrow(assignBodySchema, req.body);
- async unassign(req: FastifyRequest, reply: FastifyReply) {
- const { projectId, workerId } = parseOrThrow(

### Constantes

- export const projectsWorkersController = {

## apps/api/src/modules/projects/projectsWorkers.repository.ts

- Tipo inferido: repository
- Líneas totales aprox.: 38

### Imports relevantes

- import { prisma } from "../../shared/db/prisma";

### Exports

- export const projectsWorkersRepository = {

### Funciones/líneas clave

- const p = await prisma.project.findUnique({
- const w = await prisma.worker.findUnique({
- const pw = await prisma.projectWorker.findUnique({

### Rutas detectadas

- prisma.projectWorker.delete({

### Constantes

- export const projectsWorkersRepository = {

## apps/api/src/modules/projects/projectsWorkers.service.ts

- Tipo inferido: service
- Líneas totales aprox.: 44

### Imports relevantes

- import { projectsWorkersRepository } from "./projectsWorkers.repository";
- import { ConflictError, NotFoundError } from "../../shared/errors/AppError";

### Exports

- export const projectsWorkersService = {

### Funciones/líneas clave

- async assign(projectId: string, workerId: string) {
- const [projectOk, workerOk] = await Promise.all([
- const already = await projectsWorkersRepository.assignmentExists(
- async unassign(projectId: string, workerId: string) {
- const [projectOk, workerOk] = await Promise.all([
- const exists = await projectsWorkersRepository.assignmentExists(

### Constantes

- export const projectsWorkersService = {
- "ASSIGNMENT_ALREADY_EXISTS",

## apps/web/src/features/projects/hooks/useProjectAssignments.ts

- Tipo inferido: hook
- Líneas totales aprox.: 30

### Imports relevantes

- import { useMutation, useQueryClient } from "@tanstack/react-query";
- import { projectsApi } from "../api/projectsApi";

### Exports

- export function useAssignWorker() {
- export function useUnassignWorker() {

### Funciones/líneas clave

- export function useAssignWorker() {
- const qc = useQueryClient();
- export function useUnassignWorker() {
- const qc = useQueryClient();

