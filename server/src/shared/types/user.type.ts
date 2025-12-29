import type { Types, HydratedDocument } from "mongoose";
import type { RoleEnum, GenderEnum } from "../enums/user.enum";

export interface IUser {
  // ======= Required User Info =======
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  email: string;
  password: string;
  role: RoleEnum;

  // ======= Optional Info =======
  phone?: string | undefined;
  birthDate?: Date | undefined;
  address?: string | undefined;
  profilePicture?: string | undefined;
  profilePicturePublicId?: string | undefined;
  confirmEmail?: Date | undefined;
  friends?: Types.ObjectId[];
  // ======= Audit / Soft Delete =======
  deletedAt?: Date | undefined;
  deletedBy?: Types.ObjectId | undefined;
  restoredAt?: Date | undefined;
  restoredBy?: Types.ObjectId | undefined;
}

export type UserDocument = HydratedDocument<IUser>;

export type CreateUser = Omit<
  IUser,
  | "_id"
  | "confirmEmail"
  | "deletedAt"
  | "deletedBy"
  | "restoredAt"
  | "restoredBy"
>;

export type UpdateUser = Partial<CreateUser>;
