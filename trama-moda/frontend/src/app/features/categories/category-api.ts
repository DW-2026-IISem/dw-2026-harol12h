import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Category,
  CategoryPayload,
} from '../../core/models/category.model';

@Service()
export class CategoryApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/categorias`;

  list(): Observable<Category[]> {
    return this.http
      .get<{ categories: Category[] }>(this.base)
      .pipe(map((response) => response.categories));
  }

  get(id: number): Observable<Category> {
    return this.http
      .get<{ category: Category }>(`${this.base}/${id}`)
      .pipe(map((response) => response.category));
  }

  create(payload: CategoryPayload): Observable<Category> {
    return this.http
      .post<{ category: Category }>(this.base, payload)
      .pipe(map((response) => response.category));
  }

  update(id: number, payload: CategoryPayload): Observable<Category> {
    return this.http
      .put<{ message?: string; category: Category }>(
        `${this.base}/${id}`,
        payload,
      )
      .pipe(map((response) => response.category));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }
}
