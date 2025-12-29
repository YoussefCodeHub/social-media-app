import AppError from "./app.error";

class AuthenticationError extends AppError {
  constructor(
    message: string = "You are not authorized",
    details?: Record<string, unknown>
  ) {
    super(message, 401, "client", true, details); // Pass info to AppError

    Object.setPrototypeOf(this, new.target.prototype); // Fix prototype chain for instanceof to work (for older JS environments)
    Error.captureStackTrace(this, this.constructor); // Capture clean stack trace
  }
}

export default AuthenticationError;
