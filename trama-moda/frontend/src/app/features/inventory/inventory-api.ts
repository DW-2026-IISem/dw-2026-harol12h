import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Inventory,
  InventoryPayload,
} from '../../core/models/inventory.model';

@Service()
export class InventoryApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/inventarios`;

  list(): Observable<Inventory[]> {
    return this.http
      .get<{ inventories: Inventory[] }>(this.base)
      .pipe(map((response) => response.inventories));
  }

  get(id: number): Observable<Inventory> {
    return this.http
      .get<{ inventory: Inventory }>(`${this.base}/${id}`)
      .pipe(map((response) => response.inventory));
  }

  create(payload: InventoryPayload): Observable<Inventory> {
    return this.http
      .post<{ inventory: Inventory }>(this.base, payload)
      .pipe(map((response) => response.inventory));
  }

  update(id: number, payload: InventoryPayload): Observable<Inventory> {
    return this.http
      .put<{ message?: string; inventory: Inventory }>(
        `${this.base}/${id}`,
        payload,
      )
      .pipe(map((response) => response.inventory));
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
