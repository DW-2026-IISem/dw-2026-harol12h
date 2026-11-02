export interface NavItemConfig {
  label: string;
  icon: string;
  title: string;
  route?: string;
  permission?: string;
  permissions?: string[];
}

export interface NavGroupConfig {
  label: string;
  icon: string;
  authOnly?: boolean;
  items: NavItemConfig[];
}

export const NAV_CONFIG: NavGroupConfig[] = [
  {
    label: 'General',
    icon: 'pi pi-home',
    items: [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        title: 'Inicio',
        route: '/dashboard',
        permissions: [
          'GET /api/clientes',
          'GET /api/categorias',
          'GET /api/productos',
          'GET /api/ventas',
          'GET /api/ventas/catalogo',
        ],
      },
    ],
  },
  {
    label: 'Catálogo',
    icon: 'pi pi-book',
    items: [
      {
        label: 'Categorías',
        icon: 'pi pi-tags',
        title: 'Categorías',
        route: '/categorias',
        permission: 'GET /api/categorias',
      },
      {
        label: 'Colecciones',
        icon: 'pi pi-folder',
        title: 'Colecciones',
        route: '/colecciones',
        permission: 'GET /api/colecciones',
      },
      {
        label: 'Productos',
        icon: 'pi pi-box',
        title: 'Productos',
        route: '/productos',
        permissions: ['GET /api/productos', 'GET /api/categorias'],
      },
      {
        label: 'Variantes',
        icon: 'pi pi-palette',
        title: 'Variantes',
        route: '/variantes',
        permissions: ['GET /api/variantes', 'GET /api/productos'],
      },
    ],
  },
  {
    label: 'Operaciones',
    icon: 'pi pi-shopping-cart',
    items: [
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        title: 'Clientes',
        route: '/clientes',
        permission: 'GET /api/clientes',
      },
      {
        label: 'Inventario',
        icon: 'pi pi-warehouse',
        title: 'Inventario',
        route: '/inventario',
        permissions: [
          'GET /api/inventarios',
          'GET /api/sucursales',
          'GET /api/variantes',
          'GET /api/productos',
        ],
      },
      {
        label: 'Sucursales',
        icon: 'pi pi-building',
        title: 'Sucursales',
        route: '/sucursales',
        permission: 'GET /api/sucursales',
      },
      {
        label: 'Proveedores',
        icon: 'pi pi-truck',
        title: 'Proveedores',
        route: '/proveedores',
        permission: 'GET /api/proveedores',
      },
      {
        label: 'Ventas',
        icon: 'pi pi-receipt',
        title: 'Ventas',
        route: '/ventas',
        permission: 'GET /api/ventas',
      },
      {
        label: 'Detalles de venta',
        icon: 'pi pi-list',
        title: 'Detalles de venta',
        route: '/detalle-ventas',
        permission: 'GET /api/detalle-ventas',
      },
    ],
  },
  {
    label: 'Administración',
    icon: 'pi pi-cog',
    authOnly: true,
    items: [
      {
        label: 'Usuarios',
        icon: 'pi pi-user',
        title: 'Usuarios',
        permission: 'GET /api/admin/accounts',
      },
      {
        label: 'Roles',
        icon: 'pi pi-shield',
        title: 'Roles',
        permission: 'GET /api/admin/roles',
      },
      {
        label: 'Usuarios por rol',
        icon: 'pi pi-users',
        title: 'Usuarios por rol',
        permission: 'GET /api/admin/role-users',
      },
      {
        label: 'Recursos',
        icon: 'pi pi-sitemap',
        title: 'Recursos',
        permission: 'GET /api/admin/resources',
      },
      {
        label: 'Roles por recurso',
        icon: 'pi pi-lock',
        title: 'Roles por recurso',
        permission: 'GET /api/admin/resource-roles',
      },
    ],
  },
];
