import z from "zod";
import * as commentValidator from "./comment.validator";

export type ICreateCommentDTO = z.infer<
  typeof commentValidator.createCommentSchema.body
>;

export type IReplyCommentDTO = z.infer<
  typeof commentValidator.replyCommentSchema.body
>;
