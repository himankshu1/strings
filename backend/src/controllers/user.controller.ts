import { Request, Response } from 'express';
import { createUser, signinUser } from '../services/user.service';
import { IRequestWithUser } from '../middlewares/auth.middleware';
import { UserModel } from '../models/user.model';
import logger from '../config/logger';

export const getCurrentUser = async (req: IRequestWithUser, res: Response) => {
    try {
        const currentUser = await UserModel.findById(req.user?.id).select(
            '-password'
        );

        if (!currentUser) {
            res.status(404).json({
                success: false,
                message: 'User not found. Please login again',
                data: null,
            });
        }

        res.status(200).json({
            success: true,
            message: 'User found',
            data: currentUser,
        });
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Error while getting current user', {
                error: error.message,
            });
        } else {
            logger.error('Error while getting current user', {
                error: JSON.stringify(error),
            });
        }
    }
};

export const registerUser: any = async (req: Request, res: Response) => {
    //* validate request
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
            data: null,
        });
    }

    //* call service
    const { result } = await createUser(req.body, res);

    if (result.error) {
        return res.status(500).json({
            success: false,
            message: result.message,
            data: {},
        });
    }

    //* return response
    return res
        .cookie('token', result.token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        .status(201)
        .json({
            success: true,
            message: 'User created successfully',
            data: result.user,
        });
};

export const loginUser: any = async (req: Request, res: Response) => {
    //* validate request
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
            data: null,
        });
    }

    //* call service
    const { result } = await signinUser(req.body);

    //* return response
    if (result.error) {
        return res
            .status(400)
            .json({ success: false, message: result.message, data: null });
    }

    return res
        .cookie('token', result.token, {
            secure: true,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
            success: true,
            message: 'User logged in successfully',
            data: result.isUserFound,
        });
};

export const logoutUser: any = async (req: IRequestWithUser, res: Response) => {
    const isUserFound = await UserModel.findOne({ email: req.user?.email });

    if (!isUserFound) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized access. Please login again',
        });
    }

    res.clearCookie('token').json({
        success: true,
        message: 'User logged out successfully',
    });
};

export const getAllUsers = async (req: IRequestWithUser, res: Response) => {
    try {
        const currentUserId = req.user?.id;

        //* not fetching the current user
        const allUsers = await UserModel.find({ _id: { $ne: currentUserId } });

        if (!allUsers) {
            res.status(404).json({
                success: false,
                message: 'no users found',
                data: [],
            });
        }

        res.status(200).json({
            success: true,
            message: 'users found',
            data: allUsers,
        });
    } catch (error) {
        console.log(error);
        logger.error('Something went wrong while fetching all users', {
            error: JSON.stringify(error),
        });
    }
};
