import type { Request } from "express";
import type { IUser } from "../../shared/types/user.type";

export interface GraphQLContext {
  req: Request;
  user?: IUser;
}
