import { Response } from 'express';
import { UserModel } from '../models/user.model';
import logger from '../config/logger';

type CreateUserParamsType = {
    fullName: string;
    email: string;
    password: string;
    imageUrl?: string;
};

export const createUser = async (
    { fullName, email, password, imageUrl }: CreateUserParamsType,
    res: Response
): Promise<any> => {
    try {
        //* check if user already exists
        const isUserFound = await UserModel.findOne({ email });

        if (isUserFound) {
            return { result: { error: true, message: 'User already exists' } };
        }

        const user = await UserModel.create({
            fullName,
            email,
            password,
            imageUrl,
        });

        const token = user.generateJWT();

        return { result: { error: false, user, token } };
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            logger.error('Error while registering the user', {
                error: error.message,
            });
        } else {
            logger.error('Error while registering the user', {
                error: JSON.stringify(error),
            });
        }
    }
};
