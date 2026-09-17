export const returnDetailsOpenApi = {
  '/return-details': {
    post: {
      summary: 'Crear detalle de devolución',
      responses: { 201: { description: 'Detalle creado' } },
    },
    get: {
      summary: 'Listar detalles de devolución',
      responses: { 200: { description: 'Lista de detalles' } },
    },
  },
  '/return-details/{id}': {
    get: {
      summary: 'Obtener detalle por ID',
      responses: { 200: { description: 'Detalle encontrado' } },
    },
    patch: {
      summary: 'Actualizar detalle de devolución',
      responses: { 200: { description: 'Detalle actualizado' } },
    },
    delete: {
      summary: 'Eliminar detalle de devolución',
      responses: { 204: { description: 'Detalle eliminado' } },
    },
  },
};
