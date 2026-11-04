import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { authOnlyGuard } from './core/guards/auth-only-guard';
import { guestGuard } from './core/guards/guest-guard';
import { permissionGuard } from './core/guards/permission-guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login').then((module) => module.Login),
  },
  {
    path: 'perfil',
    canActivate: [authOnlyGuard, authGuard],
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('./features/auth/forbidden/forbidden').then((module) => module.Forbidden),
  },
  {
    path: 'acceso-denegado',
    pathMatch: 'full',
    redirectTo: 'forbidden',
  },
  {
    path: 'dashboard',
    canActivate: [authGuard, permissionGuard],
    data: {
      permission: [
        'GET /api/clientes',
        'GET /api/categorias',
        'GET /api/productos',
        'GET /api/ventas',
        'GET /api/ventas/catalogo',
      ],
    },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'ventas',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'GET /api/ventas' },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'ventas/nueva',
    canActivate: [authGuard, permissionGuard],
    data: {
      permission: ['POST /api/ventas', 'GET /api/ventas/catalogo', 'GET /api/clientes'],
    },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'clientes',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'GET /api/clientes' },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'categorias',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'GET /api/categorias' },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'productos',
    canActivate: [authGuard, permissionGuard],
    data: { permission: ['GET /api/productos', 'GET /api/categorias'] },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'colecciones',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'GET /api/colecciones' },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'variantes',
    canActivate: [authGuard, permissionGuard],
    data: { permission: ['GET /api/variantes', 'GET /api/productos'] },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'inventario',
    canActivate: [authGuard, permissionGuard],
    data: {
      permission: [
        'GET /api/inventarios',
        'GET /api/sucursales',
        'GET /api/variantes',
        'GET /api/productos',
      ],
    },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'detalle-ventas',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'GET /api/detalle-ventas' },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'proveedores',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'GET /api/proveedores' },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'sucursales',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'GET /api/sucursales' },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'admin/usuarios',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'GET /api/admin/accounts' },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'admin/roles',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'GET /api/admin/roles' },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'admin/usuarios-roles',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'GET /api/admin/role-users' },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'admin/recursos',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'GET /api/admin/resources' },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'admin/roles-recursos',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'GET /api/admin/resource-roles' },
    loadComponent: () => import('./layout/shell/shell').then((module) => module.Shell),
  },
  {
    path: 'construir',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/construir/construir').then((module) => module.Construir),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
