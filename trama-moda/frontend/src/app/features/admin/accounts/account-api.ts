import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Status } from '../../../core/models/api.model';
import { User } from '../../../core/models/user.model';

export interface AuthAccount extends User {
  role_users?: Array<{
    id: number;
    status: Status;
    role?: {
      id: number;
      name: string;
      status: Status;
    };
  }>;
}

export interface CreateAccountPayload {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateAccountPayload {
  username: string;
  email: string;
}

export interface CreatedAccount {
  user: User;
  role: {
    id: number;
    name: string;
  };
}

@Service()
export class AccountApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin/accounts`;

  list(): Observable<AuthAccount[]> {
    return this.http
      .get<{ users: AuthAccount[] }>(this.base)
      .pipe(map((response) => response.users));
  }

  get(id: number): Observable<User> {
    return this.http
      .get<{ user: User }>(`${this.base}/${id}`)
      .pipe(map((response) => response.user));
  }

  create(payload: CreateAccountPayload): Observable<CreatedAccount> {
    return this.http.post<CreatedAccount>(this.base, payload);
  }

  update(
    id: number,
    payload: UpdateAccountPayload,
  ): Observable<User> {
    return this.http
      .put<{ user: User }>(`${this.base}/${id}`, payload)
      .pipe(map((response) => response.user));
  }

  changePassword(
    id: number,
    payload: { password: string },
  ): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/password`, payload);
  }

  updateStatus(id: number, status: Status): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/status`, { status });
  }

  assignRole(id: number, roleId: number): Observable<unknown> {
    return this.http.post(`${this.base}/${id}/roles`, { roleId });
  }

  revokeRole(id: number, roleId: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}/roles/${roleId}`);
  }
}
