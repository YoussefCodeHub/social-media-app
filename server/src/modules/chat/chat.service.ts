import ChatRepository from "./chat.repository";
import UserRepository from "../user/user.repository";
import UserModel from "../../database/models/user.model";
import type { Types } from "mongoose";
import * as ChatErrors from "./errors/chat.error";
import { randomUUID } from "crypto";
import type { ICreateGroupDTO } from "./chat.dto";
import { uploadToS3 } from "../../utils/s3.util";

class ChatService {
  private chatRepo: ChatRepository;
  private userRepo: UserRepository;

  constructor() {
    this.chatRepo = new ChatRepository();
    this.userRepo = new UserRepository(UserModel);
  }

  // Get chat between two users
  async getChatBetweenUsers(userId: Types.ObjectId, otherUserId: string) {
    const otherUserObjectId = otherUserId as unknown as Types.ObjectId;

    const otherUser = await this.userRepo.findUser(otherUserObjectId);
    if (!otherUser)
      throw new ChatErrors.InvalidRecipientError({ userId: otherUserId });

    const chat = await this.chatRepo.findChatBetweenUsers(
      userId,
      otherUserObjectId
    );
    return chat;
  }

  // Get group chat
  async getGroupChat(groupId: string) {
    const groupObjectId = groupId as unknown as Types.ObjectId;
    const chat = await this.chatRepo.findGroupById(groupObjectId);

    if (!chat) throw new ChatErrors.GroupNotFoundError({ groupId });

    return chat;
  }

  // Send message (OVO)
  async sendMessage(
    senderId: Types.ObjectId,
    receiverId: string,
    content: string
  ) {
    const receiverObjectId = receiverId as unknown as Types.ObjectId;

    // Validate receiver
    const receiver = await this.userRepo.findById(receiverObjectId);
    if (!receiver) throw new ChatErrors.InvalidRecipientError({ receiverId });

    // Find chat
    let chat = await this.chatRepo.findChatBetweenUsers(
      senderId,
      receiverObjectId
    );

    // create chat
    if (!chat) {
      chat = await this.chatRepo.createChat({
        participants: [senderId, receiverObjectId],
        messages: [],
        createdBy: senderId,
      });
    }

    // Add message
    const message = {
      content,
      createdBy: senderId,
    };

    const updatedChat = await this.chatRepo.addMessageToChat(chat._id, message);
    return updatedChat;
  }

  // Send group message
  async sendGroupMessage(
    senderId: Types.ObjectId,
    groupId: string,
    content: string
  ) {
    const groupObjectId = groupId as unknown as Types.ObjectId;

    // Find group
    const group = await this.chatRepo.findGroupById(groupObjectId);
    if (!group) {
      throw new ChatErrors.GroupNotFoundError({ groupId });
    }

    // Check if sender is participant
    const isParticipant = group.participants.some(
      (p: any) => p._id.toString() === senderId.toString()
    );
    if (!isParticipant) {
      throw new ChatErrors.UnauthorizedChatAccessError({ groupId });
    }

    // Add message
    const message = {
      content,
      createdBy: senderId,
    };

    const updatedChat = await this.chatRepo.addMessageToChat(
      group._id,
      message
    );
    return updatedChat;
  }

  // Create group
  async createGroup(
    creatorId: Types.ObjectId,
    data: ICreateGroupDTO,
    file?: Express.Multer.File
  ) {
    const participantIds = data.participants.map(
      (id) => id as unknown as Types.ObjectId
    );

    // Validate participants exist
    for (const participantId of participantIds) {
      const user = await this.userRepo.findById(participantId);
      if (!user) {
        throw new ChatErrors.InvalidRecipientError({ userId: participantId });
      }
    }

    // Add creator if not included
    if (!participantIds.some((id) => id.toString() === creatorId.toString())) {
      participantIds.push(creatorId);
    }

    // Upload image to S3 if exists
    let groupImageUrl: string | undefined;
    if (file) {
      const key = `groups/${Date.now()}-${file.originalname}`;
      groupImageUrl = await uploadToS3(file.buffer, key, file.mimetype);
    }

    const roomId = randomUUID();

    const group = await this.chatRepo.createChat({
      participants: participantIds,
      messages: [],
      group: data.group,
      group_image: groupImageUrl,
      roomId,
      createdBy: creatorId,
    });

    return group;
  }
}

export default ChatService;
