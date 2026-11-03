import type { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import type { HttpMethod, Resource, ResourcePayload } from '../../../../core/models/resource.model';
import { NotificationService } from '../../../../core/services/notification';
import { toApiMessage } from '../../../../core/utils/api-error';
import { HasPermission } from '../../../../shared/directives/has-permission';
import { ResourceApi } from '../resource-api';
import { ResourceForm } from '../resource-form/resource-form';

type MethodFilter = HttpMethod | 'ALL';
type ResourceStatus = Resource['status'];
type Severity = 'info' | 'success' | 'warn' | 'danger';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    HasPermission,
    InputTextModule,
    MessageModule,
    ResourceForm,
    SelectModule,
    TableModule,
    TagModule,
    ToastModule,
  ],
  styleUrl: './resource-list.css',
  templateUrl: './resource-list.html',
})
export class ResourceList {
  private readonly resourceApi = inject(ResourceApi);
  private readonly notifications = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly resources = signal<Resource[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly search = signal('');
  readonly methodFilter = signal<MethodFilter>('ALL');
  readonly dialogVisible = signal(false);
  readonly editingResource = signal<Resource | null>(null);
  readonly busyResourceId = signal<number | null>(null);
  readonly methods: MethodFilter[] = ['ALL', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  readonly httpMethods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  readonly filteredResources = computed(() => {
    const query = this.search().trim().toLocaleLowerCase();
    const method = this.methodFilter();
    return this.resources().filter(
      (resource) =>
        (method === 'ALL' || resource.method === method) &&
        (!query ||
          resource.path.toLocaleLowerCase().includes(query) ||
          (resource.description ?? '').toLocaleLowerCase().includes(query)),
    );
  });

  readonly methodCounts = computed<Record<HttpMethod, number>>(() => ({
    GET: this.resources().filter((resource) => resource.method === 'GET').length,
    POST: this.resources().filter((resource) => resource.method === 'POST').length,
    PUT: this.resources().filter((resource) => resource.method === 'PUT').length,
    PATCH: this.resources().filter((resource) => resource.method === 'PATCH').length,
    DELETE: this.resources().filter((resource) => resource.method === 'DELETE').length,
  }));

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.resourceApi.list().subscribe({
      next: (resources) => {
        this.resources.set(resources);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.resources.set([]);
        this.loading.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  setSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.search.set(event.target.value);
    }
  }

  openCreate(): void {
    this.editingResource.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(resource: Resource): void {
    this.editingResource.set(resource);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
    this.editingResource.set(null);
  }

  saveResource(payload: ResourcePayload): void {
    this.saving.set(true);
    const resource = this.editingResource();
    const request = resource
      ? this.resourceApi.update(resource.id, payload)
      : this.resourceApi.create(payload);
    request.subscribe({
      next: (saved) => {
        this.saving.set(false);
        this.closeDialog();
        this.resources.update((items) => {
          const exists = items.some((item) => item.id === saved.id);
          return exists
            ? items.map((item) => (item.id === saved.id ? saved : item))
            : [...items, saved].sort(
                (left, right) =>
                  left.method.localeCompare(right.method) || left.path.localeCompare(right.path),
              );
        });
        this.notifications.success(resource ? 'Recurso actualizado' : 'Recurso creado');
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  methodSeverity(method: HttpMethod): Severity {
    switch (method) {
      case 'GET':
        return 'info';
      case 'POST':
        return 'success';
      case 'PUT':
      case 'PATCH':
        return 'warn';
      case 'DELETE':
        return 'danger';
    }
  }

  toggleStatus(resource: Resource): void {
    const status: ResourceStatus = resource.status === 'active' ? 'inactive' : 'active';
    this.confirmation.confirm({
      header: status === 'inactive' ? 'Desactivar recurso' : 'Activar recurso',
      message: `¿Deseas ${status === 'inactive' ? 'desactivar' : 'activar'} ${resource.method} ${resource.path}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.busyResourceId.set(resource.id);
        this.resourceApi.updateStatus(resource.id, status).subscribe({
          next: (updated) => {
            this.busyResourceId.set(null);
            this.resources.update((items) =>
              items.map((item) => (item.id === resource.id ? { ...item, ...updated } : item)),
            );
            this.notifications.success('Estado del recurso actualizado');
          },
          error: (error: HttpErrorResponse) => {
            this.busyResourceId.set(null);
            this.error.set(toApiMessage(error));
          },
        });
      },
    });
  }
}
