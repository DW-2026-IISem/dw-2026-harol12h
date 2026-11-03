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

import type { HttpMethod, Resource } from '../../../../core/models/resource.model';
import type { Role } from '../../../../core/models/role.model';
import { Auth } from '../../../../core/services/auth';
import { NotificationService } from '../../../../core/services/notification';
import { SessionStore } from '../../../../core/services/session-store';
import { toApiMessage } from '../../../../core/utils/api-error';
import { HasPermission } from '../../../../shared/directives/has-permission';
import { ResourceRoleApi, ResourceRoleListItem } from '../resource-role-api';
import { ResourceApi } from '../../resources/resource-api';
import { RoleApi } from '../../roles/role-api';

interface SelectOption {
  id: number;
  label: string;
}

type Severity = 'info' | 'success' | 'warn' | 'danger' | 'secondary';

@Component({
  selector: 'app-resource-role-list',
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
    SelectModule,
    TableModule,
    TagModule,
    ToastModule,
  ],
  styleUrl: './resource-role-list.css',
  templateUrl: './resource-role-list.html',
})
export class ResourceRoleList {
  private readonly resourceRoleApi = inject(ResourceRoleApi);
  private readonly roleApi = inject(RoleApi);
  private readonly resourceApi = inject(ResourceApi);
  private readonly auth = inject(Auth);
  private readonly session = inject(SessionStore);
  private readonly notifications = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly grants = signal<ResourceRoleListItem[]>([]);
  readonly roles = signal<Role[]>([]);
  readonly resources = signal<Resource[]>([]);
  readonly loading = signal(false);
  readonly rolesLoading = signal(false);
  readonly resourcesLoading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly rolesError = signal('');
  readonly resourcesError = signal('');
  readonly search = signal('');
  readonly roleFilterId = signal<number | null>(null);
  readonly dialogVisible = signal(false);
  readonly selectedRoleId = signal<number | null>(null);
  readonly selectedResourceId = signal<number | null>(null);
  readonly busyGrantId = signal<number | null>(null);

  readonly roleOptions = computed<SelectOption[]>(() =>
    this.roles().map((role) => ({ id: role.id, label: role.name })),
  );
  readonly roleFilterOptions = computed<SelectOption[]>(() => {
    const roles = new Map(this.roles().map((role) => [role.id, role.name]));
    for (const grant of this.grants()) {
      if (grant.role) {
        roles.set(grant.role.id, grant.role.name);
      }
    }
    return [...roles].map(([id, label]) => ({ id, label }));
  });
  readonly resourceOptions = computed<SelectOption[]>(() =>
    this.resources()
      .filter((resource) => resource.status === 'active')
      .map((resource) => ({
        id: resource.id,
        label: `${resource.method} ${resource.path}`,
      })),
  );
  readonly filteredGrants = computed(() => {
    const query = this.search().trim().toLocaleLowerCase();
    const roleId = this.roleFilterId();
    return this.grants().filter((grant) => {
      const method = grant.resource?.method ?? '';
      const path = grant.resource?.path ?? '';
      return (
        (roleId === null || grant.role_id === roleId) &&
        (!query ||
          method.toLocaleLowerCase().includes(query) ||
          path.toLocaleLowerCase().includes(query))
      );
    });
  });

  constructor() {
    this.loadGrants();
    if (this.session.canPermission('GET', '/api/admin/roles')) {
      this.loadRoles();
    }
    if (this.session.canPermission('GET', '/api/admin/resources')) {
      this.loadResources();
    }
  }

  loadGrants(): void {
    this.loading.set(true);
    this.error.set('');
    this.resourceRoleApi.list().subscribe({
      next: (grants) => {
        this.grants.set(grants);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.grants.set([]);
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
    this.selectedRoleId.set(null);
    this.selectedResourceId.set(null);
    this.dialogVisible.set(true);
  }

  createGrant(): void {
    const roleId = this.selectedRoleId();
    const resourceId = this.selectedResourceId();
    if (roleId === null || resourceId === null) {
      this.error.set('Selecciona un rol y un recurso activos.');
      return;
    }
    if (
      this.grants().some(
        (grant) =>
          grant.role_id === roleId && grant.resource_id === resourceId && grant.status === 'active',
      )
    ) {
      this.error.set('El rol ya tiene una concesión activa para ese recurso.');
      return;
    }

    this.saving.set(true);
    this.error.set('');
    this.resourceRoleApi.create({ role_id: roleId, resource_id: resourceId }).subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);
        this.notifications.success('Concesión creada o reactivada');
        this.loadGrants();
        this.refreshEffectivePermissions();
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  canToggleStatus(grant: ResourceRoleListItem): boolean {
    if (grant.status === 'active') {
      return true;
    }
    return grant.role?.status === 'active' && grant.resource?.status === 'active';
  }

  toggleStatus(grant: ResourceRoleListItem): void {
    if (!this.canToggleStatus(grant)) {
      return;
    }
    const status = grant.status === 'active' ? 'inactive' : 'active';
    this.confirmation.confirm({
      header: status === 'active' ? 'Activar concesión' : 'Desactivar concesión',
      message: `¿Deseas ${status === 'active' ? 'activar' : 'desactivar'} ${grant.resource?.method ?? ''} ${grant.resource?.path ?? ''} para ${grant.role?.name ?? 'este rol'}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.busyGrantId.set(grant.id);
        this.resourceRoleApi.updateStatus(grant.id, status).subscribe({
          next: () => {
            this.busyGrantId.set(null);
            this.notifications.success('Estado de concesión actualizado');
            this.loadGrants();
            this.refreshEffectivePermissions();
          },
          error: (error: HttpErrorResponse) => {
            this.busyGrantId.set(null);
            this.error.set(toApiMessage(error));
          },
        });
      },
    });
  }

  methodSeverity(method: HttpMethod | undefined): Severity {
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
      default:
        return 'secondary';
    }
  }

  private loadRoles(): void {
    this.rolesLoading.set(true);
    this.roleApi.list().subscribe({
      next: (roles) => {
        this.roles.set(roles);
        this.rolesLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.rolesLoading.set(false);
        this.rolesError.set(toApiMessage(error));
      },
    });
  }

  private loadResources(): void {
    this.resourcesLoading.set(true);
    this.resourceApi.list().subscribe({
      next: (resources) => {
        this.resources.set(resources);
        this.resourcesLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.resourcesLoading.set(false);
        this.resourcesError.set(toApiMessage(error));
      },
    });
  }

  private refreshEffectivePermissions(): void {
    this.auth.refreshPermissions().subscribe({
      error: (error: HttpErrorResponse) => {
        this.notifications.warn(
          'Concesión guardada',
          `No se pudieron actualizar los permisos de la sesión: ${toApiMessage(error)}`,
        );
      },
    });
  }
}
