import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface VariantI {
  id?: number;
  nombre: string;
  descripcion?: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Variant extends Model implements VariantI {
  public id!: number;
  public nombre!: string;
  public descripcion!: string;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Variant.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: "variants",
    timestamps: true
  }
);
