# ISS-11 — Build, calidad y resolución de problemas

## Diagnóstico y cambios

- Los entornos ya tenían `requireAuth: true`, la API centralizada en `environment.apiUrl`, scripts estándar, lockfile, límites de bundle y rutas Angular con `loadComponent`.
- El entorno de desarrollo conserva `http://localhost:4000/api`. Producción usa `/api` para que la aplicación pueda comunicarse con un proxy del mismo origen sin codificar un dominio no confirmado.
- Se eliminó del mensaje de error de red una referencia fija al host local; el bundle de producción ya no contiene `localhost:4000`.
- Se retiró la clave de licencia PrimeUI del código cliente: los componentes comunitarios no la requieren y no debe publicarse un token desde el frontend. El navegador mostró el aviso de licencia no configurada; no bloquea el build ni la interfaz comunitaria.
- Se corrigieron los tests de creación de cuatro pantallas para proporcionar sus APIs y servicios de notificación simulados. Así no dependen de llamadas reales al backend ni de proveedores de PrimeNG ausentes.
- Se formatearon los archivos señalados por Prettier. No se modificaron dependencias ni contratos HTTP.

## Entornos, scripts y dependencias

| Comprobación       | Resultado                                                                      |
| ------------------ | ------------------------------------------------------------------------------ |
| Desarrollo         | `http://localhost:4000/api`; autenticación obligatoria                         |
| Producción         | `/api`; autenticación obligatoria                                              |
| Scripts            | `start`, `build`, `watch` y `test` presentes y ejecutados                      |
| Lockfile           | `package-lock.json` presente; `npm ls --package-lock-only --depth=0` coherente |
| Instalación limpia | No ejecutada; no hubo cambios de dependencias y se evitó reinstalar paquetes   |

Las URLs de API se construyen desde `environment.apiUrl`. Si producción usa un servidor API de otro origen, configura su URL real en `src/environments/environment.ts` antes del build, sin barra final.

## Build y bundles

Comando: `npm run build -- --stats-json`.

- Resultado: compilación de producción exitosa, sin advertencias de presupuesto.
- No se incluyó una clave de licencia en el bundle.
- Salida: `dist/frontend/browser`; incluye `index.html`, JavaScript, CSS, favicon y recursos de PrimeIcons.
- Estadísticas: `dist/frontend/browser-stats.json`.
- Bundle inicial: **579.45 kB** (transferencia estimada por Angular: **136.14 kB**).
- JavaScript inicial: **543.71 kB** (transferencia estimada: **129.38 kB**).
- Estilos iniciales: **35.74 kB** (transferencia estimada: **6.76 kB**).
- Chunk diferido más grande: **595.50 kB** (transferencia estimada: **92.96 kB**); chunk `shell`: **429.73 kB** (transferencia estimada: **66.20 kB**).
- Presupuestos actuales: inicial `750 kB` warning / `1 MB` error; estilo de componente `4 kB` / `8 kB`.

Las rutas cargan el shell mediante `loadComponent`, pero el shell importa estáticamente las pantallas funcionales; por eso varias comparten chunks diferidos en vez de contar con un chunk independiente por pantalla. Se conserva la carga diferida existente y el bundle queda bajo los límites; separar más las pantallas sería una optimización posterior, no un requisito para superar el build actual.

## Calidad y pruebas

- `npx prettier --check "src/**/*.{ts,html,css}"`: aprobado.
- `npm test -- --watch=false`: **12 archivos y 17 pruebas aprobadas**.
- `npm run start -- --host 0.0.0.0 --port 4301`: arrancó correctamente.
- `npm run watch`: compilación de desarrollo inicial completada; se detuvo el proceso de vigilancia después de verificarlo.
- Las rutas de sesión verificadas en código coinciden con el backend: `/api/sesion/login`, `/refresh`, `/logout`, `/me` y `/permissions`. El refresh se coordina en el interceptor para compartir solicitudes concurrentes.
- Inventario revisado en código: los registros usan variante y sucursal; el formulario requiere ambas y evita duplicar la combinación. No se atribuye al backend ningún descuento automático de stock.
- El login presenta etiquetas accesibles para usuario y contraseña. No se ejecutó una auditoría de accesibilidad completa.

## Checklist funcional de humo

| Prueba                                      | Resultado esperado                                | Resultado observado / evidencia                                                    | Estado                         |
| ------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------ |
| Acceso a `/dashboard` sin sesión            | Redirigir al login                                | Navegador llegó a `/login?returnUrl=%2Fdashboard`                                  | Aprobado                       |
| Disponibilidad del backend                  | API responde                                      | `GET /api/sesion/me` devolvió `401` sin token; el servidor está activo y protegido | Aprobado (solo disponibilidad) |
| Login, perfil y permisos                    | Guardar tokens y cargar perfil/permisos           | Requiere credenciales autorizadas                                                  | Pendiente de comprobación      |
| Persistencia, refresh y logout              | Mantener o limpiar la sesión según corresponda    | No se pudo ejecutar el flujo autenticado                                           | Pendiente de comprobación      |
| Clientes, productos, variantes y sucursales | Listar y realizar las operaciones implementadas   | Requiere sesión autenticada; no se ejecutaron mutaciones                           | Pendiente de comprobación      |
| Inventario por variante y sucursal          | Consultar/editar la combinación correcta          | Relación confirmada en código; operaciones reales no ejecutadas                    | Pendiente de comprobación      |
| Ventas, detalle y dashboard                 | Consultar los datos autorizados                   | El dashboard tiene una prueba unitaria aprobada; recorrido real requiere sesión    | Pendiente de comprobación      |
| Administración RBAC                         | Aplicar roles, recursos y restricciones efectivos | Contratos y guards revisados; no había sesión administradora                       | Pendiente de comprobación      |
| Cuenta VENDEDOR y rutas directas            | Permitir solo capacidades asignadas               | Requiere cuenta de operación real                                                  | Pendiente de comprobación      |
| Uso móvil y teclado                         | Interfaz adaptable y operable                     | No se realizó una prueba completa en dispositivos ni auditoría automatizada        | Pendiente de comprobación      |

## Publicación

El build final debe servirse desde `dist/frontend/browser`. El servidor estático debe devolver `index.html` para rutas Angular desconocidas; en Nginx, el fallback equivalente es:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

En el despliegue, configura `/api` para reenviar las solicitudes al backend Express real. Si el API se publica en otro origen, actualiza `apiUrl` antes de compilar y configura CORS en el backend para permitir el origen publicado. El backend actual usa `cors()` sin restricción explícita; debe limitarse al origen autorizado al publicar. No se hizo despliegue ni se inventó un dominio o credencial.

## Pendientes externos

- Completar login, refresh, logout, operaciones de negocio y autorización RBAC con cuentas válidas.
- Confirmar el origen final del frontend/API, configurar el proxy o `apiUrl` de producción y restringir CORS en el backend.
- Ejecutar la validación final de interfaz y accesibilidad en los dispositivos objetivo.
