class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public details?: Record<string, unknown>;
  public timestamp: Date;
  public readonly errorType!: "client" | "server";
  constructor(
    message: string,
    statusCode: number = 500,
    errorType: "client" | "server" = "server",
    isOperational: boolean = true,
    details?: Record<string, unknown>
  ) {
    super(message); // passes message to Error class
    this.name = this.constructor.name; // set the error name
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.isOperational = isOperational;
    this.details = details ?? {}; // the ?? (Nullish Coalescing Operator) means if undifined or null
    this.timestamp = new Date();

    Object.setPrototypeOf(this, new.target.prototype); // Fix prototype chain for instanceof to work (for older JS environments)
    Error.captureStackTrace(this, this.constructor); // Capture clean stack trace
  }
}

export default AppError;
