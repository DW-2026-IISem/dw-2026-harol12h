import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Status } from '../../../core/models/api.model';
import { RoleUser } from '../../../core/models/role-user.model';

export interface RoleUserAssignment {
  id: number;
  userId: number;
  roleId: number;
  status: Status;
}

export interface RoleUserListItem extends RoleUser {
  user?: {
    id: number;
    username: string;
    email: string;
    status: Status;
  };
  role?: {
    id: number;
    name: string;
    status: Status;
  };
}

export interface CreateRoleUserPayload {
  userId: number;
  roleId: number;
}

@Service()
export class RoleUserApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin/role-users`;

  list(userId?: number): Observable<RoleUserListItem[]> {
    return this.http
      .get<{ assignments: RoleUserListItem[] }>(this.base, {
        params: userId !== undefined ? { userId } : {},
      })
      .pipe(map((response) => response.assignments));
  }

  create(payload: CreateRoleUserPayload): Observable<RoleUserAssignment> {
    return this.http
      .post<{ assignment: RoleUserAssignment }>(this.base, payload)
      .pipe(map((response) => response.assignment));
  }
}