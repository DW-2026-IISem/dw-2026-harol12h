import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";
import { Client } from "../client/client.model";

export interface SaleI {
  id?: number;
  client_id: number;
  fecha?: Date;
  monto_total: number;
  status?: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Sale extends Model {
  public id!: number;
  public client_id!: number;
  public fecha!: Date;
  public monto_total!: number;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Sale.init(
  {
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clients",
        key: "id"
      }
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    monto_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  },
  {
    sequelize,
    tableName: "sales",
    timestamps: true
  }
);

// Relación entre Venta y Cliente
Client.hasMany(Sale, { foreignKey: "client_id", as: "sales" });
Sale.belongsTo(Client, { foreignKey: "client_id", as: "client" });
