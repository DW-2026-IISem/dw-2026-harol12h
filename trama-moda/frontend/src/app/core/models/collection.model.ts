import { Timestamps } from './api.model';

/** Colecciones de prendas. */
export interface Collection extends Timestamps {
  id: number;
  nombre: string;
  descripcion?: string;
  is_active: boolean;
}

export interface CollectionPayload {
  nombre: string;
  descripcion?: string;
  is_active: boolean;
}
