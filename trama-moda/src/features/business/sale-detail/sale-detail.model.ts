import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";
import { Sale } from "../sale/sale.model";
import { Product } from "../product/product.model";

export interface SaleDetailI {
  id?: number;
  sale_id: number;
  product_id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SaleDetail extends Model {
  public id!: number;
  public sale_id!: number;
  public product_id!: number;
  public cantidad!: number;
  public precio_unitario!: number;
  public subtotal!: number;
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
