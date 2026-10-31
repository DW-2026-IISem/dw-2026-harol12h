import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type {
  Sale,
  SaleCatalogItem,
  SaleCreatePayload,
  SalePayload,
  SaleTotals,
} from '../../core/models/sale.model';
import type { SaleDetail } from '../../core/models/sale-detail.model';

@Injectable({ providedIn: 'root' })
export class SaleApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/ventas`;

  list(): Observable<Sale[]> {
    return this.http
      .get<{ sales: Sale[] }>(this.base)
      .pipe(map((response) => response.sales));
  }

  get(id: number): Observable<Sale> {
    return this.http
      .get<{ sale: Sale }>(`${this.base}/${id}`)
      .pipe(map((response) => response.sale));
  }

  catalog(): Observable<SaleCatalogItem[]> {
    return this.http
      .get<{ items: SaleCatalogItem[] }>(`${this.base}/catalogo`)
      .pipe(map((response) => response.items));
  }

  create(payload: SaleCreatePayload): Observable<Sale> {
    return this.http
      .post<{
        sale: Sale;
        details: SaleDetail[];
        totals: SaleTotals;
      }>(this.base, payload)
      .pipe(
        map(({ sale, details, totals }) => ({ ...sale, details, totals })),
      );
  }

  update(id: number, payload: Pick<SalePayload, 'client_id'>): Observable<Sale> {
    return this.http
      .put<{ message?: string; sale: Sale }>(`${this.base}/${id}`, payload)
      .pipe(map((response) => response.sale));
  }

  /** DELETE lógico: desactiva la venta sin modificar sus detalles históricos. */
  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
