import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { Gateway } from "./gateway.controller";
import { socketAuthMiddleware } from "../../middlewares/socket-auth.middleware";

export const initializeGateway = (httpServer: HttpServer): Server => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // Apply auth middleware
  io.use(socketAuthMiddleware);

  // Initialize Gateway
  const gateway = new Gateway(io);
  gateway.initialize();

  return io;
};
