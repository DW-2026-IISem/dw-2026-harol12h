import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Variant,
  VariantPayload,
} from '../../core/models/variant.model';

@Service()
export class VariantApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/variantes`;

  list(): Observable<Variant[]> {
    return this.http
      .get<{ variants: Variant[] }>(this.base)
      .pipe(map((response) => response.variants));
  }

  get(id: number): Observable<Variant> {
    return this.http
      .get<{ variant: Variant }>(`${this.base}/${id}`)
      .pipe(map((response) => response.variant));
  }

  create(payload: VariantPayload): Observable<Variant> {
    return this.http
      .post<{ variant: Variant }>(this.base, payload)
      .pipe(map((response) => response.variant));
  }

  update(id: number, payload: VariantPayload): Observable<Variant> {
    return this.http
      .put<{ message?: string; variant: Variant }>(
        `${this.base}/${id}`,
        payload,
      )
      .pipe(map((response) => response.variant));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }
}
