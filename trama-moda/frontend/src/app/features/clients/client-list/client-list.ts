
import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Message } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { Client, ClientPayload } from '../../../core/models/client.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';
import { ClientApi } from '../client-api';
import { ClientForm } from '../client-form/client-form';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
  ButtonModule,
  CardModule,
  ConfirmDialog,
  DialogModule,
  Message,
  TableModule,
  ToastModule,
  ClientForm,
  ],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList {
  private readonly clientApi = inject(ClientApi);
  private readonly notifications = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly clients = signal<Client[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly search = signal('');

  readonly dialogVisible = signal(false);
  readonly selectedClient = signal<Client | null>(null);

  readonly filteredClients = computed(() =>
    filterRows(this.clients(), this.search(), (client) => [
      client.id,
      client.tipo_documento,
      client.numero_documento,
      client.nombre,
      client.telefono,
      client.email,
      client.status,
    ]),
  );

  constructor() {
    this.loadClients();
  }

  loadClients(): void {
    this.loading.set(true);
    this.error.set('');

    this.clientApi.list().subscribe({
      next: (clients) => {
        this.clients.set(clients);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.clients.set([]);
        this.loading.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  openCreate(): void {
    this.selectedClient.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(client: Client): void {
    this.selectedClient.set(client);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    if (this.saving()) {
      return;
    }

    this.dialogVisible.set(false);
    this.selectedClient.set(null);
  }

  saveClient(payload: ClientPayload): void {
    if (this.saving()) {
      return;
    }

    this.saving.set(true);

    const client = this.selectedClient();
    const request = client
      ? this.clientApi.replace(client.id, payload)
      : this.clientApi.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);
        this.selectedClient.set(null);

        this.notifications.success(
          client ? 'Cliente actualizado' : 'Cliente creado',
          client
            ? 'Los cambios se guardaron correctamente.'
            : 'El cliente se registró correctamente.',
        );

        this.loadClients();
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.notifications.error(
          'No se pudo guardar el cliente',
          toApiMessage(error),
        );
      },
    });
  }

  deactivate(client: Client): void {
    this.confirmation.confirm({
      header: 'Desactivar cliente',
      message: `¿Deseas dar de baja al cliente ${client.nombre}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.clientApi.deactivate(client.id).subscribe({
          next: () => {
            this.notifications.success(
              'Cliente desactivado',
              'El cliente se dio de baja correctamente.',
            );
            this.loadClients();
          },
          error: (error: HttpErrorResponse) => {
            this.notifications.error(
              'No se pudo desactivar el cliente',
              toApiMessage(error),
            );
          },
        });
      },
    });
  }

  remove(client: Client): void {
    this.confirmation.confirm({
      header: 'Eliminar cliente',
      message: `¿Deseas eliminar permanentemente al cliente ${client.nombre}? Esta acción no se puede deshacer.`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar definitivamente',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.clientApi.remove(client.id).subscribe({
          next: () => {
            this.notifications.success(
              'Cliente eliminado',
              'El cliente se eliminó permanentemente.',
            );
            this.loadClients();
          },
          error: (error: HttpErrorResponse) => {
            this.notifications.error(
              'No se pudo eliminar el cliente',
              toApiMessage(error),
            );
          },
        });
      },
    });
  }
}
