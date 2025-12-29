import UserModel from "../../database/models/user.model";
import RevokedTokenModel from "../../database/models/revoked-token.model";
import DatabaseRepository from "../../database/database.repository";
import { verifyToken } from "../../utils/token.util";
import * as AppErrors from "../../shared/errors/index";

const userRepo = new DatabaseRepository(UserModel);
const revokedTokenRepo = new DatabaseRepository(RevokedTokenModel);

export const authenticateGraphQL = async (req: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new AppErrors.AuthenticationError("Unauthorized access");

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token) as any;

  if (await revokedTokenRepo.findOne({ jti: decoded.jti }))
    throw new AppErrors.AuthenticationError("Token revoked");

  const user = await userRepo.findById(decoded.id);
  if (!user) throw new AppErrors.NotFoundError("User not found");

  return user;
};
