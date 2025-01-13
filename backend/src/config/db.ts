import mongoose from "mongoose";
import { Config } from "./index";
import logger from "./logger";

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(Config.MONGODB_URI as string);
        console.log("connected to mongodb");
    } catch (error) {
        if (error instanceof Error) {
            logger.error("MongoDB connection error", { error: error.message });
        } else {
            logger.error("Unknown error occurred while connecting to mongodb", {
                error: JSON.stringify(error),
            });
        }

        process.exit(1);
    }
};
