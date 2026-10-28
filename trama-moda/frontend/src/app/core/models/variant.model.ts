import { Timestamps } from './api.model';

/** Variante comercial de un producto. */
export interface Variant extends Timestamps {
  id: number;
  nombre: string;
  descripcion?: string;
  is_active: boolean;
}

export interface VariantPayload {
  nombre: string;
  descripcion?: string;
  is_active: boolean;
}
