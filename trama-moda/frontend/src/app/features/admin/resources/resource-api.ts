import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Resource,
  ResourcePayload,
} from '../../../core/models/resource.model';

@Service()
export class ResourceApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin/resources`;

  list(): Observable<Resource[]> {
    return this.http
      .get<{ resources: Resource[] }>(this.base)
      .pipe(map((response) => response.resources));
  }

  get(id: number): Observable<Resource> {
    return this.http
      .get<{ resource: Resource }>(`${this.base}/${id}`)
      .pipe(map((response) => response.resource));
  }

  create(payload: ResourcePayload): Observable<Resource> {
    return this.http
      .post<{ resource: Resource }>(this.base, payload)
      .pipe(map((response) => response.resource));
  }

  update(id: number, payload: ResourcePayload): Observable<Resource> {
    return this.http
      .put<{ resource: Resource }>(`${this.base}/${id}`, payload)
      .pipe(map((response) => response.resource));
  }

  updateStatus(
    id: number,
    status: Resource['status'],
  ): Observable<Resource> {
    return this.http
      .patch<{ resource: Resource }>(`${this.base}/${id}/status`, {
        status,
      })
      .pipe(map((response) => response.resource));
  }
}
