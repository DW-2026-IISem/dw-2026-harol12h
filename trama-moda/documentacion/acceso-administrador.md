# Crear o recuperar acceso de administrador

El arranque de la aplicación sincroniza las tablas sin borrar los datos existentes. Para crear un administrador nuevo (o actualizar uno con el mismo nombre), agrega estas variables a `.env`:

```env
ADMIN_USERNAME=mi_usuario
ADMIN_EMAIL=mi_correo@example.com
ADMIN_PASSWORD=UnaClaveSeguraDeAlMenos12Caracteres
```

El nombre de usuario debe tener entre 3 y 80 caracteres y la contraseña al menos 12. No compartas estos valores ni los subas al repositorio. Luego ejecuta desde la carpeta del proyecto:

```bash
npm run init-admin
```

El comando crea o activa ese usuario, le asigna el rol `ADMINISTRADOR`, crea/reactiva el rol `VENDEDOR` y configura los permisos de administración. La contraseña se guarda con hash. Si el usuario ya existía, también actualiza su correo y contraseña. No elimina otros usuarios administradores.

El inicio de sesión actual está en `POST /api/sesion/login` y recibe `username` y `password`. Envía el token de la respuesta como `Authorization: Bearer <accessToken>` al consultar `GET /api/sesion/me`.

## Matriz de permisos de la API

Todas las operaciones de negocio requieren un usuario autenticado. Las rutas comprueban las asignaciones activas a los roles `ADMINISTRADOR` y `VENDEDOR` en la base de datos:

| Módulos | GET | POST / PUT | DELETE / desactivación |
| --- | --- | --- | --- |
| Categorías, colecciones, productos, variantes, ventas, detalles de venta, clientes, sucursales y proveedores | Cualquier rol activo | ADMINISTRADOR o VENDEDOR | Solo ADMINISTRADOR |
| Inventario | Solo ADMINISTRADOR | Solo ADMINISTRADOR | Solo ADMINISTRADOR |
| Usuarios | Solo ADMINISTRADOR | Solo ADMINISTRADOR | Solo ADMINISTRADOR |

En este proyecto la eliminación lógica usa `PATCH /:id/deactivate` o `DELETE /:id`; ambas opciones quedan protegidas como eliminación. El CRUD `/api/usuarios` es para usuarios de negocio. Las cuentas de autenticación y sus roles se administran por separado en `/api/admin`.

## Crear y asignar cuentas con Thunder Client

Todas las rutas siguientes requieren `Authorization: Bearer <token-admin>`:

1. Lista los roles activos con `GET http://localhost:4000/api/admin/roles`.
2. Crea una cuenta y asígnale un rol en la misma petición:

   ```http
   POST http://localhost:4000/api/admin/accounts
   Content-Type: application/json
   ```

   ```json
   {
     "username": "vendedor1",
     "email": "vendedor1@example.com",
     "password": "ClaveSeguraDeMasDe12",
     "role": "VENDEDOR"
   }
   ```

3. Para un nuevo tipo de rol, crea primero `POST /api/admin/roles` con `{"name":"CAJERO","description":"Personal de caja"}`. Luego usa el id devuelto en `POST /api/admin/accounts` o asigna el rol a una cuenta existente con `POST /api/admin/accounts/:id/roles` y `{"roleId":3}`.
4. Inicia sesión como esa cuenta en `POST /api/sesion/login`, con `username` y `password`, para obtener su token.
5. Con un token `VENDEDOR`, verifica que un GET de negocio y un POST/PUT autorizado funcionen, que una desactivación devuelva `403`, y que inventario/usuarios también devuelvan `403`. Un token de cualquier otro rol activo puede consultar GET de negocio, pero las escrituras restringidas deben devolver `403`.
6. Retira un rol con `DELETE /api/admin/accounts/:id/roles/:roleId`. No se permite quitar el último rol de administrador activo. Para desactivar/reactivar una cuenta usa `PATCH /api/admin/accounts/:id/status` con `{"status":"inactive"}` o `{"status":"active"}`; no se puede desactivar la propia cuenta admin. Un rol personalizado se puede desactivar con `PATCH /api/admin/roles/:id/status`, pero primero hay que retirarlo de las cuentas.

El catálogo de recursos queda alineado a los endpoints reales y sus métodos en la carga inicial. La API aplica la matriz acordada con roles activos; crear un rol personalizado no le da permisos de escritura automáticamente.

> **Importante:** `npm run seed` recrea las tablas para cargar datos de ejemplo. No lo ejecutes en una base de datos que quieras conservar.
