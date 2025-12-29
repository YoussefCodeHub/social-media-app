import { Socket } from "socket.io";

export interface IAuthSocket extends Socket {
  credentials?: {
    user: {
      _id: string;
      username: string;
      email: string;
      profilePicture?: string | undefined;
    };
    token: string;
    tokenType: "ACCESS" | "REFRESH";
  };
}
