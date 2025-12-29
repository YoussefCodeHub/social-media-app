import bcrypt from "bcrypt";
import "dotenv/config";

const salt: number = Number(process.env.BCRYPT_SALT_ROUNDS);

export const hash = async (password: string): Promise<string> =>
  await bcrypt.hash(password, salt);

export const compare = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => await bcrypt.compare(password, hashedPassword);
