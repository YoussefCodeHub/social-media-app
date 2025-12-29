import mongoose, { Schema, Types } from "mongoose";
import { IRevokedToken } from "../../shared/types/revoked-token.type";

const RevokedTokenSchema = new Schema<IRevokedToken>(
  {
    jti: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const RevokedTokenModel =
  mongoose.models.RevokedToken ||
  mongoose.model<IRevokedToken>("RevokedToken", RevokedTokenSchema);

export default RevokedTokenModel;
