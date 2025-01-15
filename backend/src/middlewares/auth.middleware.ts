import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Config } from '../config';

export interface IRequestWithUser extends Request {
    user?: jwt.JwtPayload;
}

export const verifyJwt = async (
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        // Retrieve token from cookies or Authorization header
        const token =
            req.cookies.token || req.headers.authorization?.split(' ')[1];

        // Check if the token exists
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized access. Please login again',
            });
        }

        // Verify the JWT
        const decoded = jwt.verify(token, Config.JWT_SECRET) as jwt.JwtPayload;

        // Add decoded information to the request object (optional)
        req.user = decoded;

        next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token. Please login again.',
        });
    }
};
