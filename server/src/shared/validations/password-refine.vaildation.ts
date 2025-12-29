import * as userMessages from "../messages/user.messages";
import type { RefinementCtx } from "zod";

const passwordRefine = (data: Record<string, unknown>, ctx: RefinementCtx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: userMessages.CONFIRM_PASSWORD.INVALID,
      path: ["confirmPassword"],
    });
  }
};

export default passwordRefine;
