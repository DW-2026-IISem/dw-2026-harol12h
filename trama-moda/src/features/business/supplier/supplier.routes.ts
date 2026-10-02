import { Application } from "express";
import { SupplierController } from "./supplier.controller";

/**
 * @openapi
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Textiles del Norte S.A."
 *         contact_name:
 *           type: string
 *           example: "Carlos Gómez"
 *         email:
 *           type: string
 *           example: "contacto@textilesnorte.com"
 *         phone:
 *           type: string
 *           example: "+573001234567"
 *         address:
 *           type: string
 *           example: "Calle 45 # 12-34, Medellín"
 *         is_active:
 *           type: boolean
 *           example: true
 *     SupplierInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Textiles del Norte S.A."
 *         contact_name:
 *           type: string
 *           example: "Carlos Gómez"
 *         email:
 *           type: string
 *           example: "contacto@textilesnorte.com"
 *         phone:
 *           type: string
 *           example: "+573001234567"
 *         address:
 *           type: string
 *           example: "Calle 45 # 12-34, Medellín"
 */
export class SupplierRoutes {
  public supplierController: SupplierController = new SupplierController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/proveedores:
     *   get:
     *     summary: Obtener todos los proveedores activos
     *     tags: [Suppliers]
     *     responses:
     *       200:
     *         description: Lista de proveedores
     *   post:
     *     summary: Registrar un nuevo proveedor
     *     tags: [Suppliers]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SupplierInput'
     *     responses:
     *       201:
     *         description: Proveedor registrado exitosamente
     */
    app
      .route("/api/proveedores")
      .get(this.supplierController.getAll.bind(this.supplierController))
      .post(this.supplierController.create.bind(this.supplierController));

    /**
     * @openapi
     * /api/proveedores/{id}:
     *   get:
     *     summary: Obtener proveedor por ID
     *     tags: [Suppliers]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Proveedor encontrado
     *       404:
     *         description: No encontrado
     *   put:
     *     summary: Actualizar información de un proveedor
     *     tags: [Suppliers]
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
     *             $ref: '#/components/schemas/SupplierInput'
     *     responses:
     *       200:
     *         description: Proveedor actualizado
     */
    app
      .route("/api/proveedores/:id")
      .get(this.supplierController.getOne.bind(this.supplierController))
      .put(this.supplierController.update.bind(this.supplierController));

    /**
     * @openapi
     * /api/proveedores/{id}/deactivate:
     *   patch:
     *     summary: Desactivar proveedor (borrado lógico)
     *     tags: [Suppliers]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Proveedor desactivado
     */
    app
      .route("/api/proveedores/:id/deactivate")
      .patch(this.supplierController.deleteLogical.bind(this.supplierController));
  }
}
