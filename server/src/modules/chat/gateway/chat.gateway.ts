import { Server } from "socket.io";
import type { IAuthSocket } from "../../gateway/interfaces/auth-socket.interface";
import { ChatEvents } from "./chat.event";

export class ChatGateway {
  private chatEvents: ChatEvents;

  constructor(private io: Server) {
    this.chatEvents = new ChatEvents(io);
  }

  handleChatEvents(socket: IAuthSocket): void {
    const userId = socket.credentials?.user._id;
    if (!userId) return;

    // Auto-join user's personal room (for OVO chats)
    socket.join(userId.toString());
    console.log(`User ${userId} joined personal room`);

    // Send message (OVO)
    socket.on("sendMessage", async (data) => {
      await this.chatEvents.handleSendMessage(socket, data);
    });

    // Send group message
    socket.on("sendGroupMessage", async (data) => {
      await this.chatEvents.handleSendGroupMessage(socket, data);
    });

    // Join room (for groups)
    socket.on("join_room", (data) => {
      this.chatEvents.handleJoinRoom(socket, data);
    });

    // NEW: Join chat room (when user opens a chat)
    socket.on("openChat", async (data: { chatId: string }) => {
      await this.chatEvents.handleOpenChat(socket, data);
    });
  }
}
