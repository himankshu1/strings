import { config } from 'dotenv';

config();

const { PORT, NODE_ENV, CORS_ORIGIN, MONGODB_URI, JWT_SECRET, JWT_EXPIRY } =
    process.env;

export const Config: {
    PORT: string;
    NODE_ENV: string;
    CORS_ORIGIN: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRY: string;
} = {
    PORT: PORT || '3000',
    NODE_ENV: NODE_ENV || 'development',
    CORS_ORIGIN: CORS_ORIGIN || '*',
    MONGODB_URI: MONGODB_URI as string,
    JWT_SECRET: JWT_SECRET as string,
    JWT_EXPIRY: JWT_EXPIRY || '1h',
};
