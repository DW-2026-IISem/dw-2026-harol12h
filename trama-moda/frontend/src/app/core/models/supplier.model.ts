import { Timestamps } from './api.model';

/** Proveedores de prendas y productos. */
export interface Supplier extends Timestamps {
  id: number;
  name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  is_active: boolean;
}

export interface SupplierPayload {
  name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  is_active: boolean;
}
