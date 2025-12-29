import z from "zod";
import * as userConstants from "../constants/user.constant";
import * as userMessages from "../messages/user.messages";
import { GenderEnum, RoleEnum } from "../enums/user.enum";

const userSchema = {
  // ======== Required Info ========
  firstName: z
    .string()
    .trim()
    .min(userConstants.NAME.MIN_LENGTH, userMessages.FIRST_NAME.MIN)
    .max(userConstants.NAME.MAX_LENGTH, userMessages.FIRST_NAME.MAX)
    .regex(userConstants.NAME.REGEX, userMessages.FIRST_NAME.INVALID),

  lastName: z
    .string()
    .trim()
    .min(userConstants.NAME.MIN_LENGTH, userMessages.LAST_NAME.MIN)
    .max(userConstants.NAME.MAX_LENGTH, userMessages.LAST_NAME.MAX)
    .regex(userConstants.NAME.REGEX, userMessages.LAST_NAME.INVALID),

  gender: z.enum(
    [GenderEnum.MALE, GenderEnum.FEMALE],
    userMessages.GENDER.INVALID
  ),

  birthDate: z.coerce
    .date()
    .refine(
      userConstants.BIRTH_DATE.VALIDATOR,
      userMessages.BIRTH_DATE.INVALID
    ),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(userConstants.EMAIL.REGEX, userMessages.EMAIL.INVALID),

  password: z
    .string()
    .min(userConstants.PASSWORD.MIN_LENGTH)
    .max(userConstants.PASSWORD.MAX_LENGTH)
    .regex(userConstants.PASSWORD.REGEX, userMessages.PASSWORD.INVALID),

  confirmPassword: z
    .string()
    .min(userConstants.PASSWORD.MIN_LENGTH)
    .max(userConstants.PASSWORD.MAX_LENGTH)
    .regex(userConstants.PASSWORD.REGEX, userMessages.PASSWORD.INVALID),

  role: z.enum(
    [RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.MODERATOR],
    userMessages.ROLE.INVALID
  ),

  // ======== Optional Info ========

  phone: z
    .string()
    .trim()
    .regex(userConstants.PHONE.REGEX, userMessages.PHONE.INVALID)
    .optional(),

  address: z
    .string()
    .trim()
    .min(userConstants.ADDRESS.MIN_LENGTH, userMessages.ADDRESS.MIN)
    .max(userConstants.ADDRESS.MAX_LENGTH, userMessages.ADDRESS.MAX)
    .optional(),
};

export default userSchema;
