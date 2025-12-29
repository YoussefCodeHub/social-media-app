import type { Types } from "mongoose";

export interface IFriendRequest {
  _id: Types.ObjectId;
  sendTo: Types.ObjectId;
  createdBy: Types.ObjectId;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  acceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
