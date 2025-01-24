import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Config } from '../config';

export interface IRequestWithUser extends Request {
    user?: jwt.JwtPayload;
}

//* verifying the token
export const verifyJwt: any = async (
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        //* Retrieve token from cookies or Authorization header
        const token =
            req.cookies.token || req.headers.authorization?.split(' ')[1];

        // console.log('token :::', token);

        //* Check if the token exists
        if (!token) {
            console.log('token not found');

            return res.status(401).json({
                success: false,
                message: 'Unauthorized access. Please login again',
            });
        }

        //* Verify the JWT
        const decoded = jwt.verify(token, Config.JWT_SECRET) as jwt.JwtPayload;
        // console.log('decoded token :::', decoded);

        //* Add decoded information to the request object (optional)
        req.user = decoded;

        next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(401).json({
            success: false,
            message:
                'Something went wrong while verifying JWT. Verification failed',
        });
    }
};

//* checking if the request is from an admin user type
export const verifyAdmin = async (
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const { role } = req.user as jwt.JwtPayload;

    if (role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Not an admin user. Please login as admin user',
        });
    }

    next();
};
