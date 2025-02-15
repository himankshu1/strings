import logger from './config/logger';
import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import cors from 'cors';
import { Config } from './config';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.route';
import adminRoutes from './routes/admin.route';
import albumRoutes from './routes/album.route';
import songRoutes from './routes/song.route';
import statsRouter from './routes/stat.route';

//* creating an express instance
const app = express();

//* middlewares
app.use(express.json({ limit: '16kb' }));
app.use(
    cors({
        origin: Config.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/album', albumRoutes);
app.use('/api/song', songRoutes);
app.use('/api/stats', statsRouter);

//todo: implement socket io

//? Global Error Handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                message: err.message,
                path: '',
                location: '',
            },
        ],
    });
});

export default app;
