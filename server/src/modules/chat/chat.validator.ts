import z from "zod";
import fileValidations from "../../shared/validations/file.validation";

export const createGroupSchema = {
  body: z.strictObject({
    group: z.string().min(2).max(100),
    participants: z.array(z.string()),
    group_image: z.string().optional(),
  }),
  file: z.strictObject(fileValidations).optional(),
};

export const getGroupChatSchema = {
  params: z.strictObject({
    groupId: z.string(),
  }),
};

export const getUserChatSchema = {
  params: z.strictObject({
    userId: z.string(),
  }),
};
