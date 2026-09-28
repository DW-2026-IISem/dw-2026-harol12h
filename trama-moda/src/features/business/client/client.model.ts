import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface ClientI {
  id?: number;
  tipo_documento: string;
  numero_documento: string;
  nombre: string;
  telefono?: string;
  email?: string;
  status?: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Client extends Model {
  public id!: number;
  public tipo_documento!: string;
  public numero_documento!: string;
  public nombre!: string;
  public telefono!: string;
  public email!: string;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Client.init(
  {
    tipo_documento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numero_documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  },
  {
    sequelize,
    tableName: "clients",
    timestamps: true
  }
);
