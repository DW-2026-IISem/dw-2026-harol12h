import { Timestamps } from './api.model';

/** Proveedores de prendas y productos. */
export interface Supplier extends Timestamps {
  id: number;
  name: string;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  is_active: boolean;
}

export interface SupplierPayload {
  name: string;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  is_active?: boolean;
}
