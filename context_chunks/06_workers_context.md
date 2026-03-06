# 06 Workers Context

- Group file: `06_workers_context.md`
- Files included: **7**
- Mode: `summary-only`

## apps/api/src/modules/workers/workers.controller.ts

- Tipo inferido: controller
- Líneas totales aprox.: 60

### Imports relevantes

- import type { FastifyReply, FastifyRequest } from "fastify";
- import { parseOrThrow } from "../../shared/validation/zod.js";
- import {
- import * as service from "./workers.service.js";
- import { toWorkerResponseDTO } from "./workers.mappers.js";

### Exports

- export async function create(req: FastifyRequest, reply: FastifyReply) {
- export async function list(_req: FastifyRequest, reply: FastifyReply) {
- export async function getById(req: FastifyRequest, reply: FastifyReply) {
- export async function update(req: FastifyRequest, reply: FastifyReply) {
- export async function remove(req: FastifyRequest, reply: FastifyReply) {

### Funciones/líneas clave

- export async function create(req: FastifyRequest, reply: FastifyReply) {
- const body = parseOrThrow(workerCreateBodySchema, (req as ReqWithBody).body);
- const worker = await service.createWorker(body);
- export async function list(_req: FastifyRequest, reply: FastifyReply) {
- const workers = await service.listWorkers();
- const items = workers.map(toWorkerResponseDTO);
- export async function getById(req: FastifyRequest, reply: FastifyReply) {
- const params = parseOrThrow(
- const worker = await service.getWorker(params.workerId);
- export async function update(req: FastifyRequest, reply: FastifyReply) {
- const params = parseOrThrow(
- const body = parseOrThrow(workerUpdateBodySchema, (req as ReqWithBody).body);
- const worker = await service.updateWorker(params.workerId, body);
- export async function remove(req: FastifyRequest, reply: FastifyReply) {
- const params = parseOrThrow(

### Tipos/interfaces

- type ReqWithBody = FastifyRequest<{ Body: unknown }>;
- type ReqWithParams = FastifyRequest<{ Params: unknown }>;

## apps/api/src/modules/workers/workers.dtos.ts

- Tipo inferido: dto/types
- Líneas totales aprox.: 18

### Exports

- export type WorkerSeniorityDTO = "junior" | "semi-senior" | "senior";
- export type WorkerCreateDTO = {
- export type WorkerUpdateDTO = Partial<WorkerCreateDTO>;
- export type WorkerResponseDTO = {
- export type WorkerListResponseDTO = { items: WorkerResponseDTO[] };

## apps/api/src/modules/workers/workers.mappers.ts

- Tipo inferido: mapper
- Líneas totales aprox.: 21

### Imports relevantes

- import type { Seniority, Worker } from "@prisma/client";
- import type { WorkerResponseDTO, WorkerSeniorityDTO } from "./workers.dtos";

### Exports

- export function toDtoSeniority(s: Seniority): WorkerSeniorityDTO {
- export function toDbSeniority(s: WorkerSeniorityDTO): Seniority {
- export function toWorkerResponseDTO(worker: Worker): WorkerResponseDTO {

### Funciones/líneas clave

- export function toDtoSeniority(s: Seniority): WorkerSeniorityDTO {
- export function toDbSeniority(s: WorkerSeniorityDTO): Seniority {
- export function toWorkerResponseDTO(worker: Worker): WorkerResponseDTO {

## apps/api/src/modules/workers/workers.repository.ts

- Tipo inferido: repository
- Líneas totales aprox.: 34

### Imports relevantes

- import type { Prisma, Worker } from "@prisma/client";
- import { prisma } from "../../shared/db/prisma";

### Exports

- export async function create(data: Prisma.WorkerCreateInput): Promise<Worker> {
- export async function list(): Promise<Worker[]> {
- export async function getById(id: string): Promise<Worker | null> {
- export async function update(
- export async function remove(id: string): Promise<boolean> {

### Funciones/líneas clave

- export async function create(data: Prisma.WorkerCreateInput): Promise<Worker> {
- export async function list(): Promise<Worker[]> {
- export async function getById(id: string): Promise<Worker | null> {
- export async function update(
- export async function remove(id: string): Promise<boolean> {

### Rutas detectadas

- await prisma.worker.delete({ where: { id } });

## apps/api/src/modules/workers/workers.routes.ts

- Tipo inferido: routes
- Líneas totales aprox.: 20

### Imports relevantes

- import type { FastifyInstance } from "fastify";
- import * as controller from "./workers.controller.js";
- import { requireAuth } from "../../shared/middlewares/auth.js";

### Exports

- export async function workersRoutes(app: FastifyInstance) {

### Funciones/líneas clave

- export async function workersRoutes(app: FastifyInstance) {

### Rutas detectadas

- app.get("/workers", controller.list);
- app.get("/workers/:workerId", controller.getById);
- app.post("/workers", { preHandler: [requireAuth] }, controller.create);
- app.patch(
- app.delete(

## apps/api/src/modules/workers/workers.schemas.ts

- Tipo inferido: schema
- Líneas totales aprox.: 19

### Imports relevantes

- import { z } from "zod";

### Exports

- export const workerIdParamsSchema = z.object({
- export const workerSenioritySchema = z.enum([
- export const workerCreateBodySchema = z.object({
- export const workerUpdateBodySchema = workerCreateBodySchema.partial();

### Constantes

- export const workerIdParamsSchema = z.object({
- export const workerSenioritySchema = z.enum([
- export const workerCreateBodySchema = z.object({
- export const workerUpdateBodySchema = workerCreateBodySchema.partial();

## apps/api/src/modules/workers/workers.service.ts

- Tipo inferido: service
- Líneas totales aprox.: 48

### Imports relevantes

- import { NotFoundError } from "../../shared/errors/AppError.js";
- import type { WorkerCreateDTO, WorkerUpdateDTO } from "./workers.dtos.js";
- import * as repo from "./workers.repository.js";
- import { toDbSeniority } from "./workers.mappers.js";

### Exports

- export async function createWorker(dto: WorkerCreateDTO) {
- export async function listWorkers() {
- export async function getWorker(workerId: string) {
- export async function updateWorker(workerId: string, dto: WorkerUpdateDTO) {
- export async function deleteWorker(workerId: string) {

### Funciones/líneas clave

- export async function createWorker(dto: WorkerCreateDTO) {
- export async function listWorkers() {
- export async function getWorker(workerId: string) {
- const w = await repo.getById(workerId);
- export async function updateWorker(workerId: string, dto: WorkerUpdateDTO) {
- const data: WorkerUpdateData = {};
- const w = await repo.update(workerId, data);
- export async function deleteWorker(workerId: string) {
- const ok = await repo.remove(workerId);

### Tipos/interfaces

- type WorkerUpdateData = {

