import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface CategoryI {
  id?: number;
  name: string;
  description?: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category extends Model implements CategoryI {
  public id!: number;
  public name!: string;
  public description!: string;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
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
    tableName: "categories",
    timestamps: true
  }
);
