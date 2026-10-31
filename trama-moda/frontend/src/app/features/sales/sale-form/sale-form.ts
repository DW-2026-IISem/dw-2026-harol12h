import { CurrencyPipe } from '@angular/common';
import type { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import type { Client } from '../../../core/models/client.model';
import type {
  SaleCatalogItem,
  SaleCreateItem,
} from '../../../core/models/sale.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { ClientApi } from '../../clients/client-api';
import { SaleApi } from '../sale-api';

interface ClientOption {
  id: number;
  label: string;
}

interface CatalogOption extends SaleCatalogItem {
  key: string;
  label: string;
  disabled: boolean;
}

interface DraftLineView extends SaleCreateItem {
  key: string;
  label: string;
  stock: number;
  unitPrice: number;
  lineTotal: number;
}

@Component({
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CurrencyPipe,
    FormsModule,
    InputNumberModule,
    MessageModule,
    SelectModule,
    TableModule,
    ToastModule,
  ],
  selector: 'app-sale-form',
  styleUrl: './sale-form.css',
  templateUrl: './sale-form.html',
})
export class SaleForm {
  private readonly clientApi = inject(ClientApi);
  private readonly saleApi = inject(SaleApi);
  private readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);

  readonly clients = signal<Client[]>([]);
  readonly catalog = signal<SaleCatalogItem[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly clientId = signal<number | null>(null);
  readonly selectedCatalogKey = signal<string | null>(null);
  readonly quantity = signal<number | null>(1);
  readonly taxRate = signal<number | null>(0);
  readonly discounts = signal<number | null>(0);
  readonly lines = signal<SaleCreateItem[]>([]);

  readonly clientOptions = computed<ClientOption[]>(() =>
    this.clients().map((client) => ({
      id: client.id,
      label: `${client.nombre} (${client.tipo_documento} ${client.numero_documento})`,
    })),
  );

  readonly catalogOptions = computed<CatalogOption[]>(() =>
    this.catalog().map((item) => ({
      ...item,
      key: this.catalogKey(item.variantId, item.branchId),
      label:
        item.available && item.product
          ? `${item.product.nombre} · ${item.variant.nombre} · ${item.branch.nombre} (stock: ${item.stock})`
          : `${item.variant.nombre} · ${item.branch.nombre} (sin producto activo asociado)`,
      disabled: !item.available || !item.product,
    })),
  );

  readonly hasUnavailableCatalogOptions = computed(() =>
    this.catalogOptions().some((item) => item.disabled),
  );

  readonly selectedCatalogItem = computed(
    () =>
      this.catalogOptions().find(
        (item) => item.key === this.selectedCatalogKey(),
      ) ?? null,
  );

  readonly draftLines = computed<DraftLineView[]>(() => {
    const catalogByKey = new Map(
      this.catalogOptions().map((item) => [item.key, item]),
    );
    return this.lines().map((line) => {
      const key = this.catalogKey(line.variantId, line.branchId);
      const item = catalogByKey.get(key);
      const unitPrice = Number(item?.product?.precio ?? 0);
      return {
        ...line,
        key,
        label: item?.label ?? `Variante #${line.variantId}`,
        stock: item?.stock ?? 0,
        unitPrice,
        lineTotal: unitPrice * line.quantity,
      };
    });
  });

  readonly subtotal = computed(() =>
    this.draftLines().reduce((sum, line) => sum + line.lineTotal, 0),
  );

  readonly taxAmount = computed(
    () => this.subtotal() * (Number(this.taxRate()) || 0) / 100,
  );

  readonly total = computed(
    () =>
      this.subtotal() +
      this.taxAmount() -
      (Number(this.discounts()) || 0),
  );

  readonly canSave = computed(
    () =>
      this.clientId() !== null &&
      this.lines().length > 0 &&
      Number(this.taxRate()) >= 0 &&
      Number(this.taxRate()) <= 100 &&
      Number(this.discounts()) >= 0 &&
      Number(this.discounts()) <= this.subtotal() + this.taxAmount(),
  );

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    forkJoin({
      clients: this.clientApi.list(),
      catalog: this.saleApi.catalog(),
    }).subscribe({
      next: ({ clients, catalog }) => {
        this.clients.set(clients.filter((client) => client.status === 'active'));
        this.catalog.set(catalog.filter((item) => item.stock > 0));
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.clients.set([]);
        this.catalog.set([]);
        this.loading.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  addLine(): void {
    this.error.set('');
    const item = this.selectedCatalogItem();
    const requested = Number(this.quantity());

    if (!item || !item.available || !item.product) {
      this.error.set('Selecciona una variante y sucursal disponibles.');
      return;
    }
    if (!Number.isInteger(requested) || requested < 1) {
      this.error.set('La cantidad debe ser un entero mayor o igual a 1.');
      return;
    }

    const existingQuantity = this.lines()
      .filter(
        (line) =>
          line.variantId === item.variantId && line.branchId === item.branchId,
      )
      .reduce((sum, line) => sum + line.quantity, 0);
    if (existingQuantity + requested > item.stock) {
      this.error.set(
        `Stock insuficiente para ${item.label}. Disponible: ${item.stock - existingQuantity}.`,
      );
      return;
    }

    const found = this.lines().some(
      (line) =>
        line.variantId === item.variantId && line.branchId === item.branchId,
    );
    this.lines.update((lines) =>
      found
        ? lines.map((line) =>
            line.variantId === item.variantId &&
            line.branchId === item.branchId
              ? { ...line, quantity: line.quantity + requested }
              : line,
          )
        : [
            ...lines,
            {
              variantId: item.variantId,
              branchId: item.branchId,
              quantity: requested,
            },
          ],
    );
    this.selectedCatalogKey.set(null);
    this.quantity.set(1);
  }

  removeLine(index: number): void {
    this.lines.update((lines) => lines.filter((_, lineIndex) => lineIndex !== index));
  }

  save(): void {
    this.error.set('');
    const clientId = this.clientId();
    const taxRate = Number(this.taxRate());
    const discounts = Number(this.discounts());

    if (clientId === null) {
      this.error.set('Selecciona un cliente activo.');
      return;
    }
    if (this.lines().length === 0) {
      this.error.set('Agrega al menos una línea a la venta.');
      return;
    }
    if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) {
      this.error.set('El impuesto debe ser un porcentaje entre 0 y 100.');
      return;
    }
    if (
      !Number.isFinite(discounts) ||
      discounts < 0 ||
      discounts > this.subtotal() + this.taxAmount()
    ) {
      this.error.set('El descuento no puede superar el subtotal más el impuesto.');
      return;
    }

    this.saving.set(true);
    this.saleApi
      .create({
        client_id: clientId,
        tax: taxRate,
        discounts,
        items: this.lines(),
      })
      .subscribe({
        next: (sale) => {
          this.saving.set(false);
          this.notifications.success(
            `Venta #${sale.id} registrada`,
            'La venta y el inventario se actualizaron correctamente.',
          );
          void this.router.navigateByUrl('/ventas');
        },
        error: (error: HttpErrorResponse) => {
          this.saving.set(false);
          const message = toApiMessage(error);
          this.error.set(message);
          this.notifications.error('No se pudo registrar la venta', message);
        },
      });
  }

  cancel(): void {
    void this.router.navigateByUrl('/ventas');
  }

  private catalogKey(variantId: number, branchId: number): string {
    return `${variantId}:${branchId}`;
  }
}
