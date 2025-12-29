import UserModel from "../database/models/user.model";
import RevokedTokenModel from "../database/models/revoked-token.model";
import { verifyToken } from "../utils/token.util";
import type { Request, Response, NextFunction } from "express";
import * as AppErrors from "../shared/errors/index";
import databaseRepository from "../database/database.repository";

const revokedTokenRepo = new databaseRepository(RevokedTokenModel);
const UserRepo = new databaseRepository(UserModel);

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return next(
      new AppErrors.AuthenticationError("Unauthorized access", {
        cause: "Missing or invalid token",
        header: "Authorization",
        expectedFormat: "Bearer <token>",
      })
    );

  const decoded = verifyToken(token) as any;
  if (await revokedTokenRepo.findOne({ jti: decoded.jti }))
    return next(
      new AppErrors.AuthenticationError("Unauthorized access", {
        cause: "Revoked or invalid token",
      })
    );

  const user = await UserRepo.findById(decoded.id);
  if (!user) return next(new AppErrors.NotFoundError("User not found"));

  req.user = user;
  next();
};
