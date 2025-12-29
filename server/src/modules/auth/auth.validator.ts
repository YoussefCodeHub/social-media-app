import z from "zod";
import userValidations from "../../shared/validations/user.validation";
import tokenValidation from "../../shared/validations/token.validation";
import authorizationHeaderValidation from "../../shared/validations/authorization-header.validation";
import passwordRefine from "../../shared/validations/password-refine.vaildation";

export const registerSchema = {
  body: z.strictObject(userValidations).superRefine(passwordRefine),
};

export const loginSchema = {
  body: z.strictObject({
    email: userValidations.email,
    password: userValidations.password,
  }),
};

export const confirmEmailSchema = {
  query: z.strictObject({
    token: z.string(),
  }),
};

export const refreshAccessTokenSchema = {
  body: z.strictObject({
    refreshToken: tokenValidation,
  }),
};

export const forgetPasswordSchema = {
  body: z.strictObject({
    email: userValidations.email,
  }),
};

export const resetPasswordSchema = {
  body: z
    .strictObject({
      password: userValidations.password,
      confirmPassword: userValidations.confirmPassword,
    })
    .superRefine(passwordRefine),
  query: z.strictObject({
    token: tokenValidation,
  }),
};

export const logoutSchema = {
  headers: z
    .strictObject({
      authorization: authorizationHeaderValidation,
    })
    .passthrough(),
};
