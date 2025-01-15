import { Request, Response } from 'express';
import { createUser, signinUser } from '../services/user.service';
import { IRequestWithUser } from '../middlewares/auth.middleware';
import { UserModel } from '../models/user.model';

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
        .cookie('token', result.token, { httpOnly: true, secure: true })
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
        .cookie('token', result.token, { secure: true, httpOnly: true })
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
