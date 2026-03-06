# 02 Frontend Context

- Group file: `02_frontend_context.md`
- Files included: **10**
- Mode: `summary-only`

## apps/web/.env.example

- Tipo inferido: source-file
- Líneas totales aprox.: 1

### Preview

```text
VITE_API_BASE_URL=/api/v1
```

## apps/web/eslint.config.js

- Tipo inferido: source-file
- Líneas totales aprox.: 47

### Imports relevantes

- import js from "@eslint/js";
- import globals from "globals";
- import prettier from "eslint-config-prettier";
- import prettierPlugin from "eslint-plugin-prettier";
- import tseslint from "typescript-eslint";

### Exports

- export default [

## apps/web/package.json

- Tipo inferido: config/data
- Líneas totales aprox.: 40

### Preview

```text
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
```

## apps/web/src/App.tsx

- Tipo inferido: source-file
- Líneas totales aprox.: 53

### Imports relevantes

- import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
- import { ProjectsListPage } from "./features/projects/pages/ProjectsListPage";
- import { ProjectDetailPage } from "./features/projects/pages/ProjectDetailPage";
- import { WorkersListPage } from "./features/projects/pages/WorkersListPage";
- import { LoginPage } from "./features/auth/pages/LoginPage";
- import { useAuth } from "./features/auth/context/AuthContext";

### Exports

- export function App() {

### Funciones/líneas clave

- function AppShell() {
- const { isAuthenticated, logout } = useAuth();
- export function App() {

## apps/web/src/main.tsx

- Tipo inferido: source-file
- Líneas totales aprox.: 17

### Imports relevantes

- import React from "react";
- import ReactDOM from "react-dom/client";
- import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
- import { App } from "./App";
- import { AuthProvider } from "./features/auth/context/AuthContext";

### Funciones/líneas clave

- const queryClient = new QueryClient();

## apps/web/src/shared/api/http.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 58

### Exports

- export function setHttpAuthToken(token: string | null) {
- export const http = {

### Funciones/líneas clave

- const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";
- export function setHttpAuthToken(token: string | null) {
- async function request<T>(
- const headers = new Headers(init?.headers);
- const response = await fetch(`${BASE_URL}${path}`, {
- const data = (await response.json().catch(() => null)) as T | null;

### Constantes

- export const http = {

## apps/web/src/vite-env.d.ts

- Tipo inferido: source-file
- Líneas totales aprox.: 1

### Preview

```text
/// <reference types="vite/client" />
```

## apps/web/tsconfig.json

- Tipo inferido: config/data
- Líneas totales aprox.: 13

### Preview

```text
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

## apps/web/vite.config.js

- Tipo inferido: source-file
- Líneas totales aprox.: 23

### Imports relevantes

- import { defineConfig } from "vite";
- import react from "@vitejs/plugin-react";
- import { fileURLToPath } from "node:url";
- import path from "node:path";

### Exports

- export default defineConfig({

### Funciones/líneas clave

- const __filename = fileURLToPath(import.meta.url);
- const __dirname = path.dirname(__filename);

## apps/web/vite.config.ts

- Tipo inferido: source-file
- Líneas totales aprox.: 25

### Imports relevantes

- import { defineConfig } from "vite";
- import react from "@vitejs/plugin-react";
- import { fileURLToPath } from "node:url";
- import path from "node:path";

### Exports

- export default defineConfig({

### Funciones/líneas clave

- const __filename = fileURLToPath(import.meta.url);
- const __dirname = path.dirname(__filename);

