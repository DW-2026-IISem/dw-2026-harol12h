import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface CollectionI {
  id?: number;
  nombre: string;
  descripcion?: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Collection extends Model implements CollectionI {
  public id!: number;
  public nombre!: string;
  public descripcion!: string;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Collection.init(
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
    tableName: "collections",
    timestamps: true
  }
);
