import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Supplier,
  SupplierPayload,
} from '../../core/models/supplier.model';

@Service()
export class SupplierApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/proveedores`;

  list(): Observable<Supplier[]> {
    return this.http
      .get<{ suppliers: Supplier[] }>(this.base)
      .pipe(map((response) => response.suppliers));
  }

  get(id: number): Observable<Supplier> {
    return this.http
      .get<{ supplier: Supplier }>(`${this.base}/${id}`)
      .pipe(map((response) => response.supplier));
  }

  create(payload: SupplierPayload): Observable<Supplier> {
    return this.http
      .post<{ supplier: Supplier }>(this.base, payload)
      .pipe(map((response) => response.supplier));
  }

  update(id: number, payload: SupplierPayload): Observable<Supplier> {
    return this.http
      .put<{ message?: string; supplier: Supplier }>(
        `${this.base}/${id}`,
        payload,
      )
      .pipe(map((response) => response.supplier));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }
}
