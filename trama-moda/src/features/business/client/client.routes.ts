import { Application } from "express";
import { ClientController } from "./client.controller";
import { checkRole, verifyToken } from "../../../middlewares/auth.middleware";

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
 *         first_name:
 *           type: string
 *           example: "Juan"
 *         last_name:
 *           type: string
 *           example: "Pérez"
 *         email:
 *           type: string
 *           example: "juan.perez@email.com"
 *         phone:
 *           type: string
 *           example: "+573009876543"
 *         document_number:
 *           type: string
 *           example: "1020304050"
 *         is_active:
 *           type: boolean
 *           example: true
 *     ClientInput:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - document_number
 *       properties:
 *         first_name:
 *           type: string
 *           example: "Juan"
 *         last_name:
 *           type: string
 *           example: "Pérez"
 *         email:
 *           type: string
 *           example: "juan.perez@email.com"
 *         phone:
 *           type: string
 *           example: "+573009876543"
 *         document_number:
 *           type: string
 *           example: "1020304050"
 */
export class ClientRoutes {
  public clientController: ClientController = new ClientController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/clientes:
     *   get:
     *     summary: Obtener todos los clientes activos (Requiere Token)
     *     tags: [Clients]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de clientes
     *       401:
     *         description: No autorizado
     *   post:
     *     summary: Registrar un nuevo cliente (Requiere Token)
     *     tags: [Clients]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ClientInput'
     *     responses:
     *       201:
     *         description: Cliente registrado exitosamente
     *       401:
     *         description: No autorizado
     */
    app
      .route("/api/clientes")
      .get(verifyToken, this.clientController.getAll.bind(this.clientController))
      .post(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.clientController.create.bind(this.clientController));

    /**
     * @openapi
     * /api/clientes/{id}:
     *   get:
     *     summary: Obtener cliente por ID (Requiere Token)
     *     tags: [Clients]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Cliente encontrado
     *       401:
     *         description: No autorizado
     *       404:
     *         description: No encontrado
     *   put:
     *     summary: Actualizar información de un cliente (Requiere Token)
     *     tags: [Clients]
     *     security:
     *       - bearerAuth: []
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
     *         description: Cliente actualizado
     *       401:
     *         description: No autorizado
     */
    app
      .route("/api/clientes/:id")
      .get(verifyToken, this.clientController.getOne.bind(this.clientController))
      .put(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.clientController.update.bind(this.clientController))
      .delete(verifyToken, checkRole(["ADMINISTRADOR"]), this.clientController.deleteLogical.bind(this.clientController));

    /**
     * @openapi
     * /api/clientes/{id}/deactivate:
     *   patch:
     *     summary: Desactivar cliente (borrado lógico) (Requiere Token)
     *     tags: [Clients]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Cliente desactivado
     *       401:
     *         description: No autorizado
     */
    app
      .route("/api/clientes/:id/deactivate")
      .delete(verifyToken, checkRole(["ADMINISTRADOR"]), this.clientController.deleteLogical.bind(this.clientController))
      .patch(verifyToken, checkRole(["ADMINISTRADOR"]), this.clientController.deleteLogical.bind(this.clientController));
  }
}
