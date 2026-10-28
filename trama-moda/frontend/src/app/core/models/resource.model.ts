import { Status, Timestamps } from './api.model';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** Recurso protegido por el sistema de permisos. */
export interface Resource extends Timestamps {
  id: number;
  method: HttpMethod;
  path: string;
  description?: string | null;
  status: Status;
}

export interface ResourcePayload {
  method: HttpMethod;
  path: string;
  description?: string | null;
  status?: Status;
}
