import type { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import type { Status } from '../../../../core/models/api.model';
import type { Role } from '../../../../core/models/role.model';
import { NotificationService } from '../../../../core/services/notification';
import { SessionStore } from '../../../../core/services/session-store';
import { toApiMessage } from '../../../../core/utils/api-error';
import { HasPermission } from '../../../../shared/directives/has-permission';
import { AccountApi, AuthAccount } from '../../accounts/account-api';
import { RoleApi } from '../../roles/role-api';
import { RoleUserApi, RoleUserListItem } from '../role-user-api';

interface AccountOption {
  id: number;
  label: string;
}

interface RoleOption {
  id: number;
  label: string;
}

@Component({
  selector: 'app-role-user-list',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    HasPermission,
    MessageModule,
    SelectModule,
    TableModule,
    TagModule,
    ToastModule,
  ],
  styleUrl: './role-user-list.css',
  templateUrl: './role-user-list.html',
})
export class RoleUserList {
  private readonly roleUserApi = inject(RoleUserApi);
  private readonly accountApi = inject(AccountApi);
  private readonly roleApi = inject(RoleApi);
  private readonly session = inject(SessionStore);
  private readonly notifications = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly assignments = signal<RoleUserListItem[]>([]);
  readonly accounts = signal<AuthAccount[]>([]);
  readonly roles = signal<Role[]>([]);
  readonly loading = signal(false);
  readonly accountsLoading = signal(false);
  readonly rolesLoading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly accountsError = signal('');
  readonly rolesError = signal('');
  readonly dialogVisible = signal(false);
  readonly selectedUserId = signal<number | null>(null);
  readonly selectedRoleId = signal<number | null>(null);
  readonly filterUserId = signal<number | null>(null);
  readonly filterRoleId = signal<number | null>(null);
  readonly busyAssignmentId = signal<number | null>(null);

  readonly accountOptions = computed<AccountOption[]>(() =>
    this.accounts()
      .filter((account) => account.status === 'active')
      .map((account) => ({
        id: account.id,
        label: `${account.username} · ${account.email}`,
      })),
  );
  readonly filterAccountOptions = computed<AccountOption[]>(() => {
    const accounts = new Map<number, string>(
      this.accounts().map((account) => [account.id, `${account.username} · ${account.email}`]),
    );
    for (const assignment of this.assignments()) {
      if (assignment.user) {
        accounts.set(assignment.user.id, `${assignment.user.username} · ${assignment.user.email}`);
      }
    }
    return [...accounts]
      .map(([id, label]) => ({ id, label }))
      .sort((left, right) => left.label.localeCompare(right.label));
  });
  readonly roleOptions = computed<RoleOption[]>(() =>
    this.roles().map((role) => ({
      id: role.id,
      label: role.name,
    })),
  );
  readonly filterRoleOptions = computed<RoleOption[]>(() => {
    const roles = new Map(this.roles().map((role) => [role.id, role.name]));
    for (const assignment of this.assignments()) {
      if (assignment.role) {
        roles.set(assignment.role.id, assignment.role.name);
      }
    }
    return [...roles].map(([id, label]) => ({ id, label }));
  });
  readonly filteredAssignments = computed(() => {
    const userId = this.filterUserId();
    const roleId = this.filterRoleId();
    return this.assignments().filter(
      (assignment) =>
        (userId === null || assignment.user_id === userId) &&
        (roleId === null || assignment.role_id === roleId),
    );
  });

  constructor() {
    this.loadAssignments();
    if (this.session.canPermission('GET', '/api/admin/accounts')) {
      this.loadAccounts();
    }
    if (this.session.canPermission('GET', '/api/admin/roles')) {
      this.loadRoles();
    }
  }

  loadAssignments(): void {
    this.loading.set(true);
    this.error.set('');
    this.roleUserApi.list().subscribe({
      next: (assignments) => {
        this.assignments.set(assignments);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.assignments.set([]);
        this.loading.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  openCreate(): void {
    this.selectedUserId.set(null);
    this.selectedRoleId.set(null);
    this.dialogVisible.set(true);
  }

  createAssignment(): void {
    const userId = this.selectedUserId();
    const roleId = this.selectedRoleId();
    if (userId === null || roleId === null) {
      this.error.set('Selecciona una cuenta activa y un rol activo.');
      return;
    }
    const duplicate = this.assignments().some(
      (assignment) =>
        assignment.user_id === userId &&
        assignment.role_id === roleId &&
        assignment.status === 'active',
    );
    if (duplicate) {
      this.error.set('La cuenta ya tiene asignado ese rol.');
      return;
    }

    this.saving.set(true);
    this.error.set('');
    this.roleUserApi.create({ userId, roleId }).subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);
        this.notifications.success('Asignación usuario-rol creada');
        this.loadAssignments();
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  canRevoke(assignment: RoleUserListItem): boolean {
    if (
      assignment.status !== 'active' ||
      assignment.role?.name !== 'ADMINISTRADOR' ||
      assignment.user?.status !== 'active'
    ) {
      return true;
    }
    return this.activeAdministratorCount() > 1;
  }

  revoke(assignment: RoleUserListItem): void {
    const userId = assignment.user?.id;
    if (userId === undefined || !this.canRevoke(assignment)) {
      return;
    }
    const username = assignment.user?.username ?? '';
    const roleName = assignment.role?.name ?? '';
    this.confirmation.confirm({
      header: 'Retirar asignación',
      message: `¿Deseas retirar el rol ${roleName} de ${username}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.busyAssignmentId.set(assignment.id);
        this.accountApi.revokeRole(userId, assignment.role_id).subscribe({
          next: () => {
            this.busyAssignmentId.set(null);
            this.notifications.success('Asignación retirada');
            this.loadAssignments();
          },
          error: (error: HttpErrorResponse) => {
            this.busyAssignmentId.set(null);
            this.error.set(toApiMessage(error));
          },
        });
      },
    });
  }

  statusLabel(status: Status): string {
    return status === 'active' ? 'Activa' : 'Inactiva';
  }

  private loadAccounts(): void {
    this.accountsLoading.set(true);
    this.accountApi.list().subscribe({
      next: (accounts) => {
        this.accounts.set(accounts);
        this.accountsLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.accountsLoading.set(false);
        this.accountsError.set(toApiMessage(error));
      },
    });
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

  private activeAdministratorCount(): number {
    return this.assignments().filter(
      (assignment) =>
        assignment.status === 'active' &&
        assignment.role?.name === 'ADMINISTRADOR' &&
        assignment.user?.status === 'active',
    ).length;
  }
}
