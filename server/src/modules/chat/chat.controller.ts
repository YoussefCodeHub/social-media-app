import type { Request, Response, NextFunction } from "express";
import ChatService from "./chat.service";
import { sendSuccess } from "../../shared/responses";

class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  // Get chat between current user and another user
  getUserChat = async (req: Request, res: Response, next: NextFunction) => {
    const currentUserId = req.user?.id;
    const { userId } = req.params;

    const chat = await this.chatService.getChatBetweenUsers(
      currentUserId,
      userId!
    );

    return sendSuccess(
      res,
      { chat },
      200,
      chat ? "Chat retrieved successfully" : "No chat found"
    );
  };

  // Get group chat
  getGroupChat = async (req: Request, res: Response, next: NextFunction) => {
    const { groupId } = req.params;
    const chat = await this.chatService.getGroupChat(groupId!);

    return sendSuccess(res, { chat }, 200, "Group chat retrieved successfully");
  };

  // Create group
  createGroup = async (req: Request, res: Response, next: NextFunction) => {
    const creatorId = req.user?.id;
    const file = req.file;
    const group = await this.chatService.createGroup(creatorId, req.body, file);

    return sendSuccess(res, { group }, 201, "Group created successfully");
  };
}

export default ChatController;
