import AppError from "./app.error";

class NotFoundError extends AppError {
  constructor(
    message: string = "Resource not found",
    details?: Record<string, unknown>
  ) {
    super(message, 404, "client", true, details); // Pass info to AppError

    Object.setPrototypeOf(this, new.target.prototype); // Fix prototype chain for instanceof to work (for older JS environments)
    Error.captureStackTrace(this, this.constructor); // Capture clean stack trace
  }
}

export default NotFoundError;
