import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { UserType } from "./user.type";

// Message Type
const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: {
    content: { type: new GraphQLNonNull(GraphQLString) },
    createdBy: { type: UserType },
    createdAt: { type: GraphQLString },
  },
});

// Chat Type
const ChatType = new GraphQLObjectType({
  name: "Chat",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    participants: { type: new GraphQLList(UserType) },
    messages: { type: new GraphQLList(MessageType) },
    group: { type: GraphQLString },
    group_image: { type: GraphQLString },
    roomId: { type: GraphQLString },
    createdBy: { type: UserType },
  },
});

// Get User Chat Response
const GetUserChatData = new GraphQLObjectType({
  name: "GetUserChatData",
  fields: {
    chat: { type: ChatType },
  },
});

export const GetUserChatResponse = new GraphQLObjectType({
  name: "GetUserChatResponse",
  fields: {
    status: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    statusCode: { type: new GraphQLNonNull(GraphQLInt) },
    data: { type: new GraphQLNonNull(GetUserChatData) },
  },
});

// Get Group Chat Response
const GetGroupChatData = new GraphQLObjectType({
  name: "GetGroupChatData",
  fields: {
    chat: { type: new GraphQLNonNull(ChatType) },
  },
});

export const GetGroupChatResponse = new GraphQLObjectType({
  name: "GetGroupChatResponse",
  fields: {
    status: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    statusCode: { type: new GraphQLNonNull(GraphQLInt) },
    data: { type: new GraphQLNonNull(GetGroupChatData) },
  },
});
