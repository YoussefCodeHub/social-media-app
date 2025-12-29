import connectMongoose from "./database/database.connection";
import app from "./app";
import chalk from "chalk";
import "dotenv/config";
import { initializeGateway } from "./modules/gateway/index";

const port: number = Number(process.env.PORT);

(async (): Promise<void> => {
  try {
    await connectMongoose();
    const httpServer = app.listen(port, () => {
      console.log(
        chalk.black.bgGreenBright("  SERVER  ") +
          chalk.greenBright(` App running on port ${port}`)
      );
    });

    // Initialize Socket.IO Gateway
    const io = initializeGateway(httpServer);
    console.log(
      chalk.black.bgCyanBright("  SOCKET  ") +
        chalk.cyanBright(" Socket.IO Gateway initialized")
    );
  } catch (error) {
    console.error(chalk.bgRed.black("Failed to start server:"), error);
    process.exit(1);
  }
})();
