import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface RoleI {
  id?: number;
  name: string;
  description?: string | null;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Role extends Model {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: "uq_roles_name",
      validate: { notEmpty: { msg: "Role name cannot be empty" } },
    },
    description: { type: DataTypes.STRING(255), allowNull: true },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: true,
    hooks: {
      beforeValidate: (role: Role) => {
        if (role.name) role.name = role.name.trim().toUpperCase();
      },
    },
  }
);
