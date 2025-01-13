import logger from "./config/logger";
import app from "./app";
import { Config } from "./config";

const startServer = () => {
    try {
        app.listen(Config.PORT, () => {
            logger.warn("Server is listening on port", { port: Config.PORT });
            logger.error("Server is listening on port", { port: Config.PORT });
        });
    } catch (error) {
        console.log(`Error while initiating the server`);
        process.exit(1);
    }
};

startServer();
