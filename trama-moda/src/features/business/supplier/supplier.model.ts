import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface SupplierI {
  id?: number;
  name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Supplier extends Model implements SupplierI {
  public id!: number;
  public name!: string;
  public contact_name!: string;
  public email!: string;
  public phone!: string;
  public address!: string;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Supplier.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
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
    tableName: "suppliers",
    timestamps: true
  }
);
