import { ProfileResponse } from "../types/user.type";
import { authenticateGraphQL } from "../middlewares/auth.graphql.middleware";
import UserModel from "../../database/models/user.model";
import FriendRequestModel from "../../database/models/friend-request.model";
import PostModel from "../../database/models/post.model";
import CommentModel from "../../database/models/comment.model";
import UserRepository from "../../modules/user/user.repository";
import UserService from "../../modules/user/user.service";
import { GraphQLContext } from "../context/context.interface";

const userRepo = new UserRepository(UserModel);
const userService = new UserService(
  userRepo,
  FriendRequestModel,
  PostModel,
  CommentModel
);

const userQueries = {
  profile: {
    type: ProfileResponse,
    resolve: async (parent: any, { input }: any, context: GraphQLContext) => {
      const user = await authenticateGraphQL(context.req);
      const profile = await userService.getProfile(user._id);
      return {
        status: "success",
        message: "Profile retrieved successfully",
        statusCode: 200,
        data: { profile },
      };
    },
  },
};

export default userQueries;
