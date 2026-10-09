import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../database/db";

export class User extends Model {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public status!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "business_users",
    timestamps: true,
  }
);
