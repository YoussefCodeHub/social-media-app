import type { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";
import { sendSuccess } from "../../shared/responses";
import * as AppErrors from "../../shared/errors/index";

class AuthController {
  constructor(private readonly authService: AuthService) {}

  registerHandler = async (req: Request, res: Response, next: NextFunction) => {
    const registerData = req.body;
    const result = await this.authService.register(registerData);
    return sendSuccess(
      res,
      { verifyEmailLink: result },
      201,
      " User registered successfully. Please check your email to verify your account."
    );
  };

  loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const loginData = req.body;
    const result = await this.authService.login(loginData);
    return sendSuccess(res, result, 200, "Logged in successfully");
  };

  verifyEmailHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.query.token as string;
    await this.authService.verifyEmail(token);
    return sendSuccess(res, {}, 200, "Email verified successfully");
  };

  refreshAccessTokenHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const refreshToken = req.body.refreshToken;
    const result = await this.authService.refreshAccessToken(refreshToken);
    return sendSuccess(res, result, 200, "Access token refreshed successfully");
  };

  forgetPasswordHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const email = req.body.email;
    const result = await this.authService.forgetPassword(email);
    return sendSuccess(
      res,
      result,
      200,
      "Please check your email to reset your password"
    );
  };

  resetPasswordHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    await this.authService.resetPassword(
      req.query.token as string,
      req.body.password
    );
    return sendSuccess(res, {}, 200, "Password has been reseted successfully");
  };

  logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization!.split(" ")[1];
    if (!token)
      return next(
        new AppErrors.AuthenticationError("Unauthorized access", {
          cause: "Missing or invalid token",
          header: "Authorization",
          expectedFormat: "Bearer <token>",
        })
      );
    await this.authService.logout(token!);
    return sendSuccess(res, {}, 200, "User logged out successfully");
  };
}

export default AuthController;
