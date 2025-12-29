import type { Model, HydratedDocument } from "mongoose";
import type { CreateUser, IUser } from "../../shared/types/user.type";
import DatabaseRepository from "../../database/database.repository";

class AuthRepository extends DatabaseRepository<IUser> {
  constructor(model: Model<IUser>) {
    super(model);
  }
  register(newUser: CreateUser): Promise<HydratedDocument<IUser>> {
    return this.model.create(newUser);
  }
  findByEmail(email: string): Promise<HydratedDocument<IUser> | null> {
    return this.model.findOne({ email }).exec();
  }
}

export default AuthRepository;
