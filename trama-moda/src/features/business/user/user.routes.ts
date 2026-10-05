import { Application } from "express";
import { UserController } from "./user.controller";
import { verifyToken, checkRole } from "../../../middlewares/auth.middleware";

export class UserRoutes {
  public userController: UserController = new UserController();

  public routes(app: Application): void {
    // Obtener todos los usuarios / Crear un nuevo usuario (Solo Admins)
    app
      .route("/api/usuarios")
      .get(verifyToken, checkRole(["admin"]), this.userController.getAll.bind(this.userController))
      .post(verifyToken, checkRole(["admin"]), this.userController.create.bind(this.userController));

    // Consultar o Actualizar un usuario específico por ID (Solo Admins)
    app
      .route("/api/usuarios/:id")
      .get(verifyToken, checkRole(["admin"]), this.userController.getOne.bind(this.userController))
      .put(verifyToken, checkRole(["admin"]), this.userController.update.bind(this.userController));

    // Desactivar un usuario mediante borrado lógico (Solo Admins)
    app
      .route("/api/usuarios/:id/deactivate")
      .patch(verifyToken, checkRole(["admin"]), this.userController.deleteLogical.bind(this.userController));
  }
}
