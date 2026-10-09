# Cierre de autenticacion y RBAC — TramaModa

Esta implementacion adapta ISS-09 a ISS-15 y el cierre de Fase II a las rutas y entidades de TramaModa. Conserva la identidad de autenticacion (`features/auth/users`) separada de los usuarios de negocio (`features/business/user`).

## Componentes

- `shared/auth`: hash y verificacion de contrasenas, JWT, normalizacion/comparacion de recursos y `Request.auth`.
- `features/auth/users`: cuentas de autenticacion y acceso al modelo Sequelize.
- `features/auth/roles`, `resources`, `role-users` y `resource-roles`: RBAC basado en concesiones activas de roles a cuentas y de recursos a roles.
- `features/auth/refresh-tokens`: refresh tokens opacos; solo se persiste SHA-256, cada refresh rota el token y la reutilizacion revoca la familia completa.
- `features/auth/session`: login, refresh, logout, perfil, permisos efectivos y sesiones.
- `middlewares/auth.middleware.ts`: `verifyToken` carga la identidad y exige una concesion RBAC para el metodo/ruta; `checkRole` conserva la matriz explicita de la aplicacion como segunda barrera en escrituras.

## Configuracion

Define en `.env`:

```env
JWT_SECRET=<secreto aleatorio de al menos 32 caracteres>
JWT_ACCESS_TTL=900
JWT_REFRESH_TTL_DAYS=30
```

El access token usa HS256, `issuer`, `audience`, `exp` y `jti`. El refresh token no es un JWT y nunca se devuelve desde consultas de sesiones. No incluyas valores reales en el repositorio.

## API de sesion

| Metodo y ruta | Proteccion | Funcion |
| --- | --- | --- |
| `POST /api/sesion/login` | Abierta | Valida credenciales y devuelve access + refresh |
| `POST /api/sesion/refresh` | Abierta | Rota refresh y emite un nuevo par de tokens |
| `POST /api/sesion/logout` | Abierta | Revoca el refresh enviado |
| `GET /api/sesion/me` | JWT | Devuelve el perfil actual |
| `GET /api/sesion/permissions` | JWT | Devuelve concesiones efectivas |
| `GET /api/sesion/sessions` | JWT | Lista sesiones sin hashes de tokens |
| `POST /api/sesion/sessions/revoke` | JWT | Revoca todas las sesiones de la cuenta |

Login, refresh y logout son abiertos intencionalmente; las operaciones de perfil requieren JWT. Las rutas de negocio y administracion requieren JWT y una concesion activa para el metodo y patron de ruta. Un token valido sin concesion responde `403`; credenciales/token ausentes, invalidos, expirados o cuenta inactiva responden `401`.

## Administracion RBAC

Las cuentas de autenticacion se administran bajo `/api/admin/accounts`; los roles bajo `/api/admin/roles`; los recursos bajo `/api/admin/resources`; las asignaciones cuenta-rol bajo `/api/admin/role-users`; y las concesiones rol-recurso bajo `/api/admin/resource-roles`. Todas esas rutas requieren el rol `ADMINISTRADOR` y la concesion registrada en el catalogo.

`PUT /api/admin/roles/:id/resources` recibe `{"resourceIds":[1,2]}` y reconcilia las concesiones: agrega/reactiva las indicadas y desactiva las omitidas. La asignacion `POST /api/admin/role-users` es idempotente y reactiva una asignacion previa. No se permite desactivar el ultimo administrador activo.

Al iniciar el servidor, el catalogo sincroniza las rutas y permisos de los roles activos con las rutas existentes. Para inicializar/recuperar el administrador en una base vacia, configura `ADMIN_USERNAME`, `ADMIN_EMAIL` y `ADMIN_PASSWORD` y ejecuta `npm run init-admin`.

## Verificacion manual

1. Ejecuta `npm run build`.
2. Configura `AUTH_TEST_USERNAME`, `AUTH_TEST_EMAIL` y `AUTH_TEST_PASSWORD`; prepara esa cuenta de prueba con `npm run seed:auth-test`.
3. Arranca con `npm run dev` y abre `src/features/auth/http/session.http`.
4. Comprueba login abierto, `/me` y `/permissions` con JWT, rotacion refresh y logout. Reutilizar el refresh anterior debe responder `401` y revocar la familia.
5. La solicitud a `GET /api/usuarios` con `AUTH_TESTER` debe responder `403`; sin Authorization, una ruta protegida debe responder `401`. Una operacion con concesion activa debe responder `200` o `201`.
6. Revisa el contrato OpenAPI en `/api-docs`.

`npm run seed` recrea las tablas del esquema de ejemplo y no se debe ejecutar contra una base de datos con datos que se quieran conservar.
