import { config } from 'dotenv';

config();

const {
    PORT,
    NODE_ENV,
    CORS_ORIGIN,
    MONGODB_URI,
    JWT_SECRET,
    JWT_EXPIRY,
    CLOUDINARY_URL,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
} = process.env;

export const Config: {
    PORT: string;
    NODE_ENV: string;
    CORS_ORIGIN: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRY: string;
    CLOUDINARY_URL: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
} = {
    PORT: PORT || '3000',
    NODE_ENV: NODE_ENV || 'development',
    CORS_ORIGIN: CORS_ORIGIN || '*',
    MONGODB_URI: MONGODB_URI as string,
    JWT_SECRET: JWT_SECRET as string,
    JWT_EXPIRY: JWT_EXPIRY || '1h',
    CLOUDINARY_URL: CLOUDINARY_URL as string,
    CLOUDINARY_CLOUD_NAME: CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_API_KEY: CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRET: CLOUDINARY_API_SECRET as string,
};
