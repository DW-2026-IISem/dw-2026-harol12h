export interface CatalogResource {
  method: string;
  path: string;
  description: string;
  roles?: readonly string[];
}

const ADMIN = ["ADMINISTRADOR"] as const;
const STAFF = ["ADMINISTRADOR", "VENDEDOR"] as const;

export const RESOURCE_CATALOG: readonly CatalogResource[] = [
  { method: "GET", path: "/api/sesion/me", description: "Consultar perfil autenticado" },
  { method: "GET", path: "/api/sesion/permissions", description: "Consultar permisos efectivos" },
  { method: "GET", path: "/api/sesion/sessions", description: "Listar sesiones de la cuenta" },
  { method: "POST", path: "/api/sesion/sessions/revoke", description: "Revocar todas las sesiones de la cuenta" },

  { method: "GET", path: "/api/categorias", description: "Listar categorías" },
  { method: "POST", path: "/api/categorias", description: "Crear categoría", roles: STAFF },
  { method: "GET", path: "/api/categorias/:id", description: "Consultar categoría" },
  { method: "PUT", path: "/api/categorias/:id", description: "Actualizar categoría", roles: STAFF },
  { method: "DELETE", path: "/api/categorias/:id", description: "Desactivar categoría", roles: ADMIN },
  { method: "PATCH", path: "/api/categorias/:id/deactivate", description: "Desactivar categoría", roles: ADMIN },

  { method: "GET", path: "/api/colecciones", description: "Listar colecciones" },
  { method: "POST", path: "/api/colecciones", description: "Crear colección", roles: STAFF },
  { method: "GET", path: "/api/colecciones/:id", description: "Consultar colección" },
  { method: "PUT", path: "/api/colecciones/:id", description: "Actualizar colección", roles: STAFF },
  { method: "DELETE", path: "/api/colecciones/:id", description: "Desactivar colección", roles: ADMIN },
  { method: "PATCH", path: "/api/colecciones/:id/deactivate", description: "Desactivar colección", roles: ADMIN },

  { method: "GET", path: "/api/productos", description: "Listar productos" },
  { method: "POST", path: "/api/productos", description: "Crear producto", roles: STAFF },
  { method: "GET", path: "/api/productos/:id", description: "Consultar producto" },
  { method: "PUT", path: "/api/productos/:id", description: "Actualizar producto", roles: STAFF },
  { method: "DELETE", path: "/api/productos/:id", description: "Desactivar producto", roles: ADMIN },
  { method: "PATCH", path: "/api/productos/:id/deactivate", description: "Desactivar producto", roles: ADMIN },

  { method: "GET", path: "/api/variantes", description: "Listar variantes" },
  { method: "POST", path: "/api/variantes", description: "Crear variante", roles: STAFF },
  { method: "GET", path: "/api/variantes/:id", description: "Consultar variante" },
  { method: "PUT", path: "/api/variantes/:id", description: "Actualizar variante", roles: STAFF },
  { method: "DELETE", path: "/api/variantes/:id", description: "Desactivar variante", roles: ADMIN },
  { method: "PATCH", path: "/api/variantes/:id/deactivate", description: "Desactivar variante", roles: ADMIN },

  { method: "GET", path: "/api/ventas", description: "Listar ventas" },
  { method: "POST", path: "/api/ventas", description: "Crear venta", roles: STAFF },
  { method: "GET", path: "/api/ventas/:id", description: "Consultar venta" },
  { method: "PUT", path: "/api/ventas/:id", description: "Actualizar venta", roles: STAFF },
  { method: "PATCH", path: "/api/ventas/:id/deactivate", description: "Desactivar venta", roles: ADMIN },
  { method: "DELETE", path: "/api/ventas/:id", description: "Eliminar venta", roles: ADMIN },

  { method: "GET", path: "/api/detalles-venta", description: "Listar detalles de venta" },
  { method: "POST", path: "/api/detalles-venta", description: "Crear detalle de venta", roles: STAFF },
  { method: "GET", path: "/api/detalles-venta/:id", description: "Consultar detalle de venta" },
  { method: "PUT", path: "/api/detalles-venta/:id", description: "Actualizar detalle de venta", roles: STAFF },
  { method: "DELETE", path: "/api/detalles-venta/:id", description: "Eliminar detalle de venta", roles: ADMIN },

  { method: "GET", path: "/api/clientes", description: "Listar clientes" },
  { method: "POST", path: "/api/clientes", description: "Crear cliente", roles: STAFF },
  { method: "GET", path: "/api/clientes/:id", description: "Consultar cliente" },
  { method: "PUT", path: "/api/clientes/:id", description: "Actualizar cliente", roles: STAFF },
  { method: "DELETE", path: "/api/clientes/:id", description: "Desactivar cliente", roles: ADMIN },
  { method: "PATCH", path: "/api/clientes/:id/deactivate", description: "Desactivar cliente", roles: ADMIN },

  { method: "GET", path: "/api/sucursales", description: "Listar sucursales" },
  { method: "POST", path: "/api/sucursales", description: "Crear sucursal", roles: STAFF },
  { method: "GET", path: "/api/sucursales/:id", description: "Consultar sucursal" },
  { method: "PUT", path: "/api/sucursales/:id", description: "Actualizar sucursal", roles: STAFF },
  { method: "DELETE", path: "/api/sucursales/:id", description: "Desactivar sucursal", roles: ADMIN },
  { method: "PATCH", path: "/api/sucursales/:id/deactivate", description: "Desactivar sucursal", roles: ADMIN },

  { method: "GET", path: "/api/proveedores", description: "Listar proveedores" },
  { method: "POST", path: "/api/proveedores", description: "Crear proveedor", roles: STAFF },
  { method: "GET", path: "/api/proveedores/:id", description: "Consultar proveedor" },
  { method: "PUT", path: "/api/proveedores/:id", description: "Actualizar proveedor", roles: STAFF },
  { method: "DELETE", path: "/api/proveedores/:id", description: "Desactivar proveedor", roles: ADMIN },
  { method: "PATCH", path: "/api/proveedores/:id/deactivate", description: "Desactivar proveedor", roles: ADMIN },

  { method: "GET", path: "/api/inventarios", description: "Listar inventario", roles: ADMIN },
  { method: "POST", path: "/api/inventarios", description: "Crear inventario", roles: ADMIN },
  { method: "GET", path: "/api/inventarios/:id", description: "Consultar inventario", roles: ADMIN },
  { method: "PUT", path: "/api/inventarios/:id", description: "Actualizar inventario", roles: ADMIN },
  { method: "DELETE", path: "/api/inventarios/:id", description: "Desactivar inventario", roles: ADMIN },

  { method: "GET", path: "/api/usuarios", description: "Listar usuarios de negocio", roles: ADMIN },
  { method: "POST", path: "/api/usuarios", description: "Crear usuario de negocio", roles: ADMIN },
  { method: "GET", path: "/api/usuarios/:id", description: "Consultar usuario de negocio", roles: ADMIN },
  { method: "PUT", path: "/api/usuarios/:id", description: "Actualizar usuario de negocio", roles: ADMIN },
  { method: "DELETE", path: "/api/usuarios/:id", description: "Desactivar usuario de negocio", roles: ADMIN },
  { method: "PATCH", path: "/api/usuarios/:id/deactivate", description: "Desactivar usuario de negocio", roles: ADMIN },

  { method: "GET", path: "/api/admin/accounts", description: "Listar cuentas de autenticación", roles: ADMIN },
  { method: "POST", path: "/api/admin/accounts", description: "Crear cuenta de autenticación", roles: ADMIN },
  { method: "GET", path: "/api/admin/accounts/:id", description: "Consultar cuenta de autenticación", roles: ADMIN },
  { method: "PUT", path: "/api/admin/accounts/:id", description: "Actualizar cuenta de autenticación", roles: ADMIN },
  { method: "PATCH", path: "/api/admin/accounts/:id/password", description: "Cambiar contraseña de cuenta", roles: ADMIN },
  { method: "PATCH", path: "/api/admin/accounts/:id/status", description: "Activar o desactivar cuenta", roles: ADMIN },
  { method: "PATCH", path: "/api/admin/accounts/:id/status", description: "Activar o desactivar cuenta", roles: ADMIN },
  { method: "GET", path: "/api/admin/roles", description: "Listar roles", roles: ADMIN },
  { method: "POST", path: "/api/admin/roles", description: "Crear rol", roles: ADMIN },
  { method: "GET", path: "/api/admin/roles/:id", description: "Consultar rol", roles: ADMIN },
  { method: "PUT", path: "/api/admin/roles/:id", description: "Actualizar rol", roles: ADMIN },
  { method: "PUT", path: "/api/admin/roles/:id/resources", description: "Reconciliar recursos de rol", roles: ADMIN },
  { method: "PATCH", path: "/api/admin/roles/:id/status", description: "Activar o desactivar rol", roles: ADMIN },
  { method: "POST", path: "/api/admin/accounts/:id/roles", description: "Asignar rol a cuenta", roles: ADMIN },
  { method: "DELETE", path: "/api/admin/accounts/:id/roles/:roleId", description: "Retirar rol de cuenta", roles: ADMIN },
  { method: "GET", path: "/api/admin/resources", description: "Listar recursos", roles: ADMIN },
  { method: "POST", path: "/api/admin/resources", description: "Crear recurso", roles: ADMIN },
  { method: "GET", path: "/api/admin/resources/:id", description: "Consultar recurso", roles: ADMIN },
  { method: "PUT", path: "/api/admin/resources/:id", description: "Actualizar recurso", roles: ADMIN },
  { method: "PATCH", path: "/api/admin/resources/:id/status", description: "Activar o desactivar recurso", roles: ADMIN },
  { method: "GET", path: "/api/admin/role-users", description: "Listar asignaciones de roles", roles: ADMIN },
  { method: "POST", path: "/api/admin/role-users", description: "Asignar rol a cuenta", roles: ADMIN },
  { method: "GET", path: "/api/admin/resource-roles", description: "Listar concesiones de recursos", roles: ADMIN },
  { method: "POST", path: "/api/admin/resource-roles", description: "Conceder recurso a rol", roles: ADMIN },
  { method: "PATCH", path: "/api/admin/resource-roles/:id/status", description: "Activar o revocar concesión", roles: ADMIN },
  { method: "PUT", path: "/api/admin/roles/:id/resources", description: "Reconciliar recursos de rol", roles: ADMIN },
];
