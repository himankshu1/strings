import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { IRequestWithUser } from 'middlewares/auth.middleware';
import { JwtPayload } from 'jsonwebtoken';

export const getAdminProfile = async (req: IRequestWithUser, res: Response) => {
    const { email } = req.user as JwtPayload;

    const user = await UserModel.findOne({ email });

    res.status(200).json({ success: true, message: 'User found!', data: user });
};
