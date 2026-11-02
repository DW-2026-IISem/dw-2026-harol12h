
import { Component, computed, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { watchMediaQuery } from '../../core/utils/media-query';
import { ClientList } from '../../features/clients/client-list/client-list';
import { SaleForm } from '../../features/sales/sale-form/sale-form';
import { SaleList } from '../../features/sales/sale-list/sale-list';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { CategoryList } from '../../features/categories/category-list/category-list';
// ISS-05 — Punto 5.8: importar el listado de productos.
import { ProductList } from '../../features/products/product-list/product-list';
import { SupplierList } from '../../features/suppliers/supplier-list/supplier-list';
import { BranchList } from '../../features/branches/branch-list/branch-list';
import { Dashboard } from '../../features/dashboard/dashboard';
import { SaleDetailList } from '../../features/sale-details/sale-detail-list/sale-detail-list';
import { CollectionList } from '../../features/collections/collection-list/collection-list';
import { VariantList } from '../../features/variants/variant-list/variant-list';
import { InventoryList } from '../../features/inventory/inventory-list/inventory-list';
import { Profile } from '../../features/auth/profile/profile';
import { Auth } from '../../core/services/auth';
import { SessionStore } from '../../core/services/session-store';
import { NotificationService } from '../../core/services/notification';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    Aside,
    ButtonModule,
    CardModule,
    DrawerModule,
    ClientList,
    Footer,
    Header,
    CategoryList,
    ProductList,
    SupplierList,
    BranchList,
    SaleForm,
    SaleDetailList,
    SaleList,
    Dashboard,
    CollectionList,
    VariantList,
    InventoryList,
    Profile,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
  host: { class: 'block' },
})
export class Shell {
  private readonly router = inject(Router);
  private readonly auth = inject(Auth);
  private readonly sessionStore = inject(SessionStore);
  private readonly notifications = inject(NotificationService);
  private readonly isDesktop = watchMediaQuery('(min-width: 1024px)');

  readonly sidebarCollapsed = signal(false);
  readonly mobileOpen = signal(false);
  readonly title = signal('Inicio');
  readonly profile = this.sessionStore.profile;
  readonly initials = computed(() => {
    const username = this.profile()?.username ?? '';
    return username
      .split(/[.\s_-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toLocaleUpperCase())
      .join('');
  });

  readonly items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => this.seleccionar('Inicio'),
    },
    {
      label: 'Catálogo',
      icon: 'pi pi-book',
      items: [
        {
          label: 'Categorías',
          icon: 'pi pi-tags',
          command: () => this.seleccionar('Categorías'),
        },
        {
          label: 'Colecciones',
          icon: 'pi pi-folder',
          command: () => this.seleccionar('Colecciones'),
        },
        {
          label: 'Productos',
          icon: 'pi pi-box',
          command: () => this.seleccionar('Productos'),
        },
        {
          label: 'Variantes',
          icon: 'pi pi-palette',
          command: () => this.seleccionar('Variantes'),
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
          command: () => this.seleccionar('Clientes'),
        },
        {
          label: 'Inventario',
          icon: 'pi pi-warehouse',
          command: () => this.seleccionar('Inventario'),
        },
        {
          label: 'Sucursales',
          icon: 'pi pi-building',
          command: () => this.seleccionar('Sucursales'),
        },
        {
          label: 'Proveedores',
          icon: 'pi pi-truck',
          command: () => this.seleccionar('Proveedores'),
        },
        {
          label: 'Ventas',
          icon: 'pi pi-receipt',
          command: () => this.seleccionar('Ventas'),
        },
        {
          label: 'Detalles de venta',
          icon: 'pi pi-list',
          command: () => this.seleccionar('Detalles de venta'),
        },
      ],
    },
    {
      label: 'Administración',
      icon: 'pi pi-cog',
      items: [
        {
          label: 'Usuarios',
          icon: 'pi pi-user',
          command: () => this.seleccionar('Usuarios'),
        },
        {
          label: 'Roles',
          icon: 'pi pi-shield',
          command: () => this.seleccionar('Roles'),
        },
        {
          label: 'Usuarios por rol',
          icon: 'pi pi-users',
          command: () => this.seleccionar('Usuarios por rol'),
        },
        {
          label: 'Recursos',
          icon: 'pi pi-sitemap',
          command: () => this.seleccionar('Recursos'),
        },
        {
          label: 'Roles por recurso',
          icon: 'pi pi-lock',
          command: () => this.seleccionar('Roles por recurso'),
        },
      ],
    },
  ];

  constructor() {
    this.syncTitleFromRoute();
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.syncTitleFromRoute());
  }

  seleccionar(titulo: string): void {
    if (titulo === 'Inicio') {
      void this.router.navigateByUrl('/dashboard');
      this.mobileOpen.set(false);
      return;
    }

    if (titulo === 'Ventas') {
      void this.router.navigateByUrl('/ventas');
      this.mobileOpen.set(false);
      return;
    }

    if (titulo === 'Colecciones') {
      void this.router.navigateByUrl('/colecciones');
      this.mobileOpen.set(false);
      return;
    }

    if (titulo === 'Variantes') {
      void this.router.navigateByUrl('/variantes');
      this.mobileOpen.set(false);
      return;
    }

    if (titulo === 'Inventario') {
      void this.router.navigateByUrl('/inventario');
      this.mobileOpen.set(false);
      return;
    }

    if (titulo === 'Perfil') {
      void this.router.navigateByUrl('/perfil');
      this.mobileOpen.set(false);
      return;
    }

    if (titulo === 'Detalles de venta') {
      void this.router.navigateByUrl('/detalle-ventas');
      this.mobileOpen.set(false);
      return;
    }

    if (titulo === 'Proveedores') {
      void this.router.navigateByUrl('/proveedores');
      this.mobileOpen.set(false);
      return;
    }

    if (titulo === 'Sucursales') {
      void this.router.navigateByUrl('/sucursales');
      this.mobileOpen.set(false);
      return;
    }

    if (
      this.router.url.startsWith('/ventas') ||
      this.router.url.startsWith('/colecciones') ||
      this.router.url.startsWith('/variantes') ||
      this.router.url.startsWith('/inventario') ||
      this.router.url.startsWith('/perfil') ||
      this.router.url.startsWith('/detalle-ventas') ||
      this.router.url.startsWith('/proveedores') ||
      this.router.url.startsWith('/sucursales')
    ) {
      void this.router.navigateByUrl('/dashboard').then(() => {
        this.title.set(titulo);
      });
      this.mobileOpen.set(false);
      return;
    }

    this.title.set(titulo);
    this.mobileOpen.set(false);
  }

  private syncTitleFromRoute(): void {
    const path = this.router.url.split('?')[0].replace(/\/+$/, '') || '/';
    if (path === '/ventas/nueva') {
      this.title.set('Nueva venta');
    } else if (path === '/ventas') {
      this.title.set('Ventas');
    } else if (path === '/colecciones') {
      this.title.set('Colecciones');
    } else if (path === '/variantes') {
      this.title.set('Variantes');
    } else if (path === '/inventario') {
      this.title.set('Inventario');
    } else if (path === '/perfil') {
      this.title.set('Perfil');
    } else if (path === '/detalle-ventas') {
      this.title.set('Detalles de venta');
    } else if (path === '/proveedores') {
      this.title.set('Proveedores');
    } else if (path === '/sucursales') {
      this.title.set('Sucursales');
    } else if (path === '/dashboard') {
      this.title.set('Inicio');
    }
  }

  onMenuToggle(): void {
    if (this.isDesktop()) {
      this.sidebarCollapsed.update((collapsed) => !collapsed);
      return;
    }

    this.mobileOpen.set(true);
  }

  onLogout(): void {
    this.auth.logout().subscribe((revoked) => {
      void this.router.navigate(['/login'], {
        queryParams: revoked ? undefined : { logout: 'local' },
      });
    });
  }
}
