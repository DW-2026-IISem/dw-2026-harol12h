import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Client, ClientPayload } from '../../core/models/client.model';

/** Contrato exacto de `features/business/client` en Express. */
@Service()
export class ClientApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/clientes`;

  list(): Observable<Client[]> {
    return this.http
      .get<{ clients: Client[] }>(this.base)
      .pipe(map((response) => response.clients));
  }

  get(id: number): Observable<Client> {
    return this.http
      .get<{ client: Client }>(`${this.base}/${id}`)
      .pipe(map((response) => response.client));
  }

  create(payload: ClientPayload): Observable<Client> {
    return this.http
      .post<{ client: Client }>(this.base, payload)
      .pipe(map((response) => response.client));
  }

  /** PUT /api/clientes/:id — reemplazo completo. */
  replace(id: number, payload: ClientPayload): Observable<Client> {
    return this.http
      .put<{ client: Client }>(`${this.base}/${id}`, payload)
      .pipe(map((response) => response.client));
  }

  /** Baja lógica: status = inactive. */
  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  /** Baja física: DELETE. */
  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
