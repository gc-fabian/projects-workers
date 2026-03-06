# 04 Auth Context

- Group file: `04_auth_context.md`
- Files included: **8**
- Mode: `summary-only`

## apps/api/src/modules/auth/auth.controller.ts

- Tipo inferido: controller
- Líneas totales aprox.: 12

### Imports relevantes

- import type { FastifyReply, FastifyRequest } from "fastify";
- import { parseOrThrow } from "../../shared/validation/zod.js";
- import { loginBodySchema } from "./auth.schemas.js";
- import * as service from "./auth.service.js";

### Exports

- export async function login(req: FastifyRequest, reply: FastifyReply) {

### Funciones/líneas clave

- export async function login(req: FastifyRequest, reply: FastifyReply) {
- const body = parseOrThrow(loginBodySchema, (req as ReqWithBody).body);
- const result = await service.login(body);

### Tipos/interfaces

- type ReqWithBody = FastifyRequest & { body: unknown };

## apps/api/src/modules/auth/auth.routes.ts

- Tipo inferido: routes
- Líneas totales aprox.: 6

### Imports relevantes

- import type { FastifyInstance } from "fastify";
- import * as controller from "./auth.controller.js";

### Exports

- export async function authRoutes(app: FastifyInstance) {

### Funciones/líneas clave

- export async function authRoutes(app: FastifyInstance) {

### Rutas detectadas

- app.post("/auth/login", controller.login);

## apps/api/src/modules/auth/auth.schemas.ts

- Tipo inferido: schema
- Líneas totales aprox.: 8

### Imports relevantes

- import { z } from "zod";

### Exports

- export const loginBodySchema = z.object({
- export type LoginBody = z.infer<typeof loginBodySchema>;

### Constantes

- export const loginBodySchema = z.object({

## apps/api/src/modules/auth/auth.service.ts

- Tipo inferido: service
- Líneas totales aprox.: 24

### Imports relevantes

- import { InvalidCredentialsError } from "../../shared/errors/AppError.js";
- import type { LoginBody } from "./auth.schemas.js";

### Exports

- export function login(body: LoginBody) {
- export function isValidAccessToken(token: string) {

### Funciones/líneas clave

- const AUTH_USERNAME = "admin";
- const AUTH_PASSWORD = "admin123";
- const AUTH_ACCESS_TOKEN = "dev-token";
- const AUTH_TOKEN_TYPE = "Bearer" as const;
- const AUTH_EXPIRES_IN = 3600;
- export function login(body: LoginBody) {
- export function isValidAccessToken(token: string) {

## apps/web/src/features/auth/api/authApi.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 7

### Imports relevantes

- import { http } from "@/shared/api/http";
- import type { LoginRequestDTO, LoginResponseDTO } from "../types/auth";

### Exports

- export const authApi = {

### Constantes

- export const authApi = {

## apps/web/src/features/auth/context/AuthContext.tsx

- Tipo inferido: source-file
- Líneas totales aprox.: 72

### Imports relevantes

- import {
- import { authApi } from "../api/authApi";
- import type { LoginRequestDTO } from "../types/auth";
- import { setHttpAuthToken } from "@/shared/api/http";

### Exports

- export function AuthProvider({ children }: Props) {
- export function useAuth() {

### Funciones/líneas clave

- const AUTH_STORAGE_KEY = "auth.token";
- const AuthContext = createContext<AuthContextValue | undefined>(undefined);
- export function AuthProvider({ children }: Props) {
- const [token, setToken] = useState<string | null>(() => {
- const login = useCallback(async (data: LoginRequestDTO) => {
- const result = await authApi.login(data);
- const logout = useCallback(() => {
- const value = useMemo<AuthContextValue>(
- export function useAuth() {
- const context = useContext(AuthContext);

### Tipos/interfaces

- type ReactNode
- type AuthContextValue = {
- type Props = {

## apps/web/src/features/auth/pages/LoginPage.tsx

- Tipo inferido: page
- Líneas totales aprox.: 107

### Imports relevantes

- import { useState } from "react";
- import { useForm } from "react-hook-form";
- import { Navigate, useLocation, useNavigate } from "react-router-dom";
- import { z } from "zod";
- import { zodResolver } from "@hookform/resolvers/zod";
- import { useAuth } from "../context/AuthContext";
- import { isAuthErrorResponse } from "../types/auth";

### Exports

- export function LoginPage() {

### Funciones/líneas clave

- const loginSchema = z.object({
- export function LoginPage() {
- const { login, isAuthenticated } = useAuth();
- const navigate = useNavigate();
- const location = useLocation();
- const [submitError, setSubmitError] = useState("");
- const from =
- const {
- async function onSubmit(values: LoginFormValues) {

### Tipos/interfaces

- type LoginFormValues = z.infer<typeof loginSchema>;
- type LoginLocationState = {

## apps/web/src/features/auth/types/auth.ts

- Tipo inferido: dto/types
- Líneas totales aprox.: 31

### Exports

- export type LoginRequestDTO = {
- export type LoginResponseDTO = {
- export type AuthErrorResponseDTO = {
- export function isAuthErrorResponse(

### Funciones/líneas clave

- export function isAuthErrorResponse(
- const maybeError = (value as { error?: unknown }).error;

