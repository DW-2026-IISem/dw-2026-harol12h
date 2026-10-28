import { Money, Timestamps } from './api.model';

/** Línea de detalle de una venta. */
export interface SaleDetail extends Timestamps {
  id: number;
  sale_id: number;
  product_id: number;
  cantidad: number;
  precio_unitario: Money;
  subtotal: Money;
}

export interface SaleDetailPayload {
  sale_id: number;
  product_id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}
