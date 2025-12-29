import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from "graphql";

// Enums
export const GenderEnum = new GraphQLEnumType({
  name: "Gender",
  values: {
    MALE: { value: "male" },
    FEMALE: { value: "female" },
  },
});

export const RoleEnum = new GraphQLEnumType({
  name: "Role",
  values: {
    USER: { value: "user" },
    ADMIN: { value: "admin" },
  },
});

// Input Types
export const SignupInput = new GraphQLInputObjectType({
  name: "SignupInput",
  fields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    gender: { type: new GraphQLNonNull(GenderEnum) },
    birthDate: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    confirmPassword: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    role: { type: new GraphQLNonNull(RoleEnum) },
  },
});

export const SigninInput = new GraphQLInputObjectType({
  name: "SigninInput",
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});

// Response Types
const SignupData = new GraphQLObjectType({
  name: "SignupData",
  fields: {
    verifyEmailLink: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const SignupResponse = new GraphQLObjectType({
  name: "SignupResponse",
  fields: {
    status: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    statusCode: { type: new GraphQLNonNull(GraphQLInt) },
    data: { type: new GraphQLNonNull(SignupData) },
  },
});

const SigninData = new GraphQLObjectType({
  name: "SigninData",
  fields: {
    accessToken: { type: new GraphQLNonNull(GraphQLString) },
    refreshToken: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const SigninResponse = new GraphQLObjectType({
  name: "SigninResponse",
  fields: {
    status: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    statusCode: { type: new GraphQLNonNull(GraphQLInt) },
    data: { type: new GraphQLNonNull(SigninData) },
  },
});
