export const paymentsOpenApi = {
  '/payments': {
    post: {
      summary: 'Crear pago',
      responses: { 201: { description: 'Pago creado' } },
    },
    get: {
      summary: 'Listar pagos',
      responses: { 200: { description: 'Lista de pagos' } },
    },
  },
  '/payments/{id}': {
    get: {
      summary: 'Obtener pago por ID',
      responses: { 200: { description: 'Pago encontrado' } },
    },
    patch: {
      summary: 'Actualizar pago',
      responses: { 200: { description: 'Pago actualizado' } },
    },
    delete: {
      summary: 'Eliminar pago',
      responses: { 204: { description: 'Pago eliminado' } },
    },
  },
};
