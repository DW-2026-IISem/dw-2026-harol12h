
import { Money, Status, Timestamps } from './api.model';
import { SaleDetail } from './sale-detail.model';
import { Client } from './client.model';

export interface Sale extends Timestamps {
  id: number;
  client_id: number;
  fecha?: string;
  monto_total: Money;
  status: Status;

  // Asociaciones devueltas por el backend.
  client?: Client;
  details?: SaleDetail[];
  totals?: SaleTotals;
}

export interface SaleTotals {
  subtotal: number;
  taxRate: number;
  tax: number;
  discounts: number;
  total: number;
}

export interface SaleCreateItem {
  variantId: number;
  branchId: number;
  quantity: number;
}

export interface SaleCreatePayload {
  client_id: number;
  tax: number;
  discounts: number;
  items: SaleCreateItem[];
}

export interface SaleCatalogItem {
  variantId: number;
  branchId: number;
  stock: number;
  available: boolean;
  variant: {
    id: number;
    nombre: string;
  };
  branch: {
    id: number;
    nombre: string;
  };
  product: {
    id: number;
    nombre: string;
    precio: Money;
  } | null;
}

export interface SalePayload {
  client_id: number;
  fecha?: string;
  monto_total: number;
  status?: Status;
}
