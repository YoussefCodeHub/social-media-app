import { Router } from "express";
import ChatController from "./chat.controller";
import { authentication } from "../../middlewares/auth.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import * as chatValidator from "./chat.validator";
import uploader from "../../utils/uploader.util";

const chatController = new ChatController();
const chatRouter = Router();
const upload = uploader({ type: "cloud", folder: "groups" });

// Get chat between two users
chatRouter.get(
  "/user/:userId/chat",
  authentication,
  validationMiddleware(chatValidator.getUserChatSchema),
  chatController.getUserChat
);

// Get group chat
chatRouter.get(
  "/group/:groupId",
  authentication,
  validationMiddleware(chatValidator.getGroupChatSchema),
  chatController.getGroupChat
);

// Create group
chatRouter.post(
  "/group/create-group",
  authentication,
  upload.single("group_image"),
  validationMiddleware(chatValidator.createGroupSchema),
  chatController.createGroup
);

export default chatRouter;
