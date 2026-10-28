/** Usuario del módulo comercial, según su modelo Sequelize independiente. */
export interface BusinessUser {
  id: number;
  nombre: string;
  email: string;
  status: string;
}
