import type { Types, HydratedDocument } from "mongoose";

export interface IComment {
  content?: string;
  attachments?: string[];
  tags?: Types.ObjectId[];
  likes?: Types.ObjectId[];
  postId: Types.ObjectId;
  commentId?: Types.ObjectId;
  createdBy?: Types.ObjectId;
  frozenBy?: Types.ObjectId[];
  frozenAt?: Date;
  restoredBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CommentDocument = HydratedDocument<IComment>;
