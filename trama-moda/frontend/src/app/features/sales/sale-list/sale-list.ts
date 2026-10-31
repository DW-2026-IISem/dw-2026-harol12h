import { CurrencyPipe, DatePipe } from '@angular/common';
import type { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

import { toNumber } from '../../../core/models/api.model';
import type { Sale } from '../../../core/models/sale.model';
import { toApiMessage } from '../../../core/utils/api-error';
import { SaleApi } from '../sale-api';
import { SaleDetail as SaleDetailView } from '../sale-detail/sale-detail';

@Component({
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CurrencyPipe,
    DatePipe,
    DialogModule,
    SaleDetailView,
    TableModule,
    TagModule,
    ToastModule,
  ],
  selector: 'app-sale-list',
  styleUrl: './sale-list.css',
  templateUrl: './sale-list.html',
})
export class SaleList {
  private readonly saleApi = inject(SaleApi);
  private readonly router = inject(Router);

  readonly sales = signal<Sale[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly selectedSale = signal<Sale | null>(null);

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.saleApi.list().subscribe({
      next: (sales) => {
        this.sales.set(sales);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.sales.set([]);
        this.loading.set(false);
        this.error.set(toApiMessage(error));
      },
    });
  }

  newSale(): void {
    void this.router.navigateByUrl('/ventas/nueva');
  }

  viewDetails(sale: Sale): void {
    this.selectedSale.set(sale);
  }

  closeDetails(): void {
    this.selectedSale.set(null);
  }

  total(sale: Sale): number {
    return toNumber(sale.monto_total);
  }

  lineCount(sale: Sale): number {
    return sale.details?.length ?? 0;
  }

  unitCount(sale: Sale): number {
    return sale.details?.reduce((sum, detail) => sum + detail.cantidad, 0) ?? 0;
  }
}
