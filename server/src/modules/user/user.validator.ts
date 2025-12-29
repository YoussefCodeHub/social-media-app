import z from "zod";
import userValidations from "../../shared/validations/user.validation";
import passwordRefine from "../../shared/validations/password-refine.vaildation";
import fileValidations from "../../shared/validations/file.validation";

export const uploadProfilePictureSchema = {
  file: z.strictObject(fileValidations),
};

export const updateProfileSchema = {
  body: z.strictObject({
    firstName: userValidations.firstName.optional(),
    lastName: userValidations.lastName.optional(),
    gender: userValidations.gender.optional(),
    birthDate: userValidations.birthDate.optional(),
    phone: userValidations.phone.optional(),
    address: userValidations.address.optional(),
  }),
};

export const updatePasswordSchema = {
  body: z
    .strictObject({
      oldPassword: userValidations.password,
      password: userValidations.password,
      confirmPassword: userValidations.confirmPassword,
    })
    .superRefine(passwordRefine),
};

export const sendFriendRequestSchema = {
  body: z.strictObject({
    receiverId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
  }),
};

export const acceptFriendRequestSchema = {
  params: z.strictObject({
    requestId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid friend request ID format"),
  }),
};
