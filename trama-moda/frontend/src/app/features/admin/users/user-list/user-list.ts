import type { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { TooltipModule } from 'primeng/tooltip';

import type { Status } from '../../../../core/models/api.model';
import type { Role } from '../../../../core/models/role.model';
import type { User } from '../../../../core/models/user.model';
import { NotificationService } from '../../../../core/services/notification';
import { SessionStore } from '../../../../core/services/session-store';
import { toApiMessage } from '../../../../core/utils/api-error';
import { HasPermission } from '../../../../shared/directives/has-permission';
import {
  AccountApi,
  AuthAccount,
  CreateAccountPayload,
  UpdateAccountPayload,
} from '../../accounts/account-api';
import { RoleApi } from '../../roles/role-api';
import { UserForm } from '../user-form/user-form';

@Component({
  selector: 'app-user-list',
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
    ReactiveFormsModule,
    SelectModule,
    TableModule,
    TagModule,
    ToastModule,
    TooltipModule,
    UserForm,
  ],
  styleUrl: './user-list.css',
  templateUrl: './user-list.html',
})
export class UserList {
  private readonly accountApi = inject(AccountApi);
  private readonly roleApi = inject(RoleApi);
  private readonly session = inject(SessionStore);
  private readonly notifications = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly formBuilder = inject(FormBuilder);

  readonly accounts = signal<AuthAccount[]>([]);
  readonly roles = signal<Role[]>([]);
  readonly loading = signal(false);
  readonly rolesLoading = signal(false);
  readonly rolesLoaded = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly rolesError = signal('');
  readonly search = signal('');
  readonly accountDialogVisible = signal(false);
  readonly editingAccount = signal<AuthAccount | null>(null);
  readonly assignDialogVisible = signal(false);
  readonly assignTarget = signal<AuthAccount | null>(null);
  readonly selectedRoleId = signal<number | null>(null);
  readonly assignmentError = signal('');
  readonly passwordDialogVisible = signal(false);
  readonly passwordTarget = signal<AuthAccount | null>(null);
  readonly detailDialogVisible = signal(false);
  readonly detailLoading = signal(false);
  readonly selectedDetail = signal<User | null>(null);
  readonly busyAccountId = signal<number | null>(null);
  readonly selectOverlayOptions = { autoZIndex: true, baseZIndex: 200 };

  readonly filteredAccounts = computed(() => {
    const query = this.search().trim().toLocaleLowerCase();
    if (!query) {
      return this.accounts();
    }

    return this.accounts().filter(
      (account) =>
        account.username.toLocaleLowerCase().includes(query) ||
        account.email.toLocaleLowerCase().includes(query),
    );
  });

  readonly passwordForm = this.formBuilder.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(12)]],
  });

  constructor() {
    this.loadAccounts();
    if (this.session.canPermission('GET', '/api/admin/roles')) {
      this.loadRoles();
    } else {
      this.rolesLoaded.set(true);
      this.rolesError.set('No tienes permiso para consultar la lista de roles.');
    }
  }

  loadAccounts(): void {
    this.loading.set(true);
    this.error.set('');
    this.accountApi.list().subscribe({
      next: (accounts) => {
        this.accounts.set(accounts);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.accounts.set([]);
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
    this.editingAccount.set(null);
    this.accountDialogVisible.set(true);
  }

  openEdit(account: AuthAccount): void {
    this.editingAccount.set(account);
    this.accountDialogVisible.set(true);
  }

  closeAccountDialog(): void {
    this.accountDialogVisible.set(false);
    this.editingAccount.set(null);
  }

  saveAccount(payload: CreateAccountPayload | UpdateAccountPayload): void {
    const account = this.editingAccount();
    if (account) {
      this.saving.set(true);
      this.accountApi
        .update(account.id, {
          username: payload.username,
          email: payload.email,
        })
        .subscribe({
          next: () => this.accountSaved('Cuenta actualizada'),
          error: (error: HttpErrorResponse) => this.saveFailed(error),
        });
      return;
    }

    if (!('password' in payload)) {
      this.error.set('Faltan los datos obligatorios para crear la cuenta.');
      return;
    }
    this.saving.set(true);
    this.accountApi.create(payload).subscribe({
      next: () => this.accountSaved('Cuenta creada'),
      error: (error: HttpErrorResponse) => this.saveFailed(error),
    });
  }

  activeRoleNames(account: AuthAccount): string[] {
    return [
      ...new Set(
        (account.role_users ?? [])
          .filter((assignment) => assignment.status === 'active')
          .map((assignment) => assignment.role?.name)
          .filter((name): name is string => !!name),
      ),
    ];
  }

  isSelf(account: AuthAccount): boolean {
    return this.session.profile()?.id === account.id;
  }

  canChangeAccountStatus(account: AuthAccount): boolean {
    if (account.status !== 'active') {
      return true;
    }
    if (this.isSelf(account)) {
      return false;
    }

    return !this.isLastAdministrator(account);
  }

  toggleAccountStatus(account: AuthAccount): void {
    if (!this.canChangeAccountStatus(account)) {
      return;
    }

    const status: Status = account.status === 'active' ? 'inactive' : 'active';
    this.confirmation.confirm({
      header: status === 'inactive' ? 'Desactivar cuenta' : 'Activar cuenta',
      message: `¿Deseas ${status === 'inactive' ? 'desactivar' : 'activar'} la cuenta ${account.username}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.busyAccountId.set(account.id);
        this.accountApi.updateStatus(account.id, status).subscribe({
          next: () => {
            this.busyAccountId.set(null);
            this.notifications.success('Estado de cuenta actualizado');
            this.loadAccounts();
          },
          error: (error: HttpErrorResponse) => {
            this.busyAccountId.set(null);
            this.error.set(toApiMessage(error));
          },
        });
      },
    });
  }

  openAssignment(account: AuthAccount): void {
    this.assignTarget.set(account);
    this.selectedRoleId.set(null);
    this.assignmentError.set('');
    this.assignDialogVisible.set(true);
    if (!this.rolesLoaded() && !this.rolesLoading()) {
      this.loadRoles();
    }
  }

  assignRole(): void {
    const account = this.assignTarget();
    const roleId = this.selectedRoleId();
    if (!account || roleId === null) {
      this.assignmentError.set('Selecciona un rol activo.');
      return;
    }
    if (
      (account.role_users ?? []).some(
        (assignment) => assignment.role?.id === roleId && assignment.status === 'active',
      )
    ) {
      this.assignmentError.set('La cuenta ya tiene asignado ese rol.');
      return;
    }

    this.saving.set(true);
    this.assignmentError.set('');
    this.accountApi.assignRole(account.id, roleId).subscribe({
      next: () => {
        this.saving.set(false);
        this.assignDialogVisible.set(false);
        this.notifications.success('Rol asignado');
        this.loadAccounts();
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.assignmentError.set(toApiMessage(error));
      },
    });
  }

  canRevokeRole(account: AuthAccount, roleName: string): boolean {
    if (roleName !== 'ADMINISTRADOR') {
      return true;
    }
    return this.activeAdministratorCount() > 1 || account.status !== 'active';
  }

  revokeRole(account: AuthAccount, roleId: number, roleName: string): void {
    if (!this.canRevokeRole(account, roleName)) {
      return;
    }
    this.confirmation.confirm({
      header: 'Retirar rol',
      message: `¿Deseas retirar el rol ${roleName} de ${account.username}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.busyAccountId.set(account.id);
        this.accountApi.revokeRole(account.id, roleId).subscribe({
          next: () => {
            this.busyAccountId.set(null);
            this.notifications.success('Rol retirado');
            this.loadAccounts();
          },
          error: (error: HttpErrorResponse) => {
            this.busyAccountId.set(null);
            this.error.set(toApiMessage(error));
          },
        });
      },
    });
  }

  openPasswordDialog(account: AuthAccount): void {
    this.passwordTarget.set(account);
    this.passwordForm.reset({ password: '' });
    this.passwordDialogVisible.set(true);
  }

  changePassword(): void {
    const account = this.passwordTarget();
    if (!account) {
      return;
    }
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.accountApi.changePassword(account.id, this.passwordForm.getRawValue()).subscribe({
      next: () => {
        this.saving.set(false);
        this.passwordDialogVisible.set(false);
        this.notifications.success('Contraseña actualizada');
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  viewAccount(account: AuthAccount): void {
    this.selectedDetail.set(null);
    this.detailDialogVisible.set(true);
    this.detailLoading.set(true);
    this.accountApi.get(account.id).subscribe({
      next: (detail) => {
        this.selectedDetail.set(detail);
        this.detailLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.detailLoading.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  private loadRoles(): void {
    this.rolesLoading.set(true);
    this.rolesError.set('');
    this.roleApi.list().subscribe({
      next: (roles) => {
        this.roles.set(roles);
        this.rolesLoading.set(false);
        this.rolesLoaded.set(true);
      },
      error: (error: HttpErrorResponse) => {
        this.roles.set([]);
        this.rolesLoading.set(false);
        this.rolesLoaded.set(true);
        this.rolesError.set(toApiMessage(error));
      },
    });
  }

  private accountSaved(message: string): void {
    this.saving.set(false);
    this.closeAccountDialog();
    this.notifications.success(message);
    this.loadAccounts();
  }

  private saveFailed(error: HttpErrorResponse): void {
    this.saving.set(false);
    this.error.set(toApiMessage(error));
  }

  private isLastAdministrator(account: AuthAccount): boolean {
    return (
      this.activeRoleNames(account).includes('ADMINISTRADOR') &&
      this.activeAdministratorCount() <= 1
    );
  }

  private activeAdministratorCount(): number {
    return this.accounts().filter(
      (account) =>
        account.status === 'active' && this.activeRoleNames(account).includes('ADMINISTRADOR'),
    ).length;
  }
}
