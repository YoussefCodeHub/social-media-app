import type { Request, Response, NextFunction } from "express";
import UserService from "./user.service";
import { sendSuccess } from "../../shared/responses";

class UserController {
  constructor(private readonly userService: UserService) {}

  getProfileHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const profile = await this.userService.getProfile(req.user?.id);
    return sendSuccess(res, { profile }, 200, "Profile retrieved successfully");
  };

  updateProfileHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const updatedUser = await this.userService.updateProfile(
      req.user?.id,
      req.body
    );
    return sendSuccess(res, { user: updatedUser }, 200, "Profile updated");
  };

  updatePasswordHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { oldPassword, password } = req.body;
    await this.userService.updatePassword(req.user?.id, oldPassword, password);
    return sendSuccess(res, {}, 200, "Password updated successfully");
  };

  uploadProfilePictureHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.file) throw new Error("No file uploaded");
    const profilePicture = await this.userService.uploadProfilePicture(
      req.user?.id,
      req.file
    );
    return sendSuccess(
      res,
      { profilePicture },
      200,
      "Profile picture updated successfully"
    );
  };

  sendFriendRequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { receiverId } = req.body;
    const request = await this.userService.sendFriendRequest(
      req.user?.id,
      receiverId
    );
    return sendSuccess(
      res,
      { request },
      201,
      "Friend request sent successfully"
    );
  };

  acceptFriendRequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { requestId } = req.params;
    const result = await this.userService.acceptFriendRequest(
      req.user?.id,
      requestId!
    );
    return sendSuccess(
      res,
      result,
      200,
      "Friend request accepted successfully"
    );
  };
}

export default UserController;
