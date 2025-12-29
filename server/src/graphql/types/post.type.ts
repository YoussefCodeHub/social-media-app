import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from "graphql";
import { UserType } from "./user.type";

// Availability Enum
const AvailabilityEnum = new GraphQLEnumType({
  name: "Availability",
  values: {
    PUBLIC: { value: "PUBLIC" },
    FRIENDS: { value: "FRIENDS" },
    ONLYME: { value: "ONLYME" },
  },
});

// Post Type
const PostType = new GraphQLObjectType({
  name: "FullPost",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLString },
    attachments: { type: new GraphQLList(GraphQLString) },
    availability: { type: AvailabilityEnum },
    likes: { type: new GraphQLList(UserType) },
    tags: { type: new GraphQLList(UserType) },
    createdBy: { type: UserType },
    createdAt: { type: GraphQLString },
  },
});

// Get Posts Input
export const GetPostsInput = new GraphQLInputObjectType({
  name: "GetPostsInput",
  fields: {
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    availability: { type: AvailabilityEnum },
  },
});

// Get Posts Response
const GetPostsData = new GraphQLObjectType({
  name: "GetPostsData",
  fields: {
    posts: { type: new GraphQLList(PostType) },
    total: { type: new GraphQLNonNull(GraphQLInt) },
    page: { type: new GraphQLNonNull(GraphQLInt) },
    limit: { type: new GraphQLNonNull(GraphQLInt) },
    totalPages: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export const GetPostsResponse = new GraphQLObjectType({
  name: "GetPostsResponse",
  fields: {
    status: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    statusCode: { type: new GraphQLNonNull(GraphQLInt) },
    data: { type: new GraphQLNonNull(GetPostsData) },
  },
});
