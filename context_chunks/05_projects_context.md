# 05 Projects Context

- Group file: `05_projects_context.md`
- Files included: **22**
- Mode: `summary-only`

## apps/api/src/modules/projects/projects.controller.ts

- Tipo inferido: controller
- Líneas totales aprox.: 52

### Imports relevantes

- import { FastifyReply, FastifyRequest } from "fastify";
- import { projectsService } from "./projects.service.js";
- import { parseOrThrow } from "../../shared/validation/zod";
- import {
- import { mapProjectToDTO } from "./projects.mappers";

### Exports

- export const projectsController = {

### Funciones/líneas clave

- async create(req: FastifyRequest, reply: FastifyReply) {
- const body = parseOrThrow(createProjectSchema, req.body);
- const project = await projectsService.create(body);
- const dto = mapProjectToDTO(project);
- async list(_: FastifyRequest, reply: FastifyReply) {
- const projects = await projectsService.list();
- async getById(req: FastifyRequest, reply: FastifyReply) {
- const { projectId } = parseOrThrow(projectIdParamsSchema, req.params);
- const project = await projectsService.getById(projectId);
- async update(req: FastifyRequest, reply: FastifyReply) {
- const { projectId } = parseOrThrow(projectIdParamsSchema, req.params);
- const body = parseOrThrow(updateProjectSchema, req.body);
- const project = await projectsService.update(projectId, body);
- async remove(req: FastifyRequest, reply: FastifyReply) {
- const { projectId } = parseOrThrow(projectIdParamsSchema, req.params);

### Constantes

- export const projectsController = {

## apps/api/src/modules/projects/projects.dtos.ts

- Tipo inferido: dto/types
- Líneas totales aprox.: 33

### Exports

- export interface ProjectCreateDTO {
- export interface ProjectUpdateDTO {
- export interface ProjectListResponseDTO {
- export type WorkerInProjectDTO = {
- export type ProjectResponseDTO = {

## apps/api/src/modules/projects/projects.mappers.ts

- Tipo inferido: mapper
- Líneas totales aprox.: 22

### Imports relevantes

- import type { Prisma } from "@prisma/client";
- import { toDtoSeniority } from "../workers/workers.mappers.js";

### Exports

- export type ProjectWithWorkers = Prisma.ProjectGetPayload<{
- export const mapProjectToDTO = (project: ProjectWithWorkers) => ({

### Constantes

- export const mapProjectToDTO = (project: ProjectWithWorkers) => ({

## apps/api/src/modules/projects/projects.repository.ts

- Tipo inferido: repository
- Líneas totales aprox.: 28

### Imports relevantes

- import { prisma } from "../../shared/db/prisma";
- import type { Prisma } from "@prisma/client";

### Exports

- export const projectsRepository = {

### Funciones/líneas clave

- const withWorkers = {

### Rutas detectadas

- delete: (id: string) => prisma.project.delete({ where: { id } })

### Constantes

- export const projectsRepository = {

## apps/api/src/modules/projects/projects.routes.ts

- Tipo inferido: routes
- Líneas totales aprox.: 37

### Imports relevantes

- import { FastifyInstance } from "fastify";
- import { projectsController } from "./projects.controller";
- import { requireAuth } from "../../shared/middlewares/auth";
- import { projectsWorkersController } from "./projectsWorkers.controller";

### Exports

- export async function projectsRoutes(app: FastifyInstance) {

### Funciones/líneas clave

- export async function projectsRoutes(app: FastifyInstance) {

### Rutas detectadas

- app.get("/projects", projectsController.list);
- app.get("/projects/:projectId", projectsController.getById);
- app.post(
- app.patch(
- app.delete(
- app.post(
- app.delete(

## apps/api/src/modules/projects/projects.schemas.ts

- Tipo inferido: schema
- Líneas totales aprox.: 33

### Imports relevantes

- import { z } from "zod";

### Exports

- export const createProjectSchema = withEndDateRule(baseProjectSchema);
- export const updateProjectSchema = withEndDateRule(baseProjectSchema.partial());
- export const projectIdParamsSchema = z.object({

### Funciones/líneas clave

- const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
- const baseProjectSchema = z.object({
- const withEndDateRule = <T extends z.ZodType<ProjectDates>>(schema: T) =>

### Tipos/interfaces

- type ProjectDates = {

### Constantes

- export const createProjectSchema = withEndDateRule(baseProjectSchema);
- export const updateProjectSchema = withEndDateRule(baseProjectSchema.partial());
- export const projectIdParamsSchema = z.object({

## apps/api/src/modules/projects/projects.service.ts

- Tipo inferido: service
- Líneas totales aprox.: 115

### Imports relevantes

- import type { ProjectCreateDTO, ProjectUpdateDTO } from "./projects.dtos";
- import { projectsRepository } from "./projects.repository";
- import {

### Exports

- export const projectsService = {

### Funciones/líneas clave

- function normalizeDate(date: string): Date {
- const d = new Date(`${date}T00:00:00.000Z`);
- function assertEndAfterStart(start: Date, end: Date | null) {
- function prismaUniqueToConflict(e: unknown): never {
- const anyErr = e as {
- async create(data: ProjectCreateDTO) {
- const startDate = normalizeDate(data.startDate);
- const endDate = data.endDate ? normalizeDate(data.endDate) : null;
- async list() {
- async getById(id: string) {
- const project = await projectsRepository.findById(id);
- async update(id: string, data: ProjectUpdateDTO) {
- const current = await this.getById(id);
- const startDate =
- const endDate =
- async remove(id: string) {

### Rutas detectadas

- await projectsRepository.delete(id);

### Constantes

- "PROJECT_ALREADY_EXISTS",
- export const projectsService = {

## apps/web/src/features/projects/api/projectsApi.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 27

### Imports relevantes

- import { http } from "@/shared/api/http";
- import type {

### Exports

- export const projectsApi = {

### Constantes

- export const projectsApi = {

## apps/web/src/features/projects/api/workersApi.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 21

### Imports relevantes

- import { http } from "@/shared/api/http";
- import type {

### Exports

- export type WorkersListResponseDTO = {
- export const workersApi = {

### Constantes

- export const workersApi = {

## apps/web/src/features/projects/components/ProjectModal.tsx

- Tipo inferido: component
- Líneas totales aprox.: 158

### Imports relevantes

- import { useEffect } from "react";
- import { useForm } from "react-hook-form";
- import { zodResolver } from "@hookform/resolvers/zod";
- import {

### Exports

- export function ProjectModal({

### Funciones/líneas clave

- const emptyValues: ProjectFormValues = {
- export function ProjectModal({
- const {
- async function submit(values: ProjectFormValues) {

### Tipos/interfaces

- type ProjectFormValues
- type ProjectModalProps = {

## apps/web/src/features/projects/components/WorkerModal.tsx

- Tipo inferido: component
- Líneas totales aprox.: 139

### Imports relevantes

- import { useEffect } from "react";
- import { useForm } from "react-hook-form";
- import { zodResolver } from "@hookform/resolvers/zod";
- import {

### Exports

- export function WorkerModal({

### Funciones/líneas clave

- const emptyValues: WorkerFormValues = {
- export function WorkerModal({
- const {

### Tipos/interfaces

- type WorkerFormValues
- type WorkerModalProps = {

## apps/web/src/features/projects/hooks/useProjectById.ts

- Tipo inferido: hook
- Líneas totales aprox.: 14

### Imports relevantes

- import { useQuery } from "@tanstack/react-query";
- import { projectsApi } from "../api/projectsApi";
- import type { ProjectResponseDTO } from "../types/projects";

### Exports

- export function useProjectById(projectId: string) {

### Funciones/líneas clave

- export function useProjectById(projectId: string) {

## apps/web/src/features/projects/hooks/useProjectMutations.ts

- Tipo inferido: hook
- Líneas totales aprox.: 40

### Imports relevantes

- import { useMutation, useQueryClient } from "@tanstack/react-query";
- import { projectsApi } from "../api/projectsApi";
- import type { ProjectCreateDTO, ProjectUpdateDTO } from "../types/projects";

### Exports

- export function useCreateProject() {
- export function useUpdateProject() {
- export function useDeleteProject() {

### Funciones/líneas clave

- export function useCreateProject() {
- const queryClient = useQueryClient();
- export function useUpdateProject() {
- const queryClient = useQueryClient();
- export function useDeleteProject() {
- const queryClient = useQueryClient();

## apps/web/src/features/projects/hooks/useProjects.ts

- Tipo inferido: hook
- Líneas totales aprox.: 13

### Imports relevantes

- import { useQuery } from "@tanstack/react-query";
- import { projectsApi } from "../api/projectsApi";
- import type { ProjectListResponseDTO } from "../types/projects";

### Exports

- export function useProjects() {

### Funciones/líneas clave

- export function useProjects() {

## apps/web/src/features/projects/hooks/useWorkerMutations.ts

- Tipo inferido: hook
- Líneas totales aprox.: 39

### Imports relevantes

- import { useMutation, useQueryClient } from "@tanstack/react-query";
- import { workersApi } from "../api/workersApi";
- import type { WorkerCreateDTO, WorkerUpdateDTO } from "../types/projects";

### Exports

- export function useCreateWorker() {
- export function useUpdateWorker() {
- export function useDeleteWorker() {

### Funciones/líneas clave

- export function useCreateWorker() {
- const queryClient = useQueryClient();
- export function useUpdateWorker() {
- const queryClient = useQueryClient();
- export function useDeleteWorker() {
- const queryClient = useQueryClient();

## apps/web/src/features/projects/hooks/useWorkers.ts

- Tipo inferido: hook
- Líneas totales aprox.: 13

### Imports relevantes

- import { useQuery } from "@tanstack/react-query";
- import { workersApi } from "../api/workersApi";
- import type { WorkersListResponseDTO } from "../api/workersApi";

### Exports

- export function useWorkers() {

### Funciones/líneas clave

- export function useWorkers() {

## apps/web/src/features/projects/pages/ProjectDetailPage.tsx

- Tipo inferido: page
- Líneas totales aprox.: 275

### Imports relevantes

- import { useMemo, useState } from "react";
- import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
- import { useProjectById } from "../hooks/useProjectById";
- import { useWorkers } from "../hooks/useWorkers";
- import {
- import type { WorkerDTO } from "../types/projects";
- import { isApiErrorResponse } from "../types/projects";
- import { useAuth } from "@/features/auth/context/AuthContext";

### Exports

- export function ProjectDetailPage() {

### Funciones/líneas clave

- export function ProjectDetailPage() {
- const { projectId = "" } = useParams();
- const navigate = useNavigate();
- const location = useLocation();
- const { isAuthenticated } = useAuth();
- const { data: project, isLoading, error } = useProjectById(projectId);
- const { data: workersList } = useWorkers();
- const assign = useAssignWorker();
- const unassign = useUnassignWorker();
- const [isAssignOpen, setIsAssignOpen] = useState(false);
- const [selectedWorkerId, setSelectedWorkerId] = useState<string>("");
- const [assignErrorMsg, setAssignErrorMsg] = useState<string>("");
- const [actionMessage, setActionMessage] = useState<string>("");
- const assignedIds = useMemo(
- const availableWorkers: WorkerDTO[] = useMemo(() => {
- const allWorkers = workersList?.items ?? [];
- function goToLoginWithReturn() {
- async function onAssign() {

## apps/web/src/features/projects/pages/ProjectsListPage.tsx

- Tipo inferido: page
- Líneas totales aprox.: 212

### Imports relevantes

- import { useState } from "react";
- import { Link, useNavigate } from "react-router-dom";
- import { useProjects } from "../hooks/useProjects";
- import {
- import { ProjectModal } from "../components/ProjectModal";
- import { useAuth } from "@/features/auth/context/AuthContext";
- import { isApiErrorResponse, type ProjectResponseDTO } from "../types/projects";
- import type { ProjectFormValues } from "../schemas/projectForm.schema";

### Exports

- export function ProjectsListPage() {

### Funciones/líneas clave

- export function ProjectsListPage() {
- const navigate = useNavigate();
- const { isAuthenticated } = useAuth();
- const { data, isLoading, error } = useProjects();
- const createProject = useCreateProject();
- const updateProject = useUpdateProject();
- const deleteProject = useDeleteProject();
- const [modalState, setModalState] = useState<ProjectModalState>(null);
- const [submitError, setSubmitError] = useState("");
- const projects = data?.items ?? [];
- async function handleCreate(values: ProjectFormValues) {
- async function handleUpdate(values: ProjectFormValues) {
- async function handleDelete(projectId: string) {
- const confirmed = window.confirm(

### Tipos/interfaces

- type ProjectModalState =

## apps/web/src/features/projects/pages/WorkersListPage.tsx

- Tipo inferido: page
- Líneas totales aprox.: 186

### Imports relevantes

- import { useState } from "react";
- import { useNavigate } from "react-router-dom";
- import { useWorkers } from "../hooks/useWorkers";
- import {
- import { WorkerModal } from "../components/WorkerModal";
- import { useAuth } from "@/features/auth/context/AuthContext";
- import { isApiErrorResponse, type WorkerDTO } from "../types/projects";
- import type { WorkerFormValues } from "../schemas/workerForm.schema";

### Exports

- export function WorkersListPage() {

### Funciones/líneas clave

- export function WorkersListPage() {
- const navigate = useNavigate();
- const { isAuthenticated } = useAuth();
- const { data, isLoading, error } = useWorkers();
- const createWorker = useCreateWorker();
- const updateWorker = useUpdateWorker();
- const deleteWorker = useDeleteWorker();
- const [modalState, setModalState] = useState<WorkerModalState>(null);
- const [submitError, setSubmitError] = useState("");
- const workers = data?.items ?? [];
- async function handleCreate(values: WorkerFormValues) {
- async function handleUpdate(values: WorkerFormValues) {
- async function handleDelete(workerId: string) {
- const confirmed = window.confirm(

### Tipos/interfaces

- type WorkerModalState =

## apps/web/src/features/projects/schemas/projectForm.schema.ts

- Tipo inferido: schema
- Líneas totales aprox.: 33

### Imports relevantes

- import { z } from "zod";

### Exports

- export const projectFormSchema = z
- export type ProjectFormValues = {

### Funciones/líneas clave

- const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
- const normalizedEndDate = data.endDate === "" ? undefined : data.endDate;

### Constantes

- export const projectFormSchema = z

## apps/web/src/features/projects/schemas/workerForm.schema.ts

- Tipo inferido: schema
- Líneas totales aprox.: 9

### Imports relevantes

- import { z } from "zod";

### Exports

- export const workerFormSchema = z.object({
- export type WorkerFormValues = z.infer<typeof workerFormSchema>;

### Constantes

- export const workerFormSchema = z.object({

## apps/web/src/features/projects/types/projects.ts

- Tipo inferido: dto/types
- Líneas totales aprox.: 57

### Exports

- export type WorkerDTO = {
- export type WorkerCreateDTO = {
- export type WorkerUpdateDTO = Partial<WorkerCreateDTO>;
- export type ProjectResponseDTO = {
- export type ProjectListResponseDTO = {
- export type ProjectCreateDTO = {
- export type ProjectUpdateDTO = Partial<ProjectCreateDTO>;
- export type ApiErrorResponseDTO = {
- export function isApiErrorResponse(

### Funciones/líneas clave

- export function isApiErrorResponse(
- const maybeError = (error as { error?: unknown }).error;

