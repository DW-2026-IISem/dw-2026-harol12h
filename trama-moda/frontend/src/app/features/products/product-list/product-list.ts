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

import { Product, ProductPayload } from '../../../core/models/product.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';
import { ProductApi } from '../product-api';
import { ProductForm } from '../product-form/product-form';
import { forkJoin } from 'rxjs';
import { Category } from '../../../core/models/category.model';
import { CategoryApi } from '../../categories/category-api';
import { CurrencyPipe } from '@angular/common';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ConfirmDialog,
    DialogModule,
    InputTextModule,
    TableModule,
    ToastModule,
    ProductForm,
    CurrencyPipe,
    Tag,
  ],
  providers: [ConfirmationService],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private readonly api = inject(ProductApi);
  private readonly notifications = inject(NotificationService);
  private readonly confirmations = inject(ConfirmationService);

  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly search = signal('');
  readonly dialogVisible = signal(false);
  readonly selectedProduct = signal<Product | null>(null);
  private readonly categoryApi = inject(CategoryApi);

readonly categories = signal<Category[]>([]);
readonly LOW_STOCK_LIMIT = 20;

readonly lowStockCount = computed(
  () =>
    this.products().filter(
      (product) => product.stock <= this.LOW_STOCK_LIMIT,
    ).length,
);

readonly categoryName = computed(() => {
  const categoryMap = new Map(
    this.categories().map((category) => [
      category.id,
      category.name,
    ]),
  );

  return (id: number | null) =>
    id === null
      ? 'Sin categoría'
      : categoryMap.get(id) ?? `Categoría #${id}`;
});

  readonly filteredProducts = computed(() =>
    filterRows(this.products(), this.search(), (product) => [
      product.nombre,
      product.descripcion ?? '',
    ]),
  );

  constructor() {
    this.loadProducts();
  }

  // ISS-05 — Punto 5.4: cargar productos y categorías en paralelo.
loadProducts(): void {
  this.loading.set(true);
  this.error.set('');

  forkJoin({
    products: this.api.list(),
    categories: this.categoryApi.list(),
  }).subscribe({
    next: ({ products, categories }) => {
      this.products.set(products);
      this.categories.set(
        categories.filter((category) => category.is_active),
      );
      this.loading.set(false);
    },
    error: (error: HttpErrorResponse) => {
      this.products.set([]);
      this.categories.set([]);
      this.error.set(toApiMessage(error));
      this.loading.set(false);
    },
  });
}

  openCreate(): void {
    this.selectedProduct.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(product: Product): void {
    this.selectedProduct.set(product);
    this.dialogVisible.set(true);
  }

  saveProduct(payload: ProductPayload): void {
    this.saving.set(true);

    const request = this.selectedProduct()
      ? this.api.update(this.selectedProduct()!.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);
        this.notifications.success(
          this.selectedProduct()
            ? 'Producto actualizado correctamente.'
            : 'Producto creado correctamente.',
        );
        this.loadProducts();
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.notifications.error(toApiMessage(error));
      },
    });
  }

  deactivate(product: Product): void {
    this.confirmations.confirm({
      header: 'Desactivar producto',
      message: `¿Deseas desactivar el producto "${product.nombre}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.deactivate(product.id).subscribe({
          next: () => {
            this.notifications.success(
              'Producto desactivado correctamente.',
            );
            this.loadProducts();
          },
          error: (error: HttpErrorResponse) => {
            this.notifications.error(toApiMessage(error));
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
    this.selectedProduct.set(null);
  }
}