import AuthRepository from "./auth.repository";
import UserRepository from "../user/user.repository";
import DatabaseRepository from "../../database/database.repository";
import * as authDto from "./auth.dto";
import * as appErrors from "../../shared/errors/index";
import { compare } from "../../utils/hash.util";
import { generateToken, verifyToken } from "../../utils/token.util";
import sendEmail from "../../utils//send-email.util";
import * as authConstants from "../../shared/constants/auth.constant";
import type { IRevokedToken } from "../../shared/types/revoked-token.type";
import { randomUUID } from "crypto";
import type { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

class AuthService {
  constructor(
    private readonly AuthRepo: AuthRepository,
    private readonly UserRepo: UserRepository,
    private readonly RevokedTokenRepo: DatabaseRepository<IRevokedToken>
  ) {}

  async register(data: authDto.IRigsterDTO): Promise<string> {
    const { email, password, phone } = data;

    if (await this.AuthRepo.findByEmail(email))
      throw new appErrors.ConflictError("Email already registered", { email });

    const newUser = await this.AuthRepo.register({
      ...data,
      password, // Will be hashed by pre-save hook
      phone, // Will be encrypted by pre-save hook
    });

    const verifyEmailToken = await generateToken(
      { id: newUser._id },
      Number(process.env.JWT_CONFIRM_EMAIL_EXPIRATION)
    );

    const verifyEmailLink = `${process.env.BASE_URL}/api/auth/confirm-email?token=${verifyEmailToken}`;

    await sendEmail(
      newUser.email,
      authConstants.EMAIL.SUBJECT.VERIFY_EMAIL,
      authConstants.EMAIL.BODY.HTML.CONFIRM_EMAIL_TOKEN(verifyEmailLink)
    );
    return verifyEmailLink;
  }

  async login(data: authDto.ILoginDTO): Promise<Record<string, unknown>> {
    const { email, password } = data;
    const user = await this.AuthRepo.findOne({ email });
    const isValid: boolean =
      email && password && user?.password
        ? await compare(password, user.password)
        : false;
    if (!isValid)
      throw new appErrors.AuthenticationError("Invalid email or password");
    if (!user?.confirmEmail)
      throw new appErrors.AuthorizationError(
        "Your email address is not verified. Please verify your email to continue.",
        {
          email: user?.email,
        }
      );
    const accessToken = await generateToken(
      { id: user._id, jti: randomUUID() },
      Number(process.env.JWT_ACCESS_EXPIRATION)
    );
    const refreshToken = await generateToken(
      { id: user._id, jti: randomUUID() },
      Number(process.env.JWT_REFRESH_EXPIRATION)
    );

    return { accessToken, refreshToken };
  }

  async verifyEmail(token: string): Promise<void> {
    const decoded = verifyToken(token) as JwtPayload;
    const user = await this.UserRepo.findUser(decoded.id);
    if (!user) throw new appErrors.NotFoundError("User not found");
    user.confirmEmail = new Date();
    await user.save();
  }

  async refreshAccessToken(
    refreshToken: string
  ): Promise<Record<string, unknown>> {
    const decoded = verifyToken(refreshToken) as JwtPayload;
    const user = await this.UserRepo.findUser(decoded.id);
    if (!user) throw new appErrors.NotFoundError("User not found");
    const newAccessToken = await generateToken(
      { id: user._id, jti: randomUUID() },
      Number(process.env.JWT_ACCESS_EXPIRATION)
    );
    return { newAccessToken };
  }

  async forgetPassword(email: string): Promise<Record<string, unknown>> {
    const user = await this.UserRepo.findOne({ email });
    if (!user)
      throw new appErrors.NotFoundError("Email not found", {
        email,
      });

    const resetPasswordToken = await generateToken(
      { id: user._id },
      Number(process.env.JWT_RESET_PASSWORD_EXPIRATION)
    );
    const resetPasswordLink = `${process.env.BASE_URL}/api/auth/reset-password?token=${resetPasswordToken}`;
    await sendEmail(
      user.email,
      authConstants.EMAIL.SUBJECT.RESET_PASSWORD,
      authConstants.EMAIL.BODY.HTML.RESET_PASSWORD(resetPasswordLink)
    );
    return { resetPasswordLink };
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const decoded = verifyToken(token) as JwtPayload;
    const user = await this.UserRepo.findUser(decoded.id);
    if (!user) throw new appErrors.NotFoundError("User not found");
    user.password = password;
    await user.save();
  }

  async logout(token: string): Promise<void> {
    const decoded = verifyToken(token) as any;
    await this.RevokedTokenRepo.create({
      jti: decoded.jti,
      userId: decoded.id,
      expiresAt: new Date(decoded.exp * 1000),
    });
  }
}

export default AuthService;
