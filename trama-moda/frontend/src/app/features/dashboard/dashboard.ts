import { CurrencyPipe, DatePipe } from '@angular/common';
import type { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import type { Category } from '../../core/models/category.model';
import type { Client } from '../../core/models/client.model';
import { toNumber } from '../../core/models/api.model';
import type { Product } from '../../core/models/product.model';
import type { Sale, SaleCatalogItem } from '../../core/models/sale.model';
import { toApiMessage } from '../../core/utils/api-error';
import { CategoryApi } from '../categories/category-api';
import { ClientApi } from '../clients/client-api';
import { ProductApi } from '../products/product-api';
import { SaleApi } from '../sales/sale-api';

const LOW_STOCK_THRESHOLD = 5;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule, CardModule, CurrencyPipe, DatePipe, TagModule],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly clientApi = inject(ClientApi);
  private readonly categoryApi = inject(CategoryApi);
  private readonly productApi = inject(ProductApi);
  private readonly saleApi = inject(SaleApi);
  private readonly router = inject(Router);

  readonly clients = signal<Client[]>([]);
  readonly categories = signal<Category[]>([]);
  readonly products = signal<Product[]>([]);
  readonly sales = signal<Sale[]>([]);
  readonly inventoryCatalog = signal<SaleCatalogItem[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  readonly lowStock = computed(() =>
    this.inventoryCatalog()
      .filter((item) => item.stock <= LOW_STOCK_THRESHOLD)
      .sort((left, right) => left.stock - right.stock),
  );

  readonly revenue = computed(() =>
    this.sales().reduce((sum, sale) => sum + toNumber(sale.monto_total), 0),
  );

  readonly latestSales = computed(() =>
    [...this.sales()]
      .sort(
        (left, right) =>
          new Date(right.fecha ?? 0).getTime() -
          new Date(left.fecha ?? 0).getTime(),
      )
      .slice(0, 5),
  );

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    forkJoin({
      clients: this.clientApi.list(),
      categories: this.categoryApi.list(),
      products: this.productApi.list(),
      sales: this.saleApi.list(),
      inventory: this.saleApi.catalog(),
    }).subscribe({
      next: ({ clients, categories, products, sales, inventory }) => {
        this.clients.set(clients.filter((client) => client.status === 'active'));
        this.categories.set(categories.filter((category) => category.is_active));
        this.products.set(products.filter((product) => product.status === 'active'));
        this.sales.set(sales.filter((sale) => sale.status === 'active'));
        this.inventoryCatalog.set(inventory);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.clients.set([]);
        this.categories.set([]);
        this.products.set([]);
        this.sales.set([]);
        this.inventoryCatalog.set([]);
        this.loading.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  total(sale: Sale): number {
    return toNumber(sale.monto_total);
  }

  openSales(): void {
    void this.router.navigateByUrl('/ventas');
  }

  openSaleDetails(): void {
    void this.router.navigateByUrl('/detalle-ventas');
  }
}
