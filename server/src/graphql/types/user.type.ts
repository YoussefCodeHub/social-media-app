import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from "graphql";
import { GenderEnum, RoleEnum } from "./auth.type";

// User Type
export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    fullName: { type: GraphQLString },
    gender: { type: new GraphQLNonNull(GenderEnum) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(RoleEnum) },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    friends: { type: new GraphQLList(UserType) },
  }),
});

// Simple Types
const PostType = new GraphQLObjectType({
  name: "Post",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLString },
    createdBy: { type: UserType },
  },
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLString },
    createdBy: { type: UserType },
  },
});

const GroupType = new GraphQLObjectType({
  name: "Group",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    group: { type: GraphQLString },
    roomId: { type: GraphQLString },
  },
});

const FriendRequestType = new GraphQLObjectType({
  name: "FriendRequest",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    createdBy: { type: UserType },
    sendTo: { type: UserType },
  },
});

const FriendRequestsData = new GraphQLObjectType({
  name: "FriendRequestsData",
  fields: {
    sent: { type: new GraphQLList(FriendRequestType) },
    received: { type: new GraphQLList(FriendRequestType) },
  },
});

// Profile Data
const ProfileData = new GraphQLObjectType({
  name: "ProfileData",
  fields: {
    user: { type: new GraphQLNonNull(UserType) },
    friends: { type: new GraphQLList(UserType) },
    posts: { type: new GraphQLList(PostType) },
    comments: { type: new GraphQLList(CommentType) },
    groups: { type: new GraphQLList(GroupType) },
    friendRequests: { type: new GraphQLNonNull(FriendRequestsData) },
  },
});

const ProfileResponseData = new GraphQLObjectType({
  name: "ProfileResponseData",
  fields: {
    profile: { type: new GraphQLNonNull(ProfileData) },
  },
});

export const ProfileResponse = new GraphQLObjectType({
  name: "ProfileResponse",
  fields: {
    status: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    statusCode: { type: new GraphQLNonNull(GraphQLInt) },
    data: { type: new GraphQLNonNull(ProfileResponseData) },
  },
});

// Update Profile Input
export const UpdateProfileInput = new GraphQLInputObjectType({
  name: "UpdateProfileInput",
  fields: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    gender: { type: GenderEnum },
    birthDate: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
  },
});

const UpdateProfileData = new GraphQLObjectType({
  name: "UpdateProfileData",
  fields: {
    user: { type: new GraphQLNonNull(UserType) },
  },
});

export const UpdateProfileResponse = new GraphQLObjectType({
  name: "UpdateProfileResponse",
  fields: {
    status: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    statusCode: { type: new GraphQLNonNull(GraphQLInt) },
    data: { type: new GraphQLNonNull(UpdateProfileData) },
  },
});
