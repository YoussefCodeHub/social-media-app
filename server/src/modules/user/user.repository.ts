import type { Model, HydratedDocument, Types } from "mongoose";
import type { IUser, UpdateUser } from "../../shared/types/user.type";
import DatabaseRepository from "../../database/database.repository";

class UserRepository extends DatabaseRepository<IUser> {
  constructor(model: Model<IUser>) {
    super(model);
  }
  findUser(id: Types.ObjectId): Promise<HydratedDocument<IUser> | null> {
    return this.model.findById(id).exec();
  }

  async findUserWithFriends(
    userId: Types.ObjectId
  ): Promise<HydratedDocument<IUser> | null> {
    return this.model
      .findById(userId)
      .populate("friends", "firstName lastName profilePicture email")
      .exec();
  }

  updateUser(
    id: Types.ObjectId,
    data: UpdateUser
  ): Promise<HydratedDocument<IUser> | null> {
    return this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
  }

  async checkIfFriends(
    userId: Types.ObjectId,
    friendId: Types.ObjectId
  ): Promise<boolean> {
    const user = await this.model
      .findById(userId)
      .select("friends")
      .lean()
      .exec();

    if (!user) return false;

    return (
      user.friends?.some(
        (friend) => friend.toString() === friendId.toString()
      ) || false
    );
  }

  async addFriend(
    userId: Types.ObjectId,
    friendId: Types.ObjectId
  ): Promise<void> {
    await this.model
      .findByIdAndUpdate(userId, {
        $addToSet: { friends: friendId },
      })
      .exec();
  }
}

export default UserRepository;
