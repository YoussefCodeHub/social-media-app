import AppError from "./app.error";

class RateLimitError extends AppError {
  constructor(
    message: string = "Too many requests",
    details?: Record<string, unknown>
  ) {
    super(message, 429, "client", true, details); // Pass info to AppError

    Object.setPrototypeOf(this, new.target.prototype); // Fix prototype chain for instanceof to work (for older JS environments)
    Error.captureStackTrace(this, this.constructor); // Capture clean stack trace
  }
}

export default RateLimitError;
