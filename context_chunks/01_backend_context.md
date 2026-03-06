# 01 Backend Context

- Group file: `01_backend_context.md`
- Files included: **5**
- Mode: `summary-only`

## apps/api/.env.example

- Tipo inferido: source-file
- Líneas totales aprox.: 3

### Constantes

- PORT=3000
- HOST=0.0.0.0

## apps/api/eslint.config.js

- Tipo inferido: source-file
- Líneas totales aprox.: 37

### Imports relevantes

- import js from "@eslint/js";
- import tseslint from "typescript-eslint";
- import prettierPlugin from "eslint-plugin-prettier";
- import prettierConfig from "eslint-config-prettier";

### Exports

- export default [

## apps/api/package.json

- Tipo inferido: config/data
- Líneas totales aprox.: 41

### Preview

```text
{
  "name": "@app/api",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "dist/app/server.js",
  "scripts": {
    "dev": "tsx watch src/app/server.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/app/server.js",
    "test": "vitest run",
    "lint": "eslint .",
    "format": "prettier -w .",
    "format:check": "prettier -c .",
    "prisma:generate": "prisma generate --schema prisma/schema.prisma",
    "prisma:migrate:dev": "prisma migrate dev --schema prisma/schema.prisma",
    "prisma:migrate:reset": "prisma migrate reset --force --skip-seed --schema prisma/schema.prisma",
    "prisma:migrate:deploy": "prisma migrate deploy --schema prisma/schema.prisma",
    "prisma:studio": "prisma studio --schema prisma/schema.prisma"
  },
```

## apps/api/tsconfig.json

- Tipo inferido: config/data
- Líneas totales aprox.: 10

### Preview

```text
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "types": ["node"],
    "moduleResolution": "Bundler"
  },
  "include": ["src"]
}
```

## apps/api/vitest.config.ts

- Tipo inferido: api-client
- Líneas totales aprox.: 7

### Imports relevantes

- import { defineConfig } from "vitest/config";

### Exports

- export default defineConfig({

