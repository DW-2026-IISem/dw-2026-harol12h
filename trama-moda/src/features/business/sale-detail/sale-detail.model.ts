import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";
import { Sale } from "../sale/sale.model";
import { Product } from "../product/product.model";

export interface SaleDetailI {
  id?: number;
  sale_id: number;
  product_id: number;
  variantId?: number | null;
  branchId?: number | null;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  status?: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class SaleDetail extends Model {
  public id!: number;
  public sale_id!: number;
  public product_id!: number;
  public variantId!: number | null;
  public branchId!: number | null;
  public cantidad!: number;
  public precio_unitario!: number;
  public subtotal!: number;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SaleDetail.init(
  {
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sales",
        key: "id"
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id"
      }
    },
    variantId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "variants", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "branches", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active"
    }
  },
  {
    sequelize,
    tableName: "sale_details",
    timestamps: true
  }
);

// Definición de Relaciones
Sale.hasMany(SaleDetail, { foreignKey: "sale_id", as: "details" });
SaleDetail.belongsTo(Sale, { foreignKey: "sale_id", as: "sale" });

Product.hasMany(SaleDetail, { foreignKey: "product_id", as: "sale_details" });
SaleDetail.belongsTo(Product, { foreignKey: "product_id", as: "product" });
