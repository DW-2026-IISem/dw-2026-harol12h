import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, ProductPayload } from '../../core/models/product.model';

/** Servicio HTTP para el módulo de productos de TramaModa. */
@Service()
export class ProductApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/productos`;

  list(): Observable<Product[]> {
    return this.http
      .get<{ products: Product[] }>(this.base)
      .pipe(map((response) => response.products));
  }

  get(id: number): Observable<Product> {
    return this.http
      .get<{ product: Product }>(`${this.base}/${id}`)
      .pipe(map((response) => response.product));
  }

  create(payload: ProductPayload): Observable<Product> {
    return this.http
      .post<{ product: Product }>(this.base, payload)
      .pipe(map((response) => response.product));
  }

  /** Actualiza el producto mediante PUT, según las rutas del backend. */
  update(id: number, payload: ProductPayload): Observable<Product> {
    return this.http
      .put<{ message?: string; product: Product }>(
        `${this.base}/${id}`,
        payload,
      )
      .pipe(map((response) => response.product));
  }

  /** Desactivación lógica mediante PATCH. */
  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }
}
