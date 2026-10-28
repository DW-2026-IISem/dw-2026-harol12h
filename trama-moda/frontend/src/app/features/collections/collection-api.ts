import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Collection,
  CollectionPayload,
} from '../../core/models/collection.model';

@Service()
export class CollectionApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/colecciones`;

  list(): Observable<Collection[]> {
    return this.http
      .get<{ collections: Collection[] }>(this.base)
      .pipe(map((response) => response.collections));
  }

  get(id: number): Observable<Collection> {
    return this.http
      .get<{ collection: Collection }>(`${this.base}/${id}`)
      .pipe(map((response) => response.collection));
  }

  create(payload: CollectionPayload): Observable<Collection> {
    return this.http
      .post<{ collection: Collection }>(this.base, payload)
      .pipe(map((response) => response.collection));
  }

  update(id: number, payload: CollectionPayload): Observable<Collection> {
    return this.http
      .put<{ message?: string; collection: Collection }>(
        `${this.base}/${id}`,
        payload,
      )
      .pipe(map((response) => response.collection));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }
}
