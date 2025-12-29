import type { Response } from "express";

const sendFail = (
  res: Response,
  data: Record<string, unknown>,
  statusCode: number = 400,
  message?: string
) => {
  return res.status(statusCode).json({
    status: "fail",
    data,
    message: message || "Request failed",
    statusCode,
  });
};

export default sendFail;
