import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface InventoryI {
  id?: number;
  branchId: number;
  variantId: number;
  stock: number;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Inventory extends Model implements InventoryI {
  public id!: number;
  public branchId!: number;
  public variantId!: number;
  public stock!: number;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Inventory.init(
  {
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "branches", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    },
    variantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "variants", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: "inventories",
    timestamps: true
  }
);
