import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(
        (module) => module.Login,
      ),
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./layout/shell/shell').then(
        (module) => module.Shell,
      ),
  },
  {
    path: 'acceso-denegado',
    loadComponent: () =>
      import('./features/auth/forbidden/forbidden').then(
        (module) => module.Forbidden,
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./layout/shell/shell').then(
        (module) => module.Shell,
      ),
  },
  {
    path: 'ventas',
    loadComponent: () =>
      import('./layout/shell/shell').then(
        (module) => module.Shell,
      ),
  },
  {
    path: 'ventas/nueva',
    loadComponent: () =>
      import('./layout/shell/shell').then(
        (module) => module.Shell,
      ),
  },
  {
    path: 'colecciones',
    loadComponent: () =>
      import('./layout/shell/shell').then(
        (module) => module.Shell,
      ),
  },
  {
    path: 'variantes',
    loadComponent: () =>
      import('./layout/shell/shell').then(
        (module) => module.Shell,
      ),
  },
  {
    path: 'inventario',
    loadComponent: () =>
      import('./layout/shell/shell').then(
        (module) => module.Shell,
      ),
  },
  {
    path: 'detalle-ventas',
    loadComponent: () =>
      import('./layout/shell/shell').then(
        (module) => module.Shell,
      ),
  },
  {
    path: 'proveedores',
    loadComponent: () =>
      import('./layout/shell/shell').then(
        (module) => module.Shell,
      ),
  },
  {
    path: 'sucursales',
    loadComponent: () =>
      import('./layout/shell/shell').then(
        (module) => module.Shell,
      ),
  },
  {
    path: 'construir',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/construir/construir').then(
        (module) => module.Construir,
      ),
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
