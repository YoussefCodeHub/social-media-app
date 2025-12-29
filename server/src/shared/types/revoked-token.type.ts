import type { Types, HydratedDocument } from "mongoose";

export interface IRevokedToken {
  jti: string;
  userId: Types.ObjectId;
  expiresAt: Date;
}

export type RevokedTokenDocument = HydratedDocument<IRevokedToken>;
