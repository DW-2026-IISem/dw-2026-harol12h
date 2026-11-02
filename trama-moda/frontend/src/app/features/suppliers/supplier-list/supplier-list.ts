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

import { Supplier, SupplierPayload } from '../../../core/models/supplier.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';
import { SupplierApi } from '../supplier-api';
import { SupplierForm } from '../supplier-form/supplier-form';

@Component({
  selector: 'app-supplier-list',
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
    SupplierForm,
  ],
  providers: [ConfirmationService],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css',
})
export class SupplierList {
  private readonly supplierApi = inject(SupplierApi);
  private readonly notifications = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly suppliers = signal<Supplier[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly search = signal('');

  readonly dialogVisible = signal(false);
  readonly selectedSupplier = signal<Supplier | null>(null);

  readonly filteredSuppliers = computed(() =>
    filterRows(this.suppliers(), this.search(), (supplier) => [
      supplier.id,
      supplier.name,
      supplier.contact_name ?? '',
      supplier.email ?? '',
      supplier.phone ?? '',
      supplier.address ?? '',
    ]),
  );

  constructor() {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.loading.set(true);
    this.error.set('');

    this.supplierApi.list().subscribe({
      next: (suppliers) => {
        this.suppliers.set(suppliers);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.suppliers.set([]);
        this.loading.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  openCreate(): void {
    this.selectedSupplier.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(supplier: Supplier): void {
    this.selectedSupplier.set(supplier);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    if (this.saving()) {
      return;
    }

    this.dialogVisible.set(false);
    this.selectedSupplier.set(null);
  }

  saveSupplier(payload: SupplierPayload): void {
    if (this.saving()) {
      return;
    }

    this.saving.set(true);

    const supplier = this.selectedSupplier();
    const request = supplier
      ? this.supplierApi.update(supplier.id, payload)
      : this.supplierApi.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);
        this.selectedSupplier.set(null);

        this.notifications.success(
          supplier ? 'Proveedor actualizado' : 'Proveedor creado',
          supplier
            ? 'Los cambios se guardaron correctamente.'
            : 'El proveedor se registró exitosamente.',
        );

        this.loadSuppliers();
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.notifications.error(
          'No se pudo guardar el proveedor',
          toApiMessage(error),
        );
      },
    });
  }

  deactivate(supplier: Supplier): void {
    this.confirmation.confirm({
      header: 'Desactivar proveedor',
      message: `¿Deseas dar de baja al proveedor "${supplier.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.supplierApi.deactivate(supplier.id).subscribe({
          next: () => {
            this.notifications.success(
              'Proveedor desactivado',
              'El proveedor se dio de baja correctamente.',
            );
            this.loadSuppliers();
          },
          error: (error: HttpErrorResponse) => {
            this.notifications.error(
              'No se pudo desactivar el proveedor',
              toApiMessage(error),
            );
          },
        });
      },
    });
  }

  remove(supplier: Supplier): void {
    this.confirmation.confirm({
      header: 'Eliminar proveedor',
      message: `¿Deseas eliminar al proveedor "${supplier.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.supplierApi.remove(supplier.id).subscribe({
          next: () => {
            this.notifications.success(
              'Proveedor eliminado',
              'El proveedor se eliminó correctamente.',
            );
            this.loadSuppliers();
          },
          error: (error: HttpErrorResponse) => {
            this.notifications.error(
              'No se pudo eliminar el proveedor',
              toApiMessage(error),
            );
          },
        });
      },
    });
  }
}
