import { Application } from "express";
import { ClientController } from "./client.controller";

/**
 * @openapi
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Carlos Gómez"
 *         numero_documento:
 *           type: string
 *           example: "1098765432"
 *         email:
 *           type: string
 *           example: "carlos@email.com"
 *         telefono:
 *           type: string
 *           example: "3001234567"
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: active
 *     ClientInput:
 *       type: object
 *       required:
 *         - nombre
 *         - numero_documento
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Carlos Gómez"
 *         numero_documento:
 *           type: string
 *           example: "1098765432"
 *         email:
 *           type: string
 *           example: "carlos@email.com"
 *         telefono:
 *           type: string
 *           example: "3001234567"
 */

export class ClientRoutes {
  public clientController: ClientController = new ClientController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/clientes:
     *   get:
     *     summary: Obtener todos los clientes activos
     *     tags: [Clients]
     *     responses:
     *       200:
     *         description: Lista de clientes obtenida con éxito
     *   post:
     *     summary: Crear un nuevo cliente
     *     tags: [Clients]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ClientInput'
     *     responses:
     *       201:
     *         description: Cliente creado exitosamente
     */
    app
      .route("/api/clientes")
      .get(this.clientController.getAll.bind(this.clientController))
      .post(this.clientController.create.bind(this.clientController));

    /**
     * @openapi
     * /api/clientes/{id}:
     *   get:
     *     summary: Obtener un cliente por ID
     *     tags: [Clients]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Cliente encontrado
     *       404:
     *         description: Cliente no encontrado
     *   put:
     *     summary: Actualizar datos de un cliente
     *     tags: [Clients]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ClientInput'
     *     responses:
     *       200:
     *         description: Cliente actualizado exitosamente
     */
    app
      .route("/api/clientes/:id")
      .get(this.clientController.getOne.bind(this.clientController))
      .put(this.clientController.update.bind(this.clientController));

    /**
     * @openapi
     * /api/clientes/{id}/deactivate:
     *   patch:
     *     summary: Desactivar (eliminación lógica) un cliente
     *     tags: [Clients]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Cliente desactivado con éxito
     */
    app
      .route("/api/clientes/:id/deactivate")
      .patch(this.clientController.deleteLogical.bind(this.clientController));
  }
}
