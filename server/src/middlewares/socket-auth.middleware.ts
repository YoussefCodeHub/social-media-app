import { Socket } from "socket.io";
import { verifyToken } from "../utils/token.util";
import type { JwtPayload } from "jsonwebtoken";
import UserRepository from "../modules/user/user.repository";
import UserModel from "../database/models/user.model";
import type { IAuthSocket } from "../modules/gateway/interfaces/auth-socket.interface";
import { AuthenticationError } from "../shared/errors/index";

const userRepo = new UserRepository(UserModel);

export const socketAuthMiddleware = async (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    const authHeader = socket.handshake.auth?.authorization;

    // Accept both "Bearer" and "USER" formats
    if (
      !authHeader ||
      (!authHeader.startsWith("Bearer ") && !authHeader.startsWith("USER "))
    )
      return next(
        new AuthenticationError("Invalid authentication credentials")
      );

    const token = authHeader.split(" ")[1];

    if (!token)
      return next(
        new AuthenticationError("Invalid authentication credentials")
      );

    const decoded = verifyToken(token) as JwtPayload;
    const user = await userRepo.findUser(decoded.id);

    if (!user)
      return next(
        new AuthenticationError("Invalid authentication credentials")
      );

    // Attach user credentials to socket
    (socket as IAuthSocket).credentials = {
      user: {
        _id: user._id.toString(),
        username: user.firstName + " " + user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      token,
      tokenType: "ACCESS",
    };

    next();
  } catch (error: any) {
    next(new AuthenticationError("Authentication process failed"));
  }
};
