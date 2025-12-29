import type { IAuthSocket } from "../interfaces/auth-socket.interface";

export class ConnectionEvents {
  constructor(private connectedSockets: Map<string, string[]>) {}

  handleConnection(
    socket: IAuthSocket,
    userId: string,
    username: string
  ): void {
    // Track socket connection
    const userSockets = this.connectedSockets.get(userId) || [];
    userSockets.push(socket.id);
    this.connectedSockets.set(userId, userSockets);

    console.log(`User [${username}] with ID [${userId}] logged in`);
    console.log(`Active connections for this user: ${userSockets.length}`);
    console.log(`Total users online: ${this.connectedSockets.size}`);

    // List all online users
    this.logAllOnlineUsers();
  }

  handleDisconnection(
    socket: IAuthSocket,
    userId: string,
    username: string
  ): void {
    // Remove socket from tracking
    const userSockets = this.connectedSockets.get(userId) || [];
    const remainingTabs = userSockets.filter((id) => id !== socket.id);

    if (remainingTabs.length > 0) {
      this.connectedSockets.set(userId, remainingTabs);
      console.log(
        `User [${username}] closed one tab. Remaining tabs: ${remainingTabs.length}`
      );
    } else {
      this.connectedSockets.delete(userId);
      console.log(`User [${username}] with ID [${userId}] logged out`);
    }

    console.log(`Total users online: ${this.connectedSockets.size}`);
    this.logAllOnlineUsers();
  }

  private logAllOnlineUsers(): void {
    if (this.connectedSockets.size === 0) {
      console.log("No users currently online");
      return;
    }

    console.log("Currently online users:");
    this.connectedSockets.forEach((socketIds, userId) => {
      console.log(`  - User ID: ${userId} (${socketIds.length} tab(s))`);
    });
  }
}
