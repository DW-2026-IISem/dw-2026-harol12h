/**
 * Filtro local reutilizable para tablas PrimeNG 22.
 *
 * Recibe las filas, el texto de búsqueda y una función que indica
 * qué valores de cada fila deben buscarse.
 */
export function filterRows<T>(
  rows: readonly T[],
  query: string,
  pick: (row: T) => Array<string | number | null | undefined>,
): T[] {
  const term = query.trim().toLowerCase();

  // Si no hay búsqueda, devuelve una copia de las filas originales.
  if (!term) {
    return [...rows];
  }

  return rows.filter((row) =>
    pick(row).some((value) =>
      (value ?? '').toString().toLowerCase().includes(term),
    ),
  );
}
