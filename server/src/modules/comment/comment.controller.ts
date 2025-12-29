import type { Request, Response, NextFunction } from "express";
import CommentService from "./comment.service";
import { sendSuccess } from "../../shared/responses";

class CommentController {
  constructor(private readonly commentService: CommentService) {}

  createCommentHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { postId } = req.params;
    const files = req.files as Express.Multer.File[] | undefined;
    const comment = await this.commentService.createComment(
      req.user?.id,
      postId!,
      req.body,
      files
    );
    return sendSuccess(res, { comment }, 201, "Comment created successfully");
  };

  replyCommentHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { postId, commentId } = req.params;
    const files = req.files as Express.Multer.File[] | undefined;
    const reply = await this.commentService.replyComment(
      req.user?.id,
      postId!,
      commentId!,
      req.body,
      files
    );
    return sendSuccess(res, { reply }, 201, "Reply created successfully");
  };
}

export default CommentController;
