import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { Product } from '../../../core/models/product.model';
import {
  Variant,
  VariantPayload,
} from '../../../core/models/variant.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';
import { ProductApi } from '../../products/product-api';
import { VariantApi } from '../variant-api';
import { VariantForm } from '../variant-form/variant-form';

@Component({
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ConfirmDialog,
    DialogModule,
    InputTextModule,
    TableModule,
    ToastModule,
    VariantForm,
  ],
  providers: [ConfirmationService],
  selector: 'app-variant-list',
  styleUrl: './variant-list.css',
  templateUrl: './variant-list.html',
})
export class VariantList {
  private readonly api = inject(VariantApi);
  private readonly productApi = inject(ProductApi);
  private readonly notifications = inject(NotificationService);
  private readonly confirmations = inject(ConfirmationService);

  readonly variants = signal<Variant[]>([]);
  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly productsLoading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly productsError = signal('');
  readonly search = signal('');
  readonly dialogVisible = signal(false);
  readonly selectedVariant = signal<Variant | null>(null);

  readonly filteredVariants = computed(() => {
    const productsById = new Map(
      this.products().map((product) => [product.id, product.nombre]),
    );

    return filterRows(this.variants(), this.search(), (variant) => [
      variant.id,
      variant.nombre,
      variant.descripcion ?? '',
      variant.product_id === null
        ? 'Sin producto'
        : (productsById.get(variant.product_id) ??
          `Producto #${variant.product_id}`),
    ]);
  });

  constructor() {
    this.loadVariants();
    this.loadProducts();
  }

  loadVariants(): void {
    this.loading.set(true);
    this.error.set('');

    this.api.list().subscribe({
      next: (variants) => {
        this.variants.set(variants);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.variants.set([]);
        this.error.set(toApiMessage(error));
        this.loading.set(false);
      },
    });
  }

  loadProducts(): void {
    this.productsLoading.set(true);
    this.productsError.set('');

    this.productApi.list().subscribe({
      next: (products) => {
        this.products.set(products);
        this.productsLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.products.set([]);
        this.productsError.set(toApiMessage(error));
        this.productsLoading.set(false);
      },
    });
  }

  productName(variant: Variant): string {
    if (variant.product_id === null) {
      return 'Sin producto';
    }

    const product = this.products().find(
      (item) => item.id === variant.product_id,
    );
    return product?.nombre ?? `Producto #${variant.product_id}`;
  }

  openCreate(): void {
    this.selectedVariant.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(variant: Variant): void {
    this.selectedVariant.set(variant);
    this.dialogVisible.set(true);
  }

  saveVariant(payload: VariantPayload): void {
    if (this.saving()) {
      return;
    }

    this.saving.set(true);
    const variant = this.selectedVariant();
    const request = variant
      ? this.api.update(variant.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);
        this.selectedVariant.set(null);
        this.notifications.success(
          variant ? 'Variante actualizada' : 'Variante creada',
          variant
            ? 'Los cambios se guardaron correctamente.'
            : 'La variante se registró correctamente.',
        );
        this.loadVariants();
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.notifications.error(
          'No se pudo guardar la variante',
          toApiMessage(error),
        );
      },
    });
  }

  deactivate(variant: Variant): void {
    this.confirmations.confirm({
      header: 'Desactivar variante',
      message: `¿Deseas desactivar la variante "${variant.nombre}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.deactivate(variant.id).subscribe({
          next: () => {
            this.notifications.success(
              'Variante desactivada',
              'La variante se desactivó correctamente.',
            );
            this.loadVariants();
          },
          error: (error: HttpErrorResponse) => {
            this.notifications.error(
              'No se pudo desactivar la variante',
              toApiMessage(error),
            );
          },
        });
      },
    });
  }

  closeDialog(): void {
    if (this.saving()) {
      return;
    }

    this.dialogVisible.set(false);
    this.selectedVariant.set(null);
  }
}
