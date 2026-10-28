import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  SaleDetail,
  SaleDetailPayload,
} from '../../core/models/sale-detail.model';

@Service()
export class SaleDetailApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/detalles-venta`;

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

  create(payload: SaleDetailPayload): Observable<SaleDetail> {
    return this.http
      .post<{ detail: SaleDetail }>(this.base, payload)
      .pipe(map((response) => response.detail));
  }

  update(id: number, payload: SaleDetailPayload): Observable<SaleDetail> {
    return this.http
      .put<{ message?: string; detail: SaleDetail }>(
        `${this.base}/${id}`,
        payload,
      )
      .pipe(map((response) => response.detail));
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
