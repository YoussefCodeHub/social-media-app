import jwt from "jsonwebtoken";
import type { SignOptions, JwtPayload } from "jsonwebtoken";
import "dotenv/config";

const secretKey: string = process.env.JWT_TOKEN_SECRET_KEY!;

export const generateToken = async (
  payload: JwtPayload,
  expiresIn: number
): Promise<string> => {
  const options: SignOptions = {
    expiresIn,
    issuer: "Social-media-App",
    subject: "Authentication",
  };
  return await jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token: string): JwtPayload | string =>
  jwt.verify(token, secretKey);
