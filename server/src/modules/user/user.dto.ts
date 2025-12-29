import z from "zod";
import * as userValidator from "./user.validator";

export type IUploadProfilePictureDTO = z.infer<
  typeof userValidator.uploadProfilePictureSchema.file
>;
export type IUpdateProfileDTO = z.infer<
  typeof userValidator.updateProfileSchema.body
>;
export type IUpdatePasswordDTO = z.infer<
  typeof userValidator.updatePasswordSchema.body
>;

export type ISendFriendRequestDTO = z.infer<
  typeof userValidator.sendFriendRequestSchema.body
>;

export type IAcceptFriendRequestDTO = z.infer<
  typeof userValidator.acceptFriendRequestSchema.params
>;
