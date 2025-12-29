import AppError from "./app.error";

class InternalServerError extends AppError {
  constructor(
    message: string = "Internal server error",
    details?: Record<string, unknown>
  ) {
    super(message, 500, "server", true, details); // Pass info to AppError

    Object.setPrototypeOf(this, new.target.prototype); // Fix prototype chain for instanceof to work (for older JS environments)
    Error.captureStackTrace(this, this.constructor); // Capture clean stack trace
  }
}

export default InternalServerError;
