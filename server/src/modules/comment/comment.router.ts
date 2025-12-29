import { Router } from "express";
import CommentController from "./comment.controller";
import CommentService from "./comment.service";
import CommentRepository from "./comment.repository";
import CommentModel from "../../database/models/comment.model";
import { authentication } from "../../middlewares/auth.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import * as commentValidator from "./comment.validator";
import uploader from "../../utils/uploader.util";

const commentRepo = new CommentRepository(CommentModel);
const commentService = new CommentService(commentRepo);
const commentController = new CommentController(commentService);

const router = Router({ mergeParams: true });
const upload = uploader({ type: "cloud", folder: "comments" });

router.post(
  "/create-comment",
  authentication,
  upload.array("attachments", 10),
  validationMiddleware(commentValidator.createCommentSchema),
  commentController.createCommentHandler
);

router.post(
  "/:commentId/reply",
  authentication,
  upload.array("attachments", 10),
  validationMiddleware(commentValidator.replyCommentSchema),
  commentController.replyCommentHandler
);

export default router;
