import { Router } from "express";
import UserController from "./user.controller";
import UserService from "./user.service";
import UserRepository from "./user.repository";
import UserModel from "../../database/models/user.model";
import FriendRequestModel from "../../database/models/friend-request.model";
import PostModel from "../../database/models/post.model";
import CommentModel from "../../database/models/comment.model";
import createUploader from "../../utils/uploader.util";
import { authentication } from "../../middlewares/auth.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import * as userValidator from "./user.validator";

const userRepo = new UserRepository(UserModel);
const userService = new UserService(
  userRepo,
  FriendRequestModel,
  PostModel,
  CommentModel
);
const userController = new UserController(userService);

const router = Router();
const upload = createUploader({ type: "cloud", folder: "profile" });

router.get("/profile", authentication, userController.getProfileHandler);

router.post(
  "/profile-picture",
  authentication,
  upload.single("profile-picture"),
  validationMiddleware(userValidator.uploadProfilePictureSchema),
  userController.uploadProfilePictureHandler
);
router.put(
  "/update-profile",
  authentication,
  validationMiddleware(userValidator.updateProfileSchema),
  userController.updateProfileHandler
);
router.put(
  "/update-password",
  authentication,
  validationMiddleware(userValidator.updatePasswordSchema),
  userController.updatePasswordHandler
);

router.post(
  "/friend-request/send",
  authentication,
  validationMiddleware(userValidator.sendFriendRequestSchema),
  userController.sendFriendRequestHandler
);

router.patch(
  "/friend-request/:requestId/accept",
  authentication,
  validationMiddleware(userValidator.acceptFriendRequestSchema),
  userController.acceptFriendRequestHandler
);

export default router;
