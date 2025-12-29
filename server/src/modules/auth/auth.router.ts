import { Router } from "express";
import UserModel from "../../database/models/user.model";
import RevokedTokenModel from "../../database/models/revoked-token.model";
import AuthRepository from "./auth.repository";
import UserRepository from "../user/user.repository";
import DatabaseRepository from "../../database/database.repository";
import AuthService from "./auth.service";
import AuthController from "./auth.controller";
import * as authvalidator from "./auth.validator";
import validationMiddleware from "../../middlewares/validation.middleware";
import { authentication } from "../../middlewares/auth.middleware";

// Setup dependencies
const authRepo = new AuthRepository(UserModel);
const userRepo = new UserRepository(UserModel);
const revokedTokenRepo = new DatabaseRepository(RevokedTokenModel);
const authService = new AuthService(authRepo, userRepo, revokedTokenRepo);
const authController = new AuthController(authService);
const authRouter = Router();

authRouter.post(
  "/signup",
  validationMiddleware(authvalidator.registerSchema),
  authController.registerHandler
);
authRouter.post(
  "/signin",
  validationMiddleware(authvalidator.loginSchema),
  authController.loginHandler
);

authRouter.get(
  "/confirm-email",
  validationMiddleware(authvalidator.confirmEmailSchema),
  authController.verifyEmailHandler
);

authRouter.post(
  "/refresh-token",
  validationMiddleware(authvalidator.refreshAccessTokenSchema),
  authController.refreshAccessTokenHandler
);

authRouter.post(
  "/forget-password",
  validationMiddleware(authvalidator.forgetPasswordSchema),
  authController.forgetPasswordHandler
);

authRouter.post(
  "/reset-password",
  validationMiddleware(authvalidator.resetPasswordSchema),
  authController.resetPasswordHandler
);

authRouter.post(
  "/signout",
  validationMiddleware(authvalidator.logoutSchema),
  authentication,
  authController.logoutHandler
);

export default authRouter;
