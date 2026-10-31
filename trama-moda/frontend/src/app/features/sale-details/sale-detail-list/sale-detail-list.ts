import { CurrencyPipe } from '@angular/common';
import type { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { toNumber } from '../../../core/models/api.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import type { SaleDetail } from '../../../core/models/sale-detail.model';
import { SaleDetailApi } from '../sale-detail-api';
import { SaleDetailForm } from '../sale-detail-form/sale-detail-form';

@Component({
  selector: 'app-sale-detail-list',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    CurrencyPipe,
    DialogModule,
    MessageModule,
    SaleDetailForm,
    TableModule,
    TagModule,
    ToastModule,
  ],
  templateUrl: './sale-detail-list.html',
})
export class SaleDetailList {
  private readonly detailApi = inject(SaleDetailApi);
  private readonly confirmations = inject(ConfirmationService);
  private readonly notifications = inject(NotificationService);

  readonly details = signal<SaleDetail[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly formVisible = signal(false);
  readonly editingDetail = signal<SaleDetail | null>(null);

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.detailApi.list().subscribe({
      next: (details) => {
        this.details.set(details);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.details.set([]);
        this.loading.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  newDetail(): void {
    this.editingDetail.set(null);
    this.formVisible.set(true);
  }

  edit(detail: SaleDetail): void {
    if (detail.status !== 'active') {
      this.notifications.error('No se puede editar', 'El detalle está inactivo.');
      return;
    }
    if (detail.variantId == null || detail.branchId == null) {
      this.notifications.error(
        'No se puede ajustar el inventario',
        'Esta línea histórica no tiene variante y sucursal asociadas.',
      );
      return;
    }
    this.editingDetail.set(detail);
    this.formVisible.set(true);
  }

  deactivate(detail: SaleDetail): void {
    this.confirmations.confirm({
      header: 'Dar de baja el detalle',
      message: `Se restaurarán ${detail.cantidad} unidades al inventario. ¿Deseas continuar?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.detailApi.deactivate(detail.id).subscribe({
          next: () => {
            this.notifications.success(
              'Detalle dado de baja',
              'El inventario y el total de la venta se recalcularon.',
            );
            this.load();
          },
          error: (error: HttpErrorResponse) => {
            const message = toApiMessage(error);
            this.error.set(message);
            this.notifications.error('No se pudo dar de baja', message);
          },
        });
      },
    });
  }

  remove(detail: SaleDetail): void {
    this.confirmations.confirm({
      header: 'Eliminar detalle',
      message: detail.status === 'active'
        ? `Se restaurarán ${detail.cantidad} unidades al inventario. ¿Deseas eliminar esta línea de forma permanente?`
        : 'Esta línea inactiva se eliminará permanentemente. ¿Deseas continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.detailApi.remove(detail.id).subscribe({
          next: () => {
            this.notifications.success(
              'Detalle eliminado',
              'La línea se eliminó y el inventario se ajustó correctamente.',
            );
            this.load();
          },
          error: (error: HttpErrorResponse) => {
            const message = toApiMessage(error);
            this.error.set(message);
            this.notifications.error('No se pudo eliminar', message);
          },
        });
      },
    });
  }

  closeForm(): void {
    this.formVisible.set(false);
    this.editingDetail.set(null);
  }

  onSaved(): void {
    this.closeForm();
    this.load();
  }

  amount(value: number | string): number {
    return toNumber(value);
  }
}
