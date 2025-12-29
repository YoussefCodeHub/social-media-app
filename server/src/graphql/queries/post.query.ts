import { GetPostsInput, GetPostsResponse } from "../types/post.type";
import { authenticateGraphQL } from "../middlewares/auth.graphql.middleware";
import PostModel from "../../database/models/post.model";
import PostRepository from "../../modules/post/post.repository";
import PostService from "../../modules/post/post.service";
import { IGetPostsDTO } from "../../modules/post/post.dto";
import { GraphQLContext } from "../context/context.interface";

const postRepo = new PostRepository(PostModel);
const postService = new PostService(postRepo);

const postQueries = {
  getPosts: {
    type: GetPostsResponse,
    args: {
      input: { type: GetPostsInput },
    },
    resolve: async (
      parent: any,
      { input }: { input: IGetPostsDTO },
      context: GraphQLContext
    ) => {
      const user = await authenticateGraphQL(context.req);
      const result = await postService.getPosts(user._id, input);
      return {
        status: "success",
        message: "Posts retrieved successfully",
        statusCode: 200,
        data: result,
      };
    },
  },
};

export default postQueries;
