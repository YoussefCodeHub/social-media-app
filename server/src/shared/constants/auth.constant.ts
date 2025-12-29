import resetPasswordTemplate from "../../templates/reset-password.template";
import {
  confirmEmailOtpTemplate,
  confirmEmailTokenTemplate,
} from "../../templates/confirm-email/index";
import {
  loginSuccessHtmlTemplate,
  loginSuccessTextTemplate,
} from "../../templates/login-success/index";

export const EMAIL = {
  SUBJECT: {
    LOGIN_SUCCESS: "Successful Login to Saraha App",
    VERIFY_EMAIL: "Verify your email",
    RESET_PASSWORD: "Reset your password",
  },
  BODY: {
    TEXT: { LOGIN_SUCCESS: loginSuccessTextTemplate },
    HTML: {
      LOGIN_SUCCESS: loginSuccessHtmlTemplate,
      CONFIRM_EMAIL_OTP: confirmEmailOtpTemplate,
      CONFIRM_EMAIL_TOKEN: confirmEmailTokenTemplate,
      RESET_PASSWORD: resetPasswordTemplate,
    },
  },
};
