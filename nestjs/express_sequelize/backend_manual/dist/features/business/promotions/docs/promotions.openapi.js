export const promotionsOpenApi = {
    '/promotions': {
        post: {
            summary: 'Crear promoción',
            responses: { 201: { description: 'Promoción creada' } },
        },
        get: {
            summary: 'Listar promociones',
            responses: { 200: { description: 'Lista de promociones' } },
        },
    },
    '/promotions/{id}': {
        get: {
            summary: 'Obtener promoción por ID',
            responses: { 200: { description: 'Promoción encontrada' } },
        },
        patch: {
            summary: 'Actualizar promoción',
            responses: { 200: { description: 'Promoción actualizada' } },
        },
        delete: {
            summary: 'Eliminar promoción',
            responses: { 204: { description: 'Promoción eliminada' } },
        },
    },
};
//# sourceMappingURL=promotions.openapi.js.map