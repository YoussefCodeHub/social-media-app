import mongoose, { Schema, Types } from "mongoose";
import type { IFriendRequest } from "../../shared/types/friend-request.type";

const friendRequestSchema = new Schema<IFriendRequest>(
  {
    sendTo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
    acceptedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
friendRequestSchema.index({ createdBy: 1, sendTo: 1 });
friendRequestSchema.index({ sendTo: 1, status: 1 });
friendRequestSchema.index({ createdAt: -1 });

const FriendRequestModel =
  mongoose.models.FriendRequest ||
  mongoose.model<IFriendRequest>("FriendRequest", friendRequestSchema);

export default FriendRequestModel;
