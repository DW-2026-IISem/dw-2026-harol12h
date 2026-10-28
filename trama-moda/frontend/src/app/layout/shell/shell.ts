import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { TableModule } from 'primeng/table';

import { watchMediaQuery } from '../../core/utils/media-query';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { ClientApi } from '../../features/clients/client-api';
import { Client } from '../../core/models/client.model';

@Component({
  selector: 'app-shell',
  imports: [Aside, ButtonModule, CardModule, DrawerModule, TableModule, Footer, Header],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
  host: { class: 'block' },
})
export class Shell {
  private readonly isDesktop = watchMediaQuery('(min-width: 1024px)');

  readonly sidebarCollapsed = signal(false);
  readonly mobileOpen = signal(false);
  readonly title = signal('Inicio');
  private readonly clientApi = inject(ClientApi);

  readonly clients = signal<Client[]>([]);
  readonly loadingClients = signal(false);
  readonly clientsError = signal('');


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

  seleccionar(titulo: string): void {
    this.title.set(titulo);
    this.mobileOpen.set(false);

    if (titulo === 'Clientes') {
      this.cargarClientes();
    }
  }

  private cargarClientes(): void {
    this.loadingClients.set(true);
    this.clientsError.set('');

    this.clientApi.list().subscribe({
      next: (clients) => {
        this.clients.set(clients);
        this.loadingClients.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.loadingClients.set(false);

        if (error.status === 401) {
          this.clientsError.set(
            'Tu sesión no está autorizada. Inicia sesión nuevamente.'
          );
        } else if (error.status === 403) {
          this.clientsError.set(
            'Tu usuario no tiene permisos para consultar los clientes.'
          );
        } else {
          this.clientsError.set(
            'No fue posible cargar los clientes. Verifica que el backend esté activo e inténtalo de nuevo.'
          );
        }
      }
    });
  }

  onMenuToggle(): void {
    if (this.isDesktop()) {
      this.sidebarCollapsed.update((collapsed) => !collapsed);
      return;
    }

    this.mobileOpen.set(true);
  }
}
