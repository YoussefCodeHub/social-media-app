import { Server } from "socket.io";
import type { IAuthSocket } from "./interfaces/auth-socket.interface";
import { ConnectionEvents } from "./events/connection.event";
import { ChatGateway } from "../chat/gateway/chat.gateway";

export class Gateway {
  private connectedSockets: Map<string, string[]> = new Map(); // userId -> [socketIds]
  private connectionEvents: ConnectionEvents;
  private chatGateway: ChatGateway;

  constructor(private io: Server) {
    this.connectionEvents = new ConnectionEvents(this.connectedSockets);
    this.chatGateway = new ChatGateway(io);
  }

  initialize(): void {
    this.io.on("connection", (socket: IAuthSocket) => {
      const userId = socket.credentials?.user._id;
      const username = socket.credentials?.user.username;

      if (!userId) {
        socket.disconnect();
        return;
      }

      // Handle connection
      this.connectionEvents.handleConnection(socket, userId, username!);

      // Initialize chat events
      this.chatGateway.handleChatEvents(socket);

      // Handle disconnection
      socket.on("disconnect", () => {
        this.connectionEvents.handleDisconnection(socket, userId, username!);
      });
    });
  }
}
