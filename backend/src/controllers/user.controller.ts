import { Request, Response } from 'express';
import { createUser } from '../services/user.service';

export const registerUser: any = async (req: Request, res: Response) => {
    //* validate request
    const { fullName, email, password, imageUrl } = req.body;

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
