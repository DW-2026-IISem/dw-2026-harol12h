import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type {
  SaleDetail,
  SaleDetailCreatePayload,
  SaleDetailQuantityPayload,
} from '../../core/models/sale-detail.model';

@Service()
export class SaleDetailApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/detalle-ventas`;

  list(): Observable<SaleDetail[]> {
    return this.http
      .get<{ details: SaleDetail[] }>(this.base)
      .pipe(map((response) => response.details));
  }

  get(id: number): Observable<SaleDetail> {
    return this.http
      .get<{ detail: SaleDetail }>(`${this.base}/${id}`)
      .pipe(map((response) => response.detail));
  }

  create(payload: SaleDetailCreatePayload): Observable<SaleDetail> {
    return this.http
      .post<{ detail: SaleDetail }>(this.base, payload)
      .pipe(map((response) => response.detail));
  }

  update(id: number, payload: SaleDetailQuantityPayload): Observable<SaleDetail> {
    return this.http
      .patch<{ detail: SaleDetail }>(
        `${this.base}/${id}`,
        payload,
      )
      .pipe(map((response) => response.detail));
  }

  deactivate(id: number): Observable<SaleDetail> {
    return this.http
      .patch<{ detail: SaleDetail }>(`${this.base}/${id}/deactivate`, {})
      .pipe(map((response) => response.detail));
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
