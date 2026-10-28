import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Status } from '../../../core/models/api.model';
import {
  ResourceRole,
  ResourceRolePayload,
} from '../../../core/models/resource-role.model';

interface ResourceRoleGrant {
  id: number;
  roleId: number;
  resourceId: number;
  status: Status;
}

interface ResourceRoleListItem extends ResourceRole {
  role?: {
    id: number;
    name: string;
    status: Status;
  };
  resource?: {
    id: number;
    method: string;
    path: string;
    status: Status;
  };
}

@Service()
export class ResourceRoleApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin/resource-roles`;

  list(filters?: {
    roleId?: number;
    resourceId?: number;
  }): Observable<ResourceRoleListItem[]> {
    return this.http
      .get<{ grants: ResourceRoleListItem[] }>(this.base, {
        params: {
          ...(filters?.roleId !== undefined
            ? { roleId: filters.roleId }
            : {}),
          ...(filters?.resourceId !== undefined
            ? { resourceId: filters.resourceId }
            : {}),
        },
      })
      .pipe(map((response) => response.grants));
  }

  create(payload: ResourceRolePayload): Observable<ResourceRoleGrant> {
    return this.http
      .post<{ grant: ResourceRoleGrant }>(this.base, {
        roleId: payload.role_id,
        resourceId: payload.resource_id,
      })
      .pipe(map((response) => response.grant));
  }

  updateStatus(
    id: number,
    status: Status,
  ): Observable<{ id: number; status: Status }> {
    return this.http
      .patch<{ grant: { id: number; status: Status } }>(
        `${this.base}/${id}/status`,
        { status },
      )
      .pipe(map((response) => response.grant));
  }
}
