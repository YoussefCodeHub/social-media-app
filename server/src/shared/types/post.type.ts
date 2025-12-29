import type { Types, HydratedDocument } from "mongoose";
import type { AllowCommentsEnum, AvailabilityEnum } from "../enums/post.enum";

export interface IPost {
  content?: string;
  attachments?: string[];
  allowComments?: AllowCommentsEnum;
  availability?: AvailabilityEnum;
  tags?: Types.ObjectId[];
  likes?: Types.ObjectId[];
  createdBy?: Types.ObjectId;
  frozenBy?: Types.ObjectId[];
  frozenAt?: Date;
  restoredBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PostDocument = HydratedDocument<IPost>;
