import { User } from "./user.model";
import { Op } from "sequelize";

export class UsersRepository {
  async findAll(): Promise<User[]> {
    return User.findAll({
      attributes: ["id", "username", "email", "status", "createdAt", "updatedAt"],
      order: [["id", "ASC"]],
    });
  }

  async findById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  async findByUsernameOrEmail(username: string, email: string, excludeId?: number): Promise<User | null> {
    return User.findOne({
      where: {
        [Op.or]: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
        ...(excludeId ? { id: { [Op.ne]: excludeId } } : {}),
      },
      attributes: ["id", "username", "email"],
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return User.findOne({ where: { username: username.toLowerCase() } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email: email.toLowerCase() } });
  }

  async create(input: { username: string; email: string; password: string }): Promise<User> {
    return User.create({ ...input, status: "active" });
  }
}
