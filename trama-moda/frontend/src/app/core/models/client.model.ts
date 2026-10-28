import { Status, Timestamps } from './api.model';

/** Cliente de TramaModa. */
export interface Client extends Timestamps {
  id: number;
  tipo_documento: string;
  numero_documento: string;
  nombre: string;
  telefono?: string | null;
  email?: string | null;
  status: Status;
}

export interface ClientPayload {
  tipo_documento: string;
  numero_documento: string;
  nombre: string;
  telefono?: string | null;
  email?: string | null;
  status?: Status;
}
