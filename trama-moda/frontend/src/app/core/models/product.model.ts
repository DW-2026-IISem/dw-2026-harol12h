import { Money, Status, Timestamps } from './api.model';

/** Producto según el modelo Product de Sequelize. */
export interface Product extends Timestamps {
  id: number;
  nombre: string;
  precio: Money;
  stock: number;
  status: Status;
}

export interface ProductPayload {
  nombre: string;
  precio: number;
  stock: number;
  status?: Status;
}
