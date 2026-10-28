import { Timestamps } from './api.model';

/** Inventario por sucursal y variante. */
export interface Inventory extends Timestamps {
  id: number;
  branchId: number;
  variantId: number;
  stock: number;
  is_active: boolean;
}

export interface InventoryPayload {
  branchId: number;
  variantId: number;
  stock: number;
  is_active: boolean;
}
