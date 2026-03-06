# Project Manifest

- Generated at: 2026-03-06T20:46:34-03:00
- Root: `.` (current directory)
- Mode: `summary-only`
- Total included files: **76**

## Rules Used

- max_depth: 8
- max_file_size_kb: 200
- ignore_dirs: ['.cache', '.git', '.next', '.turbo', '__pycache__', 'build', 'context_chunks', 'coverage', 'dist', 'node_modules', 'out', 'target', 'vendor']
- ignore_file_patterns: ['*.log', '*.lock', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'project_context.md', 'project_tree.txt', '*.png', '*.jpg', '*.jpeg', '*.gif', '*.pdf', '*.zip', '*.tar', '*.gz', '*.exe', '*.dll', '*.so', '*.bin', '*.woff', '*.woff2', '*.ttf', '*.ico', '*.mp4', '*.mp3']
- allowed_exts: ['.js', '.json', '.jsx', '.md', '.prisma', '.sql', '.ts', '.tsx', '.yaml', '.yml']
- allowed_suffixes: ['.env.example']

## Generated Groups

- `01_backend_context.md`: 5 archivos
- `02_frontend_context.md`: 10 archivos
- `03_database_context.md`: 4 archivos
- `04_auth_context.md`: 8 archivos
- `05_projects_context.md`: 22 archivos
- `06_workers_context.md`: 7 archivos
- `07_assignments_context.md`: 4 archivos
- `07_backend_shared_context.md`: 13 archivos
- `99_misc_context.md`: 3 archivos

## Included Tree

```text
.
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   │   ├── migrations/
│   │   │   │   ├── 20260228192745_init_workers/
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20260301024743_projects_crud/
│   │   │   │   │   └── migration.sql
│   │   │   │   └── 20260301205623/
│   │   │   │       └── migration.sql
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── middlewares/
│   │   │   │   │   ├── errorHandler.ts
│   │   │   │   │   ├── notFound.ts
│   │   │   │   │   └── requestId.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── health.routes.ts
│   │   │   │   ├── app.ts
│   │   │   │   └── server.ts
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── auth.controller.ts
│   │   │   │   │   ├── auth.routes.ts
│   │   │   │   │   ├── auth.schemas.ts
│   │   │   │   │   └── auth.service.ts
│   │   │   │   ├── projects/
│   │   │   │   │   ├── projects.controller.ts
│   │   │   │   │   ├── projects.dtos.ts
│   │   │   │   │   ├── projects.mappers.ts
│   │   │   │   │   ├── projects.repository.ts
│   │   │   │   │   ├── projects.routes.ts
│   │   │   │   │   ├── projects.schemas.ts
│   │   │   │   │   ├── projects.service.ts
│   │   │   │   │   ├── projectsWorkers.controller.ts
│   │   │   │   │   ├── projectsWorkers.repository.ts
│   │   │   │   │   └── projectsWorkers.service.ts
│   │   │   │   └── workers/
│   │   │   │       ├── workers.controller.ts
│   │   │   │       ├── workers.dtos.ts
│   │   │   │       ├── workers.mappers.ts
│   │   │   │       ├── workers.repository.ts
│   │   │   │       ├── workers.routes.ts
│   │   │   │       ├── workers.schemas.ts
│   │   │   │       └── workers.service.ts
│   │   │   └── shared/
│   │   │       ├── db/
│   │   │       │   └── prisma.ts
│   │   │       ├── errors/
│   │   │       │   ├── AppError.ts
│   │   │       │   ├── HttpErrors.ts
│   │   │       │   └── errorCodes.ts
│   │   │       ├── http/
│   │   │       │   └── types.ts
│   │   │       ├── middlewares/
│   │   │       │   └── auth.ts
│   │   │       └── validation/
│   │   │           └── zod.ts
│   │   ├── .env.example
│   │   ├── eslint.config.js
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   └── web/
│       ├── src/
│       │   ├── features/
│       │   │   ├── auth/
│       │   │   │   ├── api/
│       │   │   │   │   └── authApi.ts
│       │   │   │   ├── context/
│       │   │   │   │   └── AuthContext.tsx
│       │   │   │   ├── pages/
│       │   │   │   │   └── LoginPage.tsx
│       │   │   │   └── types/
│       │   │   │       └── auth.ts
│       │   │   └── projects/
│       │   │       ├── api/
│       │   │       │   ├── projectsApi.ts
│       │   │       │   └── workersApi.ts
│       │   │       ├── components/
│       │   │       │   ├── ProjectModal.tsx
│       │   │       │   └── WorkerModal.tsx
│       │   │       ├── hooks/
│       │   │       │   ├── useProjectAssignments.ts
│       │   │       │   ├── useProjectById.ts
│       │   │       │   ├── useProjectMutations.ts
│       │   │       │   ├── useProjects.ts
│       │   │       │   ├── useWorkerMutations.ts
│       │   │       │   └── useWorkers.ts
│       │   │       ├── pages/
│       │   │       │   ├── ProjectDetailPage.tsx
│       │   │       │   ├── ProjectsListPage.tsx
│       │   │       │   └── WorkersListPage.tsx
│       │   │       ├── schemas/
│       │   │       │   ├── projectForm.schema.ts
│       │   │       │   └── workerForm.schema.ts
│       │   │       └── types/
│       │   │           └── projects.ts
│       │   ├── shared/
│       │   │   └── api/
│       │   │       └── http.ts
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── vite-env.d.ts
│       ├── .env.example
│       ├── eslint.config.js
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.js
│       └── vite.config.ts
├── README.md
├── package.json
└── tsconfig.base.json
```

## Key Handoff Recommendation

Pasa primero este manifest al LLM, luego solo el chunk del dominio relevante (auth, projects, workers, database, etc.) según la etapa que estés implementando.
