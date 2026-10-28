import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Role,
  RolePayload,
} from '../../../core/models/role.model';

@Service()
export class RoleApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin/roles`;

  list(): Observable<Role[]> {
    return this.http
      .get<{ roles: Role[] }>(this.base)
      .pipe(map((response) => response.roles));
  }

  get(id: number): Observable<Role> {
    return this.http
      .get<{ role: Role }>(`${this.base}/${id}`)
      .pipe(map((response) => response.role));
  }

  create(payload: RolePayload): Observable<Role> {
    return this.http
      .post<{ role: Role }>(this.base, payload)
      .pipe(map((response) => response.role));
  }

  update(id: number, payload: RolePayload): Observable<Role> {
    return this.http
      .put<{ role: Role }>(`${this.base}/${id}`, payload)
      .pipe(map((response) => response.role));
  }

  updateStatus(id: number, status: Role['status']): Observable<Role> {
    return this.http
      .patch<{ role: Role }>(`${this.base}/${id}/status`, { status })
      .pipe(map((response) => response.role));
  }

  replaceResources(id: number, resourceIds: number[]): Observable<unknown> {
    return this.http.put(`${this.base}/${id}/resources`, {
      resource_ids: resourceIds,
    });
  }
}
