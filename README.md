# Projects Workers Monorepo

Proyecto Fullstack desarrollado como solución a una **prueba técnica de
desarrollo Junior Fullstack con TypeScript**.

El objetivo del proyecto es implementar un sistema simple para gestionar
**proyectos y trabajadores**, permitiendo asignar trabajadores a
proyectos y visualizar la información asociada.

El enfoque principal fue priorizar:

-   claridad estructural
-   separación de responsabilidades
-   validaciones consistentes
-   facilidad de ejecución del proyecto

------------------------------------------------------------------------

# Arquitectura del Proyecto

El repositorio utiliza una estructura **monorepo** con dos aplicaciones:

    apps/
     ├── api   → Backend (Fastify + Prisma + SQLite)
     └── web   → Frontend (React + Vite + TypeScript)

## Stack Tecnológico

### Backend

-   Node.js
-   Fastify
-   Prisma ORM
-   SQLite
-   Zod (validaciones)
-   TypeScript

### Frontend

-   React
-   Vite
-   React Query
-   React Hook Form
-   Zod
-   TypeScript

------------------------------------------------------------------------

# Cómo ejecutar el proyecto

## 1. Instalar dependencias

Desde la raíz del repositorio:

``` bash
npm install
```

------------------------------------------------------------------------

## 2. Configurar variables de entorno

Backend:

``` bash
cp apps/api/.env.example apps/api/.env
```

Frontend:

``` bash
cp apps/web/.env.example apps/web/.env
```

------------------------------------------------------------------------

## 3. Ejecutar migraciones

``` bash
npm --prefix apps/api run prisma:migrate:dev
```

------------------------------------------------------------------------

## 4. Ejecutar seed de datos

``` bash
npm run api:seed
```

Esto creará:

-   2 proyectos
-   4 trabajadores
-   2 asignaciones

------------------------------------------------------------------------

## 5. Ejecutar el backend

``` bash
npm run api:dev
```

Backend disponible en:

    http://localhost:3000

------------------------------------------------------------------------

## 6. Ejecutar el frontend

``` bash
npm run web:dev
```

Frontend disponible en:

    http://localhost:5173

------------------------------------------------------------------------

# Credenciales de acceso

Para simplificar el alcance de la prueba se implementó autenticación
simple.

    username: admin
    password: admin123

Token generado:

    Authorization: Bearer dev-token

Las operaciones de escritura requieren autenticación.

------------------------------------------------------------------------

# Funcionalidades Implementadas

### Workers

-   Crear trabajador
-   Listar trabajadores
-   Obtener trabajador por id
-   Editar trabajador
-   Eliminar trabajador

### Projects

-   Crear proyecto
-   Listar proyectos
-   Obtener proyecto por id
-   Editar proyecto
-   Eliminar proyecto

### Assignments

-   Asignar trabajador a proyecto
-   Desasignar trabajador de proyecto
-   Visualizar trabajadores asociados a proyectos

### Validaciones

-   `startDate` debe tener formato `YYYY-MM-DD`
-   `endDate` debe ser mayor o igual a `startDate`
-   Restricción única en `(name, clientName, startDate)`

Errores posibles:

-   `PROJECT_ALREADY_EXISTS`
-   `ASSIGNMENT_ALREADY_EXISTS`
-   `NOT_FOUND`
-   `UNAUTHORIZED`

------------------------------------------------------------------------

# Decisiones técnicas

## ¿Por qué elegí esta estructura?

Se utilizó una arquitectura por capas en el backend:

    routes
    controllers
    services
    repositories

Esto permite:

-   separar responsabilidades
-   mantener el código fácil de entender
-   facilitar futuras extensiones

Además se utilizó **DTOs y mappers** para separar la representación
interna de los datos de la respuesta de la API.

En el frontend se utilizó una estructura por **features**, agrupando:

    features/
      auth/
      projects/

Esto facilita mantener la lógica relacionada en un mismo lugar.

------------------------------------------------------------------------

## ¿Qué prioricé?

Durante el desarrollo prioricé:

-   claridad del código
-   separación de responsabilidades
-   validaciones consistentes
-   estructura fácil de entender
-   mantener el alcance de la prueba sin sobreingeniería

La intención fue construir una solución **simple pero bien organizada**.

------------------------------------------------------------------------

## ¿Qué dejé fuera?

Para mantener el alcance razonable no se implementaron:

-   autenticación real con usuarios persistentes
-   control de permisos por roles
-   paginación avanzada
-   sistema completo de testing
-   dockerización del proyecto

Estas mejoras se describen en la sección de mejoras futuras.

------------------------------------------------------------------------

# Mejoras futuras

Si tuviera más tiempo implementaría:

### Testing

-   tests unitarios en backend (services y repositories)
-   tests de integración para endpoints
-   tests de componentes en frontend

### Mejoras de UX

-   loading states más elaborados
-   empty states informativos
-   mejores mensajes de error en la UI

### Escalabilidad

-   paginación en endpoints de listados
-   filtros y búsqueda

### Autenticación

-   autenticación real con JWT
-   usuarios persistentes en base de datos

### Infraestructura

-   dockerización del proyecto
-   configuración CI/CD

------------------------------------------------------------------------

# Explicación conceptual

## 1. ¿Cómo escalarías este sistema si tuviera 10.000 proyectos?

Para escalar el sistema consideraría varias mejoras:

Primero agregaría **paginación en los endpoints** para evitar cargar
todos los proyectos al mismo tiempo.

Luego agregaría **índices en la base de datos** para campos utilizados
en consultas frecuentes.

También migraría la base de datos de SQLite a una solución más robusta
como **PostgreSQL**, que maneja mejor la concurrencia y cargas mayores.

En el frontend se podrían implementar:

-   paginación
-   filtros
-   búsqueda

para mejorar la experiencia al manejar grandes volúmenes de datos.

------------------------------------------------------------------------

## 2. ¿Qué cambiarías si múltiples usuarios lo usaran al mismo tiempo?

Si múltiples usuarios utilizaran el sistema al mismo tiempo sería
necesario:

-   implementar **autenticación real con usuarios**
-   utilizar una base de datos preparada para concurrencia (PostgreSQL)
-   manejar correctamente condiciones de carrera en operaciones críticas
-   agregar logs y monitoreo

También sería recomendable agregar campos de auditoría como:

-   `createdBy`
-   `updatedBy`
-   `createdAt`
-   `updatedAt`

para poder rastrear cambios realizados por distintos usuarios.

------------------------------------------------------------------------

## 3. ¿Cómo agregarías permisos por rol?

Primero agregaría una entidad **User** y un sistema de roles, por
ejemplo:

-   admin
-   manager
-   viewer

Luego implementaría **middleware de autorización** en el backend que
valide los permisos antes de ejecutar ciertas acciones.

Por ejemplo:

-   solo `admin` puede eliminar proyectos
-   `manager` puede editar
-   `viewer` solo puede leer

En el frontend estos permisos también se reflejarían ocultando o
deshabilitando acciones según el rol del usuario autenticado.

------------------------------------------------------------------------

# Estructura del proyecto

    apps/
      api/
        prisma/
        src/
          modules/
            auth/
            workers/
            projects/
          shared/
      web/
        src/
          features/
            auth/
            projects/

------------------------------------------------------------------------

# Notas finales

El objetivo principal de esta implementación fue demostrar:

-   organización del código
-   claridad estructural
-   buenas prácticas básicas en TypeScript
-   capacidad de priorización

La solución intenta mantener un equilibrio entre **simplicidad y buena
estructura**, evitando sobreingeniería para un problema relativamente
pequeño.
