import z from "zod";
import * as postValidator from "./post.validator";

export type ICreatePostDTO = z.infer<
  typeof postValidator.createPostSchema.body
>;

export type ILikeUnlikePostDTO = z.infer<
  typeof postValidator.likeUnlikePostSchema.params &
    typeof postValidator.likeUnlikePostSchema.query
>;

export type IUpdatePostDTO = z.infer<
  typeof postValidator.updatePostSchema.body
>;

export type IGetPostsDTO = z.infer<typeof postValidator.getPostsSchema.query>;
