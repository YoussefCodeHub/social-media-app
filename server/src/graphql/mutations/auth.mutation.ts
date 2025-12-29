import { GraphQLNonNull } from "graphql";
import {
  SignupInput,
  SignupResponse,
  SigninInput,
  SigninResponse,
} from "../types/auth.type";
import UserModel from "../../database/models/user.model";
import RevokedTokenModel from "../../database/models/revoked-token.model";
import AuthRepository from "../../modules/auth/auth.repository";
import UserRepository from "../../modules/user/user.repository";
import DatabaseRepository from "../../database/database.repository";
import AuthService from "../../modules/auth/auth.service";
import { ILoginDTO, IRigsterDTO } from "../../modules/auth/auth.dto";

const authRepo = new AuthRepository(UserModel);
const userRepo = new UserRepository(UserModel);
const revokedTokenRepo = new DatabaseRepository(RevokedTokenModel);
const authService = new AuthService(authRepo, userRepo, revokedTokenRepo);

const authMutations = {
  signup: {
    type: SignupResponse,
    args: {
      input: { type: new GraphQLNonNull(SignupInput) },
    },
    resolve: async (_: any, { input }: { input: IRigsterDTO }) => {
      const verifyEmailLink = await authService.register(input);
      return {
        status: "success",
        message:
          "User registered successfully. Please check your email to verify your account.",
        statusCode: 201,
        data: { verifyEmailLink },
      };
    },
  },

  signin: {
    type: SigninResponse,
    args: {
      input: { type: new GraphQLNonNull(SigninInput) },
    },
    resolve: async (parent: any, { input }: { input: ILoginDTO }) => {
      const result = await authService.login(input);
      return {
        status: "success",
        message: "Logged in successfully",
        statusCode: 200,
        data: result,
      };
    },
  },
};

export default authMutations;
