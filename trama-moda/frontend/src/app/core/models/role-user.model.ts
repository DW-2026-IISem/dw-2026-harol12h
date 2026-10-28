import { Status, Timestamps } from './api.model';

/** Relación entre usuarios y roles. */
export interface RoleUser extends Timestamps {
  id: number;
  user_id: number;
  role_id: number;
  status: Status;
}

export interface RoleUserPayload {
  user_id: number;
  role_id: number;
  status?: Status;
}
