import z from "zod";
import { Types } from "mongoose";

const idSchema = () =>
  z
    .string()
    .trim()
    .refine((val) => Types.ObjectId.isValid(val));

export default idSchema;
