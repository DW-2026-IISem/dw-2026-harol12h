/** Estados utilizados por las entidades del backend. */
export type Status = 'active' | 'inactive';

/** Los valores DECIMAL de Sequelize pueden recibirse como números o strings. */
export type Money = number | string;

/** Fechas devueltas por Sequelize con los nombres actuales del proyecto. */
export interface Timestamps {
  createdAt?: string;
  updatedAt?: string;
}

/** Convierte un valor monetario recibido de la API a número. */
export function toNumber(value: Money | null | undefined): number {
  if (value === null || value === undefined) {
    return 0;
  }

  return typeof value === 'number'
    ? value
    : Number.parseFloat(value) || 0;
}
