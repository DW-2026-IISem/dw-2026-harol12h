import { Application } from "express";
import { BranchController } from "./branch.controller";
import { checkRole, verifyToken } from "../../../middlewares/auth.middleware";

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Sucursal Centro Principal"
 *         direccion:
 *           type: string
 *           example: "Calle Principal # 45 - 12"
 *         telefono:
 *           type: string
 *           example: "3001234567"
 *         is_active:
 *           type: boolean
 *           example: true
 *     BranchInput:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Sucursal Centro Principal"
 *         direccion:
 *           type: string
 *           example: "Calle Principal # 45 - 12"
 *         telefono:
 *           type: string
 *           example: "3001234567"
 */

export class BranchRoutes {
  public branchController: BranchController = new BranchController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/sucursales:
     *   get:
     *     summary: Obtener todas las sucursales activas
     *     tags: [Branches]
     *     responses:
     *       200:
     *         description: Lista de sucursales
     *   post:
     *     summary: Crear una nueva sucursal
     *     tags: [Branches]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/BranchInput'
     *     responses:
     *       201:
     *         description: Sucursal creada exitosamente
     */
    app
      .route("/api/sucursales")
      .get(verifyToken, this.branchController.getAll.bind(this.branchController))
      .post(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.branchController.create.bind(this.branchController));

    /**
     * @openapi
     * /api/sucursales/{id}:
     *   get:
     *     summary: Obtener sucursal por ID
     *     tags: [Branches]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Sucursal encontrada
     *       404:
     *         description: Sucursal no encontrada
     *   put:
     *     summary: Actualizar sucursal por ID
     *     tags: [Branches]
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
     *             $ref: '#/components/schemas/BranchInput'
     *     responses:
     *       200:
     *         description: Sucursal actualizada
     */
    app
      .route("/api/sucursales/:id")
      .get(verifyToken, this.branchController.getOne.bind(this.branchController))
      .put(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.branchController.update.bind(this.branchController))
      .delete(verifyToken, checkRole(["ADMINISTRADOR"]), this.branchController.deleteLogical.bind(this.branchController));

    /**
     * @openapi
     * /api/sucursales/{id}/deactivate:
     *   patch:
     *     summary: Desactivar sucursal (borrado lógico)
     *     tags: [Branches]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Sucursal desactivada
     */
    app
      .route("/api/sucursales/:id/deactivate")
      .delete(verifyToken, checkRole(["ADMINISTRADOR"]), this.branchController.deleteLogical.bind(this.branchController))
      .patch(verifyToken, checkRole(["ADMINISTRADOR"]), this.branchController.deleteLogical.bind(this.branchController));
  }
}
