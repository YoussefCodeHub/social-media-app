import { GraphQLNonNull } from "graphql";
import { UpdateProfileInput, UpdateProfileResponse } from "../types/user.type";
import { authenticateGraphQL } from "../middlewares/auth.graphql.middleware";
import UserModel from "../../database/models/user.model";
import FriendRequestModel from "../../database/models/friend-request.model";
import PostModel from "../../database/models/post.model";
import CommentModel from "../../database/models/comment.model";
import UserRepository from "../../modules/user/user.repository";
import UserService from "../../modules/user/user.service";
import { GraphQLContext } from "../context/context.interface";
import { IUpdateProfileDTO } from "../../modules/user/user.dto";

const userRepo = new UserRepository(UserModel);
const userService = new UserService(
  userRepo,
  FriendRequestModel,
  PostModel,
  CommentModel
);

const userMutations = {
  updateProfile: {
    type: UpdateProfileResponse,
    args: {
      input: { type: new GraphQLNonNull(UpdateProfileInput) },
    },
    resolve: async (
      parent: any,
      { input }: { input: IUpdateProfileDTO },
      context: GraphQLContext
    ) => {
      const user = await authenticateGraphQL(context.req);
      const updatedUser = await userService.updateProfile(user._id, input);
      return {
        status: "success",
        message: "Profile updated successfully",
        statusCode: 200,
        data: { user: updatedUser },
      };
    },
  },
};

export default userMutations;
