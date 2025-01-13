import logger from "./config/logger";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";

const app = express();

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    res.send("hello");
});

//? Global Error Handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                message: err.message,
                path: "",
                location: "",
            },
        ],
    });
});

export default app;
