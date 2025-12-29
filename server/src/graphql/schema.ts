import { GraphQLSchema, GraphQLObjectType } from "graphql";
import authMutations from "./mutations/auth.mutation";
import userMutations from "./mutations/user.mutation";
import userQueries from "./queries/user.query";
import postQueries from "./queries/post.query";
import chatQueries from "./queries/chat.query";

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQueries,
    ...postQueries,
    ...chatQueries,
  },
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...authMutations,
    ...userMutations,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
