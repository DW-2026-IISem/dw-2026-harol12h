import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Branch,
  BranchPayload,
} from '../../core/models/branch.model';

@Service()
export class BranchApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/sucursales`;

  list(): Observable<Branch[]> {
    return this.http
      .get<{ branches: Branch[] }>(this.base)
      .pipe(map((response) => response.branches));
  }

  get(id: number): Observable<Branch> {
    return this.http
      .get<{ branch: Branch }>(`${this.base}/${id}`)
      .pipe(map((response) => response.branch));
  }

  create(payload: BranchPayload): Observable<Branch> {
    return this.http
      .post<{ branch: Branch }>(this.base, payload)
      .pipe(map((response) => response.branch));
  }

  update(id: number, payload: BranchPayload): Observable<Branch> {
    return this.http
      .put<{ message?: string; branch: Branch }>(
        `${this.base}/${id}`,
        payload,
      )
      .pipe(map((response) => response.branch));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }
}
