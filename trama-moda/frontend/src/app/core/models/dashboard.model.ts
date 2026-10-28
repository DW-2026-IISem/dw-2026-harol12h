import { Money } from './api.model';

/**
 * Modelo de presentación para el panel.
 * No representa un endpoint existente: sus datos deben calcularse
 * a partir de las respuestas reales de la API o de un endpoint futuro.
 */
export interface Dashboard {
  totalProductos: number;
  totalClientes: number;
  totalVentas: number;
  valorVentas: Money;
  productosConBajoStock: number;
}
