import z from "zod";
import * as commentMessages from "../messages/comment.message";
import * as commentConstants from "../constants/comment.constant";

const commentSchema = {
  content: z
    .string()
    .min(commentConstants.CONTENT.MIN_LENGTH, commentMessages.CONTENT.MIN)
    .max(commentConstants.CONTENT.MAX_LENGTH, commentMessages.CONTENT.MAX)
    .optional(),

  attachments: z
    .array(z.string())
    .max(
      commentConstants.ATTACHMENTS.MAX_LENGTH,
      commentMessages.ATTACHMENTS.MAX
    )
    .optional(),

  tags: z.string().transform(commentConstants.TAGS.TRANSFORM).optional(),

  postId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, commentMessages.POST.INVALID_ID),

  commentId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, commentMessages.COMMENT.INVALID_ID),
};

export default commentSchema;
