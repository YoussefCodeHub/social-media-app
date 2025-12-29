import z from "zod";
import * as fileConstants from "../constants/file.constant";

const fileSchema = {
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.enum([
    fileConstants.MIME_TYPES.JPEG,
    fileConstants.MIME_TYPES.JPG,
    fileConstants.MIME_TYPES.PNG,
  ]),
  buffer: z.instanceof(Buffer).optional(),
  destination: z.string().optional(),
  filename: z.string().optional(),
  path: z.string().optional(),
  size: z.number().max(fileConstants.FILE_MAX_SIZE),
};

export default fileSchema;
