import { Server } from "socket.io";
import type { IAuthSocket } from "../../gateway/interfaces/auth-socket.interface";
import ChatService from "../chat.service";
import type {
  ISendMessageDTO,
  ISendGroupMessageDTO,
  IJoinRoomDTO,
} from "../chat.dto";

export class ChatEvents {
  private chatService: ChatService;

  constructor(private io: Server) {
    this.chatService = new ChatService();
  }

  async handleSendMessage(
    socket: IAuthSocket,
    data: ISendMessageDTO
  ): Promise<void> {
    try {
      const senderId = socket.credentials?.user._id;
      if (!senderId) {
        socket.emit("custom_error", { message: "Unauthorized" });
        return;
      }

      const { content, sendTo } = data;

      // Send message via service
      const updatedChat = await this.chatService.sendMessage(
        senderId as any,
        sendTo,
        content
      );

      // Emit to BOTH sender and receiver rooms
      const messageData = {
        content,
        from: socket.credentials?.user,
        chatId: updatedChat!._id.toString(),
        createdAt: new Date(),
      };

      // Emit success to sender
      socket.emit("successMessage", { content });

      // Emit to sender room
      this.io.to(senderId.toString()).emit("newMessage", messageData);

      // Emit to receiver
      this.io.to(sendTo).emit("newMessage", messageData);

      console.log(`Message sent from ${senderId} to ${sendTo}`);
    } catch (error: any) {
      console.error("Error sending message:", error);
      socket.emit("custom_error", {
        message: error.message || "Failed to send message",
      });
    }
  }

  async handleSendGroupMessage(
    socket: IAuthSocket,
    data: ISendGroupMessageDTO
  ): Promise<void> {
    try {
      const senderId = socket.credentials?.user._id;
      if (!senderId) {
        socket.emit("custom_error", { message: "Unauthorized" });
        return;
      }

      const { content, groupId } = data;

      // Send group message via service
      const updatedChat = await this.chatService.sendGroupMessage(
        senderId as any,
        groupId,
        content
      );

      const messageData = {
        content,
        from: socket.credentials?.user,
        groupId,
        chatId: updatedChat!._id.toString(),
        createdAt: new Date(),
      };

      // Emit success to sender first
      socket.emit("successMessage", { content });

      // Then emit to ALL room members
      this.io.to(updatedChat?.roomId!).emit("newMessage", messageData);

      console.log(`Group message sent to room ${updatedChat?.roomId}`);
    } catch (error: any) {
      console.error("Error sending group message:", error);
      socket.emit("custom_error", {
        message: error.message || "Failed to send group message",
      });
    }
  }

  handleJoinRoom(socket: IAuthSocket, data: IJoinRoomDTO): void {
    try {
      const { roomId } = data;
      socket.join(roomId);
      console.log(
        `User ${socket.credentials?.user.username} joined room: ${roomId}`
      );
    } catch (error: any) {
      console.error("Error joining room:", error);
      socket.emit("custom_error", {
        message: error.message || "Failed to join room",
      });
    }
  }

  // Handle when user opens a chat
  async handleOpenChat(
    socket: IAuthSocket,
    data: { chatId: string }
  ): Promise<void> {
    try {
      const userId = socket.credentials?.user._id;
      if (!userId) return;

      const { chatId } = data;

      // Get the chat to find roomId
      const chat = await this.chatService.getGroupChat(chatId);

      if (chat?.roomId) {
        socket.join(chat.roomId);
        console.log(`User ${userId} joined chat room: ${chat.roomId}`);
      }
    } catch (error) {
      console.error("Error opening chat:", error);
    }
  }
}
