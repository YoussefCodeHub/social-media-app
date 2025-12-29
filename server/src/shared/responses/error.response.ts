import type { Response } from "express";

const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  data?: Record<string, unknown>
) => {
  return res.status(statusCode).json({
    status: "error",
    message,
    statusCode,
    data,
  });
};

export default sendError;
