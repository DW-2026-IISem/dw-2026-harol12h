import { Timestamps } from './api.model';

/** Sucursales de TramaModa. */
export interface Branch extends Timestamps {
  id: number;
  nombre: string;
  direccion?: string;
  telefono?: string;
  is_active: boolean;
}

export interface BranchPayload {
  nombre: string;
  direccion?: string;
  telefono?: string;
  is_active: boolean;
}
