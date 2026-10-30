import { Money, Status, Timestamps } from './api.model';

/** Producto según el modelo Product de Sequelize. */
export interface Product extends Timestamps {
  id: number;
  nombre: string;
  descripcion?: string | null;
  precio: Money;
  stock: number;
  category_id: number | null;
  supplier_id: number | null;
  status: Status;
}

export interface ProductPayload {
  nombre: string;
  descripcion?: string | null;
  precio: number;
  stock: number;
  category_id?: number | null;
  supplier_id?: number | null;
  status?: Status;
}