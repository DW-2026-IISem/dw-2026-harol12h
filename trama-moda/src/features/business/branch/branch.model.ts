import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface BranchI {
  id?: number;
  nombre: string;
  direccion?: string;
  telefono?: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Branch extends Model implements BranchI {
  public id!: number;
  public nombre!: string;
  public direccion!: string;
  public telefono!: string;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Branch.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: "branches",
    timestamps: true
  }
);
