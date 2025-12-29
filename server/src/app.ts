import { notFoundHandler, errorHandler } from "./middlewares/index";
import { rateLimtter } from "./config/index";
import authRoutes from "./modules/auth/auth.router";
import userRoutes from "./modules/user/user.router";
import postRoutes from "./modules/post/post.router";
import chatRoutes from "./modules/chat/chat.router";
import { graphqlHandler } from "./graphql/index";

import express from "express";
import type { Application } from "express";
import cors from "cors";
import "dotenv/config";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimtter.generalLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/chat", chatRoutes);
app.all("/graphql", graphqlHandler);

// Handle invalid endpoints or HTTP methods
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;
