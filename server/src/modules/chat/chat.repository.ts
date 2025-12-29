import DatabaseRepository from "../../database/database.repository";
import { ChatModel, IChat, IMessage } from "../../database/models/chat.model";
import type { Types } from "mongoose";

class ChatRepository extends DatabaseRepository<IChat> {
  constructor() {
    super(ChatModel);
  }

  async findChatBetweenUsers(userId1: Types.ObjectId, userId2: Types.ObjectId) {
    return await this.model
      .findOne({
        participants: { $all: [userId1, userId2] },
        group: { $exists: false },
      })
      .populate("participants", "firstName lastName profilePicture email")
      .populate("messages.createdBy", "firstName lastName profilePicture")
      .exec();
  }

  async findGroupById(groupId: Types.ObjectId) {
    return await this.model
      .findById(groupId)
      .populate("participants", "firstName lastName profilePicture email")
      .populate("messages.createdBy", "firstName lastName profilePicture")
      .exec();
  }

  async createChat(data: Partial<IChat>) {
    return await this.model.create(data);
  }

  async addMessageToChat(chatId: Types.ObjectId, message: IMessage) {
    return await this.model
      .findByIdAndUpdate(
        chatId,
        { $push: { messages: message } },
        { new: true }
      )
      .populate("participants", "firstName lastName profilePicture email")
      .populate("messages.createdBy", "firstName lastName profilePicture")
      .exec();
  }
}

export default ChatRepository;
