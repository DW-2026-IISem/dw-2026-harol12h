import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { Branch, BranchPayload } from '../../../core/models/branch.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';
import { BranchApi } from '../branch-api';
import { BranchForm } from '../branch-form/branch-form';
import { HasPermission } from '../../../shared/directives/has-permission';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ConfirmDialog,
    DialogModule,
    InputTextModule,
    Message,
    TableModule,
    Tag,
    ToastModule,
    HasPermission,
    BranchForm,
  ],
  providers: [ConfirmationService],
  templateUrl: './branch-list.html',
  styleUrl: './branch-list.css',
})
export class BranchList {
  private readonly branchApi = inject(BranchApi);
  private readonly notifications = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly branches = signal<Branch[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly search = signal('');

  readonly dialogVisible = signal(false);
  readonly selectedBranch = signal<Branch | null>(null);

  readonly filteredBranches = computed(() =>
    filterRows(this.branches(), this.search(), (branch) => [
      branch.id,
      branch.nombre,
      branch.direccion ?? '',
      branch.telefono ?? '',
    ]),
  );

  constructor() {
    this.loadBranches();
  }

  loadBranches(): void {
    this.loading.set(true);
    this.error.set('');

    this.branchApi.list().subscribe({
      next: (branches) => {
        this.branches.set(branches);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.branches.set([]);
        this.loading.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  openCreate(): void {
    this.selectedBranch.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(branch: Branch): void {
    this.selectedBranch.set(branch);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    if (this.saving()) {
      return;
    }

    this.dialogVisible.set(false);
    this.selectedBranch.set(null);
  }

  saveBranch(payload: BranchPayload): void {
    if (this.saving()) {
      return;
    }

    this.saving.set(true);

    const branch = this.selectedBranch();
    const request = branch
      ? this.branchApi.update(branch.id, payload)
      : this.branchApi.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);
        this.selectedBranch.set(null);

        this.notifications.success(
          branch ? 'Sucursal actualizada' : 'Sucursal creada',
          branch
            ? 'Los cambios se guardaron correctamente.'
            : 'La sucursal se registró exitosamente.',
        );

        this.loadBranches();
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.notifications.error(
          'No se pudo guardar la sucursal',
          toApiMessage(error),
        );
      },
    });
  }

  deactivate(branch: Branch): void {
    this.confirmation.confirm({
      header: 'Desactivar sucursal',
      message: `¿Deseas dar de baja a la sucursal "${branch.nombre}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.branchApi.deactivate(branch.id).subscribe({
          next: () => {
            this.notifications.success(
              'Sucursal desactivada',
              'La sucursal se dio de baja correctamente.',
            );
            this.loadBranches();
          },
          error: (error: HttpErrorResponse) => {
            this.notifications.error(
              'No se pudo desactivar la sucursal',
              toApiMessage(error),
            );
          },
        });
      },
    });
  }

  remove(branch: Branch): void {
    this.confirmation.confirm({
      header: 'Eliminar sucursal',
      message: `¿Deseas eliminar a la sucursal "${branch.nombre}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.branchApi.remove(branch.id).subscribe({
          next: () => {
            this.notifications.success(
              'Sucursal eliminada',
              'La sucursal se eliminó correctamente.',
            );
            this.loadBranches();
          },
          error: (error: HttpErrorResponse) => {
            this.notifications.error(
              'No se pudo eliminar la sucursal',
              toApiMessage(error),
            );
          },
        });
      },
    });
  }
}
