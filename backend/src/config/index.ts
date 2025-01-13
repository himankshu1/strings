import { config } from "dotenv";

config();

const { PORT, NODE_ENV, CORS_ORIGIN, MONGODB_URI } = process.env;

export const Config = {
    PORT,
    NODE_ENV,
    CORS_ORIGIN,
    MONGODB_URI,
};
