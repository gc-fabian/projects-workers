# 07 Backend Shared Context

- Group file: `07_backend_shared_context.md`
- Files included: **13**
- Mode: `summary-only`

## apps/api/src/app/app.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 70

### Imports relevantes

- import Fastify from "fastify";
- import cors from "@fastify/cors";
- import helmet from "@fastify/helmet";
- import sensible from "@fastify/sensible";
- import { projectsRoutes } from "../modules/projects/projects.routes";
- import { randomUUID } from "node:crypto";
- import { registerErrorHandler } from "./middlewares/errorHandler.js";
- import { registerNotFoundHandler } from "./middlewares/notFound.js";
- import { healthRoutes } from "./routes/health.routes.js";
- import { authRoutes } from "../modules/auth/auth.routes.js";
- import { workersRoutes } from "../modules/workers/workers.routes.js";

### Exports

- export async function buildApp() {

### Funciones/líneas clave

- export async function buildApp() {
- const app = Fastify({
- const incoming = req.headers["x-request-id"];
- async (v1) => {

## apps/api/src/app/middlewares/errorHandler.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 50

### Imports relevantes

- import type { FastifyError, FastifyInstance } from "fastify";
- import { AppError } from "../../shared/errors/AppError.js";
- import type { ErrorResponseDTO } from "../../shared/http/types.js";

### Exports

- export function registerErrorHandler(app: FastifyInstance) {

### Funciones/líneas clave

- export function registerErrorHandler(app: FastifyInstance) {
- const requestId = String(req.id);
- const fastifyErr = err as ErrorWithStatusCode;
- const payload: ErrorResponseDTO = {

### Tipos/interfaces

- type ErrorWithStatusCode = Error & {

## apps/api/src/app/middlewares/notFound.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 16

### Imports relevantes

- import type { FastifyInstance } from "fastify";
- import type { ErrorResponseDTO } from "../../shared/http/types.js";

### Exports

- export function registerNotFoundHandler(app: FastifyInstance) {

### Funciones/líneas clave

- export function registerNotFoundHandler(app: FastifyInstance) {
- const payload: ErrorResponseDTO = {

## apps/api/src/app/middlewares/requestId.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 27

### Imports relevantes

- import type { FastifyPluginAsync } from "fastify";
- import { randomUUID } from "node:crypto";

### Exports

- export const requestIdPlugin: FastifyPluginAsync = async (app) => {

### Funciones/líneas clave

- const incoming = req.headers["x-request-id"];
- const requestId =

### Tipos/interfaces

- interface FastifyRequest {

### Constantes

- export const requestIdPlugin: FastifyPluginAsync = async (app) => {

## apps/api/src/app/routes/health.routes.ts

- Tipo inferido: routes
- Líneas totales aprox.: 10

### Imports relevantes

- import type { FastifyPluginAsync } from "fastify";

### Exports

- export const healthRoutes: FastifyPluginAsync = async (app) => {

### Rutas detectadas

- app.get("/health", async (req, reply) => {

### Constantes

- export const healthRoutes: FastifyPluginAsync = async (app) => {

## apps/api/src/app/server.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 16

### Imports relevantes

- import "dotenv/config";
- import { buildApp } from "./app.js";

### Funciones/líneas clave

- const PORT = Number(process.env.PORT ?? 3000);
- const HOST = process.env.HOST ?? "0.0.0.0";
- const app = await buildApp();

## apps/api/src/shared/db/prisma.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 4

### Imports relevantes

- import { PrismaClient } from "@prisma/client";

### Exports

- export const prisma = new PrismaClient();

### Constantes

- export const prisma = new PrismaClient();

## apps/api/src/shared/errors/AppError.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 59

### Imports relevantes

- import type { ErrorDetailDTO } from "../http/types";
- import type { ErrorCode } from "./errorCodes";

### Exports

- export class AppError extends Error {
- export class ValidationError extends AppError {
- export class UnauthorizedError extends AppError {
- export class InvalidCredentialsError extends AppError {
- export class NotFoundError extends AppError {
- export class InternalError extends AppError {
- export class ConflictError extends AppError {

## apps/api/src/shared/errors/HttpErrors.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 38

### Imports relevantes

- import { AppError } from "./AppError.js";
- import type { ErrorDetailDTO } from "../http/types.js";

### Exports

- export class ValidationError extends AppError {
- export class UnauthorizedError extends AppError {
- export class NotFoundError extends AppError {
- export class BadRequestError extends Error {
- export class ConflictError extends Error {

## apps/api/src/shared/errors/errorCodes.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 12

### Exports

- export const ErrorCode = {
- export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

### Constantes

- export const ErrorCode = {
- VALIDATION_ERROR: "VALIDATION_ERROR",
- UNAUTHORIZED: "UNAUTHORIZED",
- INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
- NOT_FOUND: "NOT_FOUND",
- CONFLICT: "CONFLICT",
- INTERNAL_ERROR: "INTERNAL_ERROR",
- ASSIGNMENT_ALREADY_EXISTS: "ASSIGNMENT_ALREADY_EXISTS",
- PROJECT_ALREADY_EXISTS: "PROJECT_ALREADY_EXISTS"

## apps/api/src/shared/http/types.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 13

### Exports

- export type ErrorDetailDTO = {
- export type ErrorResponseDTO = {

## apps/api/src/shared/middlewares/auth.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 14

### Imports relevantes

- import type { FastifyReply, FastifyRequest } from "fastify";
- import { UnauthorizedError } from "../errors/AppError.js";
- import { isValidAccessToken } from "../../modules/auth/auth.service.js";

### Exports

- export async function requireAuth(req: FastifyRequest, _reply: FastifyReply) {

### Funciones/líneas clave

- export async function requireAuth(req: FastifyRequest, _reply: FastifyReply) {
- const authHeader = req.headers.authorization ?? "";
- const token = authHeader.startsWith("Bearer ")

## apps/api/src/shared/validation/zod.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 17

### Imports relevantes

- import type { ZodError, ZodSchema } from "zod";
- import { ValidationError } from "../errors/AppError";

### Exports

- export function parseOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {

### Funciones/líneas clave

- function zodToDetails(err: ZodError) {
- export function parseOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
- const result = schema.safeParse(data);

