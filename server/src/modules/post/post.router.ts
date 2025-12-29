import { Router } from "express";
import PostController from "./post.controller";
import PostService from "./post.service";
import PostRepository from "./post.repository";
import PostModel from "../../database/models/post.model";
import { authentication } from "../../middlewares/auth.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import * as postValidator from "./post.validator";
import uploader from "../../utils/uploader.util";
import commentRouter from "../comment/comment.router";

const postRepo = new PostRepository(PostModel);
const postService = new PostService(postRepo);
const postController = new PostController(postService);

const router = Router();
const upload = uploader({ type: "cloud", folder: "posts" });

router.post(
  "/create-post",
  authentication,
  upload.array("attachments", 10),
  validationMiddleware(postValidator.createPostSchema),
  postController.createPostHandler
);

router.patch(
  "/:postId/like",
  authentication,
  validationMiddleware(postValidator.likeUnlikePostSchema),
  postController.likeUnlikePostHandler
);

router.put(
  "/update-post/:postId",
  authentication,
  upload.array("attachments", 10),
  validationMiddleware(postValidator.updatePostSchema),
  postController.updatePostHandler
);

router.get(
  "/get-posts",
  authentication,
  validationMiddleware(postValidator.getPostsSchema),
  postController.getPostsHandler
);

router.use("/:postId", commentRouter); // Merge comment routes

export default router;
