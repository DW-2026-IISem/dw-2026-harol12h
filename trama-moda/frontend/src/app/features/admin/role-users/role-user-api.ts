import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  RoleUser,
  RoleUserPayload,
} from '../../../core/models/role-user.model';

@Service()
export class RoleUserApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin/role-users`;

  list(): Observable<RoleUser[]> {
    return this.http
      .get<{ roleUsers: RoleUser[] }>(this.base)
      .pipe(map((response) => response.roleUsers));
  }

  create(payload: RoleUserPayload): Observable<RoleUser> {
    return this.http
      .post<{ roleUser: RoleUser }>(this.base, payload)
      .pipe(map((response) => response.roleUser));
  }
}
