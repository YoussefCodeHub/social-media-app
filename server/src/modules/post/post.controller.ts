import type { Request, Response, NextFunction } from "express";
import PostService from "./post.service";
import { sendSuccess } from "../../shared/responses";

class PostController {
  constructor(private readonly postService: PostService) {}

  createPostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const files = req.files as Express.Multer.File[] | undefined;
    const post = await this.postService.createPost(
      req.user?.id,
      req.body,
      files
    );
    return sendSuccess(res, { post }, 201, "Post created successfully");
  };
  likeUnlikePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { postId } = req.params;
    const { action } = req.query as { action: string };
    const post = await this.postService.likeUnlikePost(
      req.user?.id,
      postId!,
      action
    );
    const message =
      action === "LIKE"
        ? "Post liked successfully"
        : "Post unliked successfully";
    return sendSuccess(res, { post }, 200, message);
  };

  updatePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { postId } = req.params;
    const files = req.files as Express.Multer.File[] | undefined;
    const post = await this.postService.updatePost(
      req.user?.id,
      postId!,
      req.body,
      files
    );
    return sendSuccess(res, { post }, 200, "Post updated successfully");
  };

  getPostsHandler = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.postService.getPosts(req.user?.id, req.query);
    return sendSuccess(res, result, 200, "Posts retrieved successfully");
  };
}

export default PostController;
