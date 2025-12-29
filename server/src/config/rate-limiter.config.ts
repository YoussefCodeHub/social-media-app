import rateLimit from "express-rate-limit";
import type { RateLimitRequestHandler } from "express-rate-limit";

// General API limiter
export const generalLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum 100 requests per IP
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

// Login limiter
export const authLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Maximum 5 login attempts
  message: "Too many login attempts, please try again after 15 minutes.",
  skipSuccessfulRequests: false,
});

// Registration limiter
export const registerLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Maximum 3 accounts per IP
  message:
    "Too many accounts created from this IP, please try again after an hour.",
});

// Strict limiter (sensitive APIs)
export const strictLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: "Too many requests, please try again later.",
});
