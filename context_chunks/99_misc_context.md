# 99 Misc Context

- Group file: `99_misc_context.md`
- Files included: **3**
- Mode: `summary-only`

## README.md

- Tipo inferido: documentation
- Líneas totales aprox.: 528

### Preview

```text
# Projects Workers Monorepo

Fullstack technical project implementing a contract-first monorepo with:

- Authentication
- Workers CRUD
- Projects CRUD
- Project ↔ Worker assignments
- Frontend auth-aware UI for protected mutations

The repository is structured as a monorepo containing a backend API and a frontend web application.

---

# Architecture

Monorepo structure:

```text
apps/
```

## package.json

- Tipo inferido: config/data
- Líneas totales aprox.: 37

### Preview

```text
{
  "name": "projects-workers-monorepo",
  "version": "1.0.0",
  "private": true,
  "main": "index.js",
  "workspaces": ["apps/*"],
  "scripts": {
    "test": "npm run test -w apps/api && npm run test -w apps/web",
    "build": "npm run build -w apps/api && npm run build -w apps/web",
    "lint": "npm run lint -w apps/api && npm run lint -w apps/web",
    "format": "npm run format -w apps/api && npm run format -w apps/web",

    "api:dev": "npm --prefix apps/api run dev",
    "api:build": "npm --prefix apps/api run build",
    "api:lint": "npm --prefix apps/api run lint",
    "api:format": "npm --prefix apps/api run format",

    "web:dev": "npm run dev -w apps/web",
    "web:build": "npm run build -w apps/web",
    "web:lint": "npm run lint -w apps/web",
```

## tsconfig.base.json

- Tipo inferido: config/data
- Líneas totales aprox.: 11

### Preview

```text
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUncheckedIndexedAccess": true
  }
}
```

