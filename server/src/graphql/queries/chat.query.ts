import { GraphQLNonNull, GraphQLString } from "graphql";
import { GetUserChatResponse, GetGroupChatResponse } from "../types/chat.type";
import { authenticateGraphQL } from "../middlewares/auth.graphql.middleware";
import ChatService from "../../modules/chat/chat.service";
import { GraphQLContext } from "../context/context.interface";

const chatService = new ChatService();

const chatQueries = {
  getUserChat: {
    type: GetUserChatResponse,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: any, { userId }: any, context: GraphQLContext) => {
      const user = await authenticateGraphQL(context.req);
      const chat = await chatService.getChatBetweenUsers(user._id, userId);
      return {
        status: "success",
        message: chat ? "Chat retrieved successfully" : "No chat found",
        statusCode: 200,
        data: { chat },
      };
    },
  },

  getGroupChat: {
    type: GetGroupChatResponse,
    args: {
      groupId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: any, { groupId }: any, context: GraphQLContext) => {
      const user = await authenticateGraphQL(context.req);
      const chat = await chatService.getGroupChat(groupId);
      return {
        status: "success",
        message: "Group chat retrieved successfully",
        statusCode: 200,
        data: { chat },
      };
    },
  },
};

export default chatQueries;
