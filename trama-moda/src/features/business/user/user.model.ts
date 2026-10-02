import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface UserI {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  branchId?: number;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Model implements UserI {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public branchId!: number;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "seller"
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true
  }
);
