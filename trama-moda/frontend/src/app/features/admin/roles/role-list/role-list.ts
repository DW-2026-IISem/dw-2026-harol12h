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
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import type { Resource } from '../../../../core/models/resource.model';
import type { Role } from '../../../../core/models/role.model';
import { Auth } from '../../../../core/services/auth';
import { NotificationService } from '../../../../core/services/notification';
import { SessionStore } from '../../../../core/services/session-store';
import { toApiMessage } from '../../../../core/utils/api-error';
import { HasPermission } from '../../../../shared/directives/has-permission';
import { ResourceRoleApi } from '../../resource-roles/resource-role-api';
import { ResourceApi } from '../../resources/resource-api';
import { RoleUserApi } from '../../role-users/role-user-api';
import { RoleApi } from '../role-api';
import { RoleForm, RoleFormPayload } from '../role-form/role-form';

interface ResourceOption {
  id: number;
  label: string;
}

@Component({
  selector: 'app-role-list',
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
    MultiSelectModule,
    RoleForm,
    TableModule,
    TagModule,
    ToastModule,
    TooltipModule,
  ],
  styleUrl: './role-list.css',
  templateUrl: './role-list.html',
})
export class RoleList {
  private readonly roleApi = inject(RoleApi);
  private readonly roleUserApi = inject(RoleUserApi);
  private readonly resourceApi = inject(ResourceApi);
  private readonly resourceRoleApi = inject(ResourceRoleApi);
  private readonly auth = inject(Auth);
  private readonly session = inject(SessionStore);
  private readonly notifications = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly roles = signal<Role[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly search = signal('');
  readonly roleDialogVisible = signal(false);
  readonly editingRole = signal<Role | null>(null);
  readonly busyRoleId = signal<number | null>(null);
  readonly roleAssignments = signal<{ roleId: number; status: string }[]>([]);
  readonly assignmentDataLoaded = signal(false);
  readonly assignmentError = signal('');
  readonly resourcesDialogVisible = signal(false);
  readonly resourcesLoading = signal(false);
  readonly resourcesSaving = signal(false);
  readonly resourcesError = signal('');
  readonly resourcesLoaded = signal(false);
  readonly resources = signal<Resource[]>([]);
  readonly selectedRoleForResources = signal<Role | null>(null);
  readonly selectedResourceIds = signal<number[]>([]);
  readonly resourceOverlayOptions = { autoZIndex: true, baseZIndex: 200 };

  readonly filteredRoles = computed(() => {
    const query = this.search().trim().toLocaleLowerCase();
    return this.roles().filter(
      (role) =>
        !query ||
        role.name.toLocaleLowerCase().includes(query) ||
        (role.description ?? '').toLocaleLowerCase().includes(query),
    );
  });

  readonly resourceOptions = computed<ResourceOption[]>(() =>
    this.resources()
      .filter((resource) => resource.status === 'active')
      .map((resource) => ({
        id: resource.id,
        label: `${resource.method} ${resource.path}`,
      })),
  );

  constructor() {
    this.load();
    if (this.canInspectAssignments()) {
      this.loadAssignments();
    }
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.roleApi.list().subscribe({
      next: (roles) => {
        const inactiveRoles = this.roles().filter((role) => role.status === 'inactive');
        this.roles.set([
          ...roles.map((role) => ({ ...role, status: 'active' as const })),
          ...inactiveRoles,
        ]);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.roles.set([]);
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
    this.editingRole.set(null);
    this.roleDialogVisible.set(true);
  }

  openEdit(role: Role): void {
    this.editingRole.set(role);
    this.roleDialogVisible.set(true);
  }

  closeRoleDialog(): void {
    this.roleDialogVisible.set(false);
    this.editingRole.set(null);
  }

  saveRole(payload: RoleFormPayload): void {
    const role = this.editingRole();
    if (role) {
      const description = 'description' in payload ? payload.description : null;
      this.saving.set(true);
      this.roleApi.update(role.id, { description }).subscribe({
        next: (savedRole) => {
          this.saving.set(false);
          this.closeRoleDialog();
          this.roles.update((items) =>
            items.map((item) => (item.id === savedRole.id ? { ...item, ...savedRole } : item)),
          );
          this.notifications.success('Rol actualizado');
        },
        error: (error: HttpErrorResponse) => {
          this.saving.set(false);
          this.error.set(toApiMessage(error));
        },
      });
      return;
    }

    if (!('name' in payload)) {
      this.error.set('Falta el nombre obligatorio para crear el rol.');
      return;
    }
    this.saving.set(true);
    this.roleApi.create(payload).subscribe({
      next: (savedRole) => {
        this.saving.set(false);
        this.closeRoleDialog();
        this.roles.update((items) => {
          const exists = items.some((item) => item.id === savedRole.id);
          const updated = { ...savedRole, status: savedRole.status ?? 'active' };
          return exists
            ? items.map((item) => (item.id === savedRole.id ? updated : item))
            : [...items, updated].sort((a, b) => a.name.localeCompare(b.name));
        });
        this.notifications.success('Rol creado o reactivado');
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  activeAssignmentCount(role: Role): number {
    return this.roleAssignments().filter(
      (assignment) => assignment.roleId === role.id && assignment.status === 'active',
    ).length;
  }

  canChangeStatus(role: Role): boolean {
    if (!this.assignmentDataLoaded()) {
      return false;
    }
    if (role.status === 'active') {
      return role.name !== 'ADMINISTRADOR' && this.activeAssignmentCount(role) === 0;
    }
    return true;
  }

  toggleStatus(role: Role): void {
    if (!this.canChangeStatus(role)) {
      return;
    }
    const status = role.status === 'active' ? 'inactive' : 'active';
    this.confirmation.confirm({
      header: status === 'inactive' ? 'Desactivar rol' : 'Activar rol',
      message: `¿Deseas ${status === 'inactive' ? 'desactivar' : 'activar'} el rol ${role.name}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.busyRoleId.set(role.id);
        this.roleApi.updateStatus(role.id, status).subscribe({
          next: (updated) => {
            this.busyRoleId.set(null);
            this.roles.update((items) =>
              items.map((item) => (item.id === role.id ? { ...item, ...updated } : item)),
            );
            this.notifications.success('Estado del rol actualizado');
            if (status === 'inactive') {
              this.roleAssignments.update((items) =>
                items.map((assignment) =>
                  assignment.roleId === role.id
                    ? { ...assignment, status: 'inactive' }
                    : assignment,
                ),
              );
            }
          },
          error: (error: HttpErrorResponse) => {
            this.busyRoleId.set(null);
            this.error.set(toApiMessage(error));
          },
        });
      },
    });
  }

  openResources(role: Role): void {
    const canReadResources =
      this.session.canPermission('GET', '/api/admin/resources') &&
      this.session.canPermission('GET', '/api/admin/resource-roles') &&
      this.session.canPermission('PUT', '/api/admin/roles/:id/resources');
    if (role.status !== 'active' || !canReadResources) {
      return;
    }
    this.selectedRoleForResources.set(role);
    this.resourcesDialogVisible.set(true);
    this.resourcesLoading.set(true);
    this.resourcesLoaded.set(false);
    this.resourcesError.set('');
    this.resourceApi.list().subscribe({
      next: (resources) => {
        this.resources.set(resources);
        this.loadRoleResources(role.id);
      },
      error: (error: HttpErrorResponse) => {
        this.resourcesLoading.set(false);
        this.resourcesError.set(toApiMessage(error));
      },
    });
  }

  saveResources(): void {
    const role = this.selectedRoleForResources();
    if (!role || !this.resourcesLoaded()) {
      return;
    }
    this.resourcesSaving.set(true);
    const resourceIds = this.selectedResourceIds().filter((id) =>
      this.resourceOptions().some((resource) => resource.id === id),
    );
    this.roleApi.replaceResources(role.id, resourceIds).subscribe({
      next: () => {
        this.resourcesSaving.set(false);
        this.resourcesDialogVisible.set(false);
        this.notifications.success('Recursos del rol actualizados');
        this.auth.refreshPermissions().subscribe({
          error: (error: HttpErrorResponse) => {
            this.notifications.warn(
              'Permisos guardados',
              `No se pudieron actualizar los permisos de la sesión: ${toApiMessage(error)}`,
            );
          },
        });
      },
      error: (error: HttpErrorResponse) => {
        this.resourcesSaving.set(false);
        this.resourcesError.set(toApiMessage(error));
      },
    });
  }

  private canInspectAssignments(): boolean {
    return this.session.canPermission('GET', '/api/admin/role-users');
  }

  private loadAssignments(): void {
    this.assignmentError.set('');
    this.roleUserApi.list().subscribe({
      next: (assignments) => {
        this.roleAssignments.set(
          assignments.map((assignment) => ({
            roleId: assignment.role_id,
            status: assignment.status,
          })),
        );
        this.assignmentDataLoaded.set(true);
      },
      error: (error: HttpErrorResponse) => {
        this.assignmentError.set(toApiMessage(error));
      },
    });
  }

  private loadRoleResources(roleId: number): void {
    this.resourceRoleApi.list({ roleId }).subscribe({
      next: (grants) => {
        this.selectedResourceIds.set(
          grants
            .filter((grant) => grant.status === 'active' && grant.resource?.status === 'active')
            .map((grant) => grant.resource_id),
        );
        this.resourcesLoaded.set(true);
        this.resourcesLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.resourcesLoading.set(false);
        this.resourcesError.set(toApiMessage(error));
      },
    });
  }
}
