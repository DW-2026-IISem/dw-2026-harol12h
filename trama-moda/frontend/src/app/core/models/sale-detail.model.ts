import { Money, Status, Timestamps } from './api.model';

/** Línea de detalle de una venta. */
export interface SaleDetail extends Timestamps {
  id: number;
  sale_id: number;
  product_id: number;
  variantId?: number | null;
  branchId?: number | null;
  cantidad: number;
  precio_unitario: Money;
  subtotal: Money;
  status: Status;
  product?: { id: number; nombre: string; precio: Money };
  variant?: { id: number; nombre: string };
  branch?: { id: number; nombre: string };
  sale?: {
    id: number;
    client_id: number;
    fecha?: string;
    monto_total: Money;
    status: Status;
    client?: { id: number; nombre: string };
  };
}

export interface SaleDetailCreatePayload {
  sale_id: number;
  variantId: number;
  branchId: number;
  quantity: number;
}

export interface SaleDetailQuantityPayload {
  quantity: number;
}
