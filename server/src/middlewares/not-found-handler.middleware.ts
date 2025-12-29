import NotFoundError from "../shared/errors/not-found.error";
import type { Request, Response, NextFunction } from "express";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const message = `Route not found: ${req.method} ${req.originalUrl}`;
  const details = {
    method: req.method,
    path: req.originalUrl,
    officialMessage: "The requested endpoint does not exist on this server.",
    hint: "Check the endpoint or HTTP method.",
  };

  return next(new NotFoundError(message, details));
};

export default notFoundHandler;
