import { Status, Timestamps } from './api.model';

/** Relación entre recursos y roles. */
export interface ResourceRole extends Timestamps {
  id: number;
  role_id: number;
  resource_id: number;
  status: Status;
}

export interface ResourceRolePayload {
  role_id: number;
  resource_id: number;
  status?: Status;
}
