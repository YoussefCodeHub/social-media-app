import type { Response } from "express";

const sendSuccess = (
  res: Response,
  data: Record<string, unknown>,
  statusCode: number = 200,
  message?: string
) => {
  return res.status(statusCode).json({
    status: "success",
    data,
    message: message || "Request successful",
    statusCode,
  });
};

export default sendSuccess;
