import z from "zod";
import tokenConstants from "../constants/token.constant";

const tokenSchema = z
  .string()
  .trim()
  .min(tokenConstants.MIN_SIZE)
  .max(tokenConstants.MAX_SIZE)
  .regex(tokenConstants.REGEX);

export default tokenSchema;
