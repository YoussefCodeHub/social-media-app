import type { Request, Response, NextFunction } from "express";
import { sendFail, sendError } from "../shared/responses/index";
import { AppError, InternalServerError } from "../shared/errors/index";

// Global error-handling middleware
const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = err instanceof AppError ? err : new InternalServerError(); // Convert unknown errors to InternalServerError
  if (error.errorType === "client")
    return sendFail(res, error.details ?? {}, error.statusCode, error.message); // Send a safe error response to the client
  console.error("[SERVER ERROR]", err); // Log full error (not the safe one) details for debugging
  return sendError(res, error.message, error.statusCode, error.details ?? {}); // Send a safe error response to the client
};

export default errorHandler;
