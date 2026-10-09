export const bearerSecurityScheme = {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "Access token JWT obtenido en `POST /api/sesion/login`. Enviar como `Authorization: Bearer <access_token>`.",
  },
};

export const openSecurity: unknown[] = [];
export const bearerSecurity = [{ bearerAuth: [] }];

export const unauthorizedResponse = {
  description: "401 No autenticado — falta token, es inválido/expiró o usuario inactivo",
};

export const forbiddenResponse = {
  description: "403 Prohibido — autenticado, pero sin concesión activa para esta operación",
};

export const invalidIdResponse = {
  description: "400 id inválido (debe ser un entero positivo)",
};

export const notFoundResponse = {
  description: "404 No encontrado",
};
