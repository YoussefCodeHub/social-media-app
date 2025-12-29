import z from "zod";
import authorizationHeaderConstants from "../constants/authorization-header.constant";

const authorizationHeaderSchema = z
  .string()
  .min(authorizationHeaderConstants.MIN_SIZE)
  .max(authorizationHeaderConstants.MAX_SIZE)
  .regex(authorizationHeaderConstants.REGEX);

export default authorizationHeaderSchema;
