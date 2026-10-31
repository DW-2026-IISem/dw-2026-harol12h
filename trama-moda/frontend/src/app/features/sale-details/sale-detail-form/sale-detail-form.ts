import { CurrencyPipe } from '@angular/common';
import type { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';

import type { SaleDetail } from '../../../core/models/sale-detail.model';
import type { Sale, SaleCatalogItem } from '../../../core/models/sale.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { SaleApi } from '../../sales/sale-api';
import { SaleDetailApi } from '../sale-detail-api';

interface SaleOption {
  id: number;
  label: string;
}

interface CatalogOption extends SaleCatalogItem {
  key: string;
  label: string;
  disabled: boolean;
}

@Component({
  selector: 'app-sale-detail-form',
  standalone: true,
  imports: [
    ButtonModule,
    CurrencyPipe,
    FormsModule,
    InputNumberModule,
    MessageModule,
    SelectModule,
  ],
  templateUrl: './sale-detail-form.html',
})
export class SaleDetailForm implements OnInit {
  readonly detail = input<SaleDetail | null>(null);
  readonly saved = output<void>();
  readonly cancelled = output<void>();

  private readonly saleApi = inject(SaleApi);
  private readonly detailApi = inject(SaleDetailApi);
  private readonly notifications = inject(NotificationService);

  readonly sales = signal<Sale[]>([]);
  readonly catalog = signal<SaleCatalogItem[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly saleId = signal<number | null>(null);
  readonly catalogKey = signal<string | null>(null);
  readonly quantity = signal<number | null>(1);

  readonly saleOptions = computed<SaleOption[]>(() =>
    this.sales().map((sale) => ({
      id: sale.id,
      label: `Venta #${sale.id} · ${sale.client?.nombre ?? `Cliente #${sale.client_id}`}`,
    })),
  );

  readonly catalogOptions = computed<CatalogOption[]>(() =>
    this.catalog().map((item) => ({
      ...item,
      key: `${item.variantId}:${item.branchId}`,
      label: item.product
        ? `${item.product.nombre} · ${item.variant.nombre} · ${item.branch.nombre} (stock: ${item.stock})`
        : `${item.variant.nombre} · ${item.branch.nombre} (sin producto asociado)`,
      disabled: !item.available || !item.product || item.stock < 1,
    })),
  );

  readonly selectedItem = computed(
    () => this.catalogOptions().find((item) => item.key === this.catalogKey()) ?? null,
  );

  readonly isEditing = computed(() => this.detail() !== null);
  readonly canSave = computed(() => {
    const quantity = this.quantity();
    if (!Number.isInteger(quantity) || quantity === null || quantity < 1) {
      return false;
    }
    const detail = this.detail();
    if (detail) {
      return detail.status === 'active' && detail.variantId != null && detail.branchId != null;
    }
    const selected = this.selectedItem();
    return this.saleId() !== null && selected !== null && !selected.disabled;
  });

  ngOnInit(): void {
    const detail = this.detail();
    this.saleId.set(detail?.sale_id ?? null);
    this.quantity.set(detail?.cantidad ?? 1);
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    forkJoin({
      sales: this.saleApi.list(),
      catalog: this.saleApi.catalog(),
    }).subscribe({
      next: ({ sales, catalog }) => {
        this.sales.set(sales.filter((sale) => sale.status === 'active'));
        this.catalog.set(catalog.filter((item) => item.stock > 0));
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.sales.set([]);
        this.catalog.set([]);
        this.loading.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  save(): void {
    this.error.set('');
    const quantity = this.quantity();
    if (!Number.isInteger(quantity) || quantity === null || quantity < 1) {
      this.error.set('La cantidad debe ser un entero mayor o igual a 1.');
      return;
    }
    const detail = this.detail();
    if (detail && (detail.variantId == null || detail.branchId == null)) {
      this.error.set('Esta línea histórica no tiene variante y sucursal; no se puede ajustar inventario de forma segura.');
      return;
    }
    const selectedItem = this.selectedItem();
    const saleId = this.saleId();
    if (!detail && (saleId === null || !selectedItem || selectedItem.disabled)) {
      this.error.set('Selecciona una venta, variante y sucursal disponibles.');
      return;
    }

    this.saving.set(true);
    let request: Observable<SaleDetail>;
    if (detail) {
      request = this.detailApi.update(detail.id, { quantity });
    } else if (saleId !== null && selectedItem && !selectedItem.disabled) {
      request = this.detailApi.create({
        sale_id: saleId,
        variantId: selectedItem.variantId,
        branchId: selectedItem.branchId,
        quantity,
      });
    } else {
      this.error.set('Selecciona una venta, variante y sucursal disponibles.');
      return;
    }

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.notifications.success(
          detail ? 'Detalle actualizado' : 'Detalle agregado',
          'El inventario y el total de la venta se actualizaron.',
        );
        this.saved.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        const message = toApiMessage(error);
        this.error.set(message);
        this.notifications.error('No se pudo guardar el detalle', message);
      },
    });
  }
}
