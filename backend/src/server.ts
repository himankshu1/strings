import logger from "./config/logger";
import app from "./app";
import { Config } from "./config";
import { connectToMongoDB } from "./config/db";

const startServer = async () => {
    try {
        await connectToMongoDB();

        app.listen(Config.PORT, () => {
            logger.info("Server is listening on port", { port: Config.PORT });
        });
    } catch (error) {
        console.log(`Error while initiating the server`);
        process.exit(1);
    }
};

startServer();
