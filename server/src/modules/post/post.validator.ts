import z from "zod";
import postSchema from "../../shared/validations/post.validation";
import fileValidations from "../../shared/validations/file.validation";

export const createPostSchema = {
  body: z.strictObject({
    content: postSchema.content,
    allowComments: postSchema.allowComments,
    availability: postSchema.availability,
    tags: postSchema.tags,
  }),
  files: z.array(z.strictObject(fileValidations)).max(10).optional(),
};

export const likeUnlikePostSchema = {
  params: z.strictObject({
    postId: postSchema.postId,
  }),
  query: z.strictObject({
    action: postSchema.action,
  }),
};

export const updatePostSchema = {
  params: z.strictObject({
    postId: postSchema.postId,
  }),
  body: z
    .object({
      content: postSchema.content,
      allowComments: postSchema.allowComments,
      availability: postSchema.availability,
      tags: postSchema.tags,
    })
    .passthrough(),
  files: z.array(z.strictObject(fileValidations)).max(10).optional(),
};

export const getPostsSchema = {
  query: z.strictObject({
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    availability: postSchema.availability.optional(),
  }),
};
