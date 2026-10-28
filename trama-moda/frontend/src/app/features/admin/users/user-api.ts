import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  User,
  UserPayload,
} from '../../../core/models/user.model';

@Service()
export class UserApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/usuarios`;

  list(): Observable<User[]> {
    return this.http
      .get<{ users: User[] }>(this.base)
      .pipe(map((response) => response.users));
  }

  get(id: number): Observable<User> {
    return this.http
      .get<{ user: User }>(`${this.base}/${id}`)
      .pipe(map((response) => response.user));
  }

  create(payload: UserPayload): Observable<User> {
    return this.http
      .post<{ user: User }>(this.base, payload)
      .pipe(map((response) => response.user));
  }

  update(id: number, payload: UserPayload): Observable<User> {
    return this.http
      .put<{ message?: string; user: User }>(
        `${this.base}/${id}`,
        payload,
      )
      .pipe(map((response) => response.user));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }
}
