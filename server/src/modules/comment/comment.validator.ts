import z from "zod";
import commentSchema from "../../shared/validations/comment.validation";
import fileValidations from "../../shared/validations/file.validation";

export const createCommentSchema = {
  params: z.strictObject({
    postId: commentSchema.postId,
  }),
  body: z.strictObject({
    content: commentSchema.content,
    tags: commentSchema.tags,
  }),
  files: z.array(z.strictObject(fileValidations)).max(10).optional(),
};

export const replyCommentSchema = {
  params: z.strictObject({
    postId: commentSchema.postId,
    commentId: commentSchema.commentId,
  }),
  body: z.strictObject({
    content: commentSchema.content,
    tags: commentSchema.tags,
  }),
  files: z.array(z.strictObject(fileValidations)).max(10).optional(),
};
