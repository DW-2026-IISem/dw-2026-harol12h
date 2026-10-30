import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface ProductI {
  id?: number;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  stock: number;
  category_id?: number | null;
  supplier_id?: number | null;
  status?: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion!: string | null;
  public precio!: number;
  public stock!: number;
  public category_id!: number | null;
  public supplier_id!: number | null;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "suppliers", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  },
  {
    sequelize,
    tableName: "products",
    timestamps: true
  }
);
