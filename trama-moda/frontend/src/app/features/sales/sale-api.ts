import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Sale,
  SalePayload,
} from '../../core/models/sale.model';

@Service()
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

  create(payload: SalePayload): Observable<Sale> {
    return this.http
      .post<{ sale: Sale }>(this.base, payload)
      .pipe(map((response) => response.sale));
  }

  update(id: number, payload: SalePayload): Observable<Sale> {
    return this.http
      .put<{ message?: string; sale: Sale }>(
        `${this.base}/${id}`,
        payload,
      )
      .pipe(map((response) => response.sale));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }
}
