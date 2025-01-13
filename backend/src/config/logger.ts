import { Config } from "./index";
import winston from "winston";

const logger = winston.createLogger({
    level: "info",

    format: winston.format.json(),

    transports: [
        new winston.transports.File({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            filename: "combined.log",
            dirname: "logs",
            silent: Config.NODE_ENV === "test",
        }),

        new winston.transports.File({
            level: "error",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            filename: "error.log",
            dirname: "logs",
            silent: Config.NODE_ENV === "test",
        }),

        // new winston.transports.Console({
        //     level: "info",
        //     format: winston.format.combine(
        //         winston.format.timestamp(),
        //         winston.format.json()
        //     ),
        //     silent: Config.NODE_ENV === "test",
        // }),
    ],
});

export default logger;
