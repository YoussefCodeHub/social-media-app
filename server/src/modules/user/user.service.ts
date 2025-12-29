import UserRepository from "./user.repository";
import { compare } from "../../utils/hash.util";
import { uploadToS3, deleteFromS3 } from "../../utils/s3.util";
import type { IUser, UpdateUser } from "../../shared/types/user.type";
import * as AppErrors from "../../shared/errors";
import { IUpdateProfileDTO } from "./user.dto";
import type { HydratedDocument, Types, Model } from "mongoose";
import type { IFriendRequest } from "../../shared/types/friend-request.type";
import type { IPost } from "../../shared/types/post.type";
import type { IComment } from "../../shared/types/comment.type";
import { ChatModel } from "../../database/models/chat.model";

class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly friendRequestModel: Model<IFriendRequest>,
    private readonly postModel: Model<IPost>,
    private readonly commentModel: Model<IComment>
  ) {}

  async getProfile(userId: Types.ObjectId): Promise<{
    user: any;
    friends: any[];
    posts: any[];
    comments: any[];
    groups: any[];
    friendRequests: {
      sent: any[];
      received: any[];
    };
  }> {
    // Get user info
    const user = await this.userRepo.findUserWithFriends(userId);
    if (!user) throw new AppErrors.NotFoundError("User not found");

    // Get user's posts
    const posts = await this.postModel
      .find({ createdBy: userId, frozenAt: null })
      .populate("createdBy", "firstName lastName profilePicture")
      .populate("tags", "firstName lastName profilePicture")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Get user's comments
    const comments = await this.commentModel
      .find({ createdBy: userId, frozenAt: null })
      .populate("createdBy", "firstName lastName profilePicture")
      .populate("postId", "_id content")
      .populate("tags", "firstName lastName profilePicture")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Get user's groups
    const groups = await ChatModel.find({
      participants: userId,
      group: { $exists: true },
    } as any)
      .select("_id group group_image roomId participants")
      .lean()
      .exec();

    // Get sent friend requests
    const sentRequests = await this.friendRequestModel
      .find({ createdBy: userId })
      .populate("sendTo", "firstName lastName profilePicture")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Get received friend requests
    const receivedRequests = await this.friendRequestModel
      .find({ sendTo: userId })
      .populate("createdBy", "firstName lastName profilePicture")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Remove sensitive data from user
    const userObject = user.toObject();
    const { password, deletedAt, deletedBy, ...safeUser } = userObject;

    return {
      user: safeUser,
      friends: safeUser.friends || [],
      posts,
      comments,
      groups,
      friendRequests: {
        sent: sentRequests,
        received: receivedRequests,
      },
    };
  }

  async updateProfile(
    userId: Types.ObjectId,
    data: IUpdateProfileDTO
  ): Promise<HydratedDocument<IUser>> {
    const updatedUser = await this.userRepo.updateUser(
      userId,
      data as UpdateUser
    );
    if (!updatedUser) throw new AppErrors.NotFoundError("User not found");
    return updatedUser;
  }

  async updatePassword(
    userId: Types.ObjectId,
    oldPassword: string,
    password: string
  ): Promise<void> {
    const user = await this.userRepo.findUser(userId);
    if (!user) throw new AppErrors.NotFoundError("User not found");

    const isValid = await compare(oldPassword, user.password);
    if (!isValid)
      throw new AppErrors.AuthenticationError("Old password is not correct");

    // Password will be hashed by pre-save hook
    user.password = password;
    await user.save();
  }

  async uploadProfilePicture(
    userId: Types.ObjectId,
    file: Express.Multer.File
  ): Promise<string> {
    const user = await this.userRepo.findUser(userId);
    if (!user) throw new AppErrors.NotFoundError("User not found");

    // Delete old picture if exists
    if (user.profilePicture) {
      const oldKey = user.profilePicture.split("/").slice(-2).join("/"); // profile/filename.jpg
      await deleteFromS3(oldKey);
    }

    // Upload new picture
    const key = `profile/${Date.now()}-${file.originalname}`;
    const s3Url = await uploadToS3(file.buffer, key, file.mimetype);

    // Update user
    user.profilePicture = s3Url;
    await user.save();

    return s3Url;
  }

  async sendFriendRequest(
    userId: Types.ObjectId,
    receiverId: string
  ): Promise<IFriendRequest> {
    const receiverObjectId = receiverId as unknown as Types.ObjectId;

    // Check if receiver exists
    const receiver = await this.userRepo.findById(receiverObjectId);
    if (!receiver) throw new AppErrors.NotFoundError("User not found");

    // Check if trying to send to self
    if (userId.toString() === receiverObjectId.toString())
      throw new AppErrors.ValidationError(
        "You cannot send friend request to yourself"
      );

    // Check if already friends
    const isAlreadyFriend = await this.userRepo.checkIfFriends(
      userId,
      receiverObjectId
    );
    if (isAlreadyFriend)
      throw new AppErrors.ValidationError("You are already friends");

    // Check if request already sent
    const existingRequest = await this.friendRequestModel
      .findOne({
        createdBy: userId,
        sendTo: receiverObjectId,
        status: "PENDING",
      })
      .exec();

    if (existingRequest)
      throw new AppErrors.ValidationError(
        "Friend request already sent to this user"
      );

    // Check if receiver already sent request
    const reverseRequest = await this.friendRequestModel
      .findOne({
        createdBy: receiverObjectId,
        sendTo: userId,
        status: "PENDING",
      })
      .exec();

    if (reverseRequest)
      throw new AppErrors.ValidationError(
        "This user has already sent you a friend request. Please accept it instead"
      );

    // Create friend request
    const friendRequest = await this.friendRequestModel.create({
      createdBy: userId,
      sendTo: receiverObjectId,
      status: "PENDING",
    });

    return friendRequest;
  }

  async acceptFriendRequest(
    userId: Types.ObjectId,
    requestId: string
  ): Promise<{ request: IFriendRequest; message: string }> {
    const requestObjectId = requestId as unknown as Types.ObjectId;

    // Find the friend request
    const friendRequest = await this.friendRequestModel
      .findById(requestObjectId)
      .exec();

    if (!friendRequest)
      throw new AppErrors.NotFoundError("Friend request not found");

    // Check if the user is the receiver
    if (friendRequest.sendTo.toString() !== userId.toString())
      throw new AppErrors.AuthorizationError(
        "You are not authorized to accept this request"
      );

    // Check if already accepted or rejected
    if (friendRequest.status !== "PENDING")
      throw new AppErrors.ValidationError(
        `Friend request already ${friendRequest.status.toLowerCase()}`
      );

    // Update friend request status
    friendRequest.status = "ACCEPTED";
    friendRequest.acceptedAt = new Date();
    await friendRequest.save();

    // Add both users to each other's friends list
    await this.userRepo.addFriend(userId, friendRequest.createdBy);
    await this.userRepo.addFriend(friendRequest.createdBy, userId);

    return {
      request: friendRequest,
      message: "Friend request accepted successfully",
    };
  }
}

export default UserService;
