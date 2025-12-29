import z from "zod";
import * as authValidator from "./auth.validator";

export type IRigsterDTO = z.infer<typeof authValidator.registerSchema.body>;
export type ILoginDTO = z.infer<typeof authValidator.loginSchema.body>;
