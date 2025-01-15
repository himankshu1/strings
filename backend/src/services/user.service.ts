import { Response } from 'express';
import { UserModel } from '../models/user.model';
import logger from '../config/logger';

type CreateUserParamsType = {
    fullName: string;
    email: string;
    password: string;
    role?: ['user', 'admin'];
    imageUrl?: string;
};

export const createUser = async (
    { fullName, email, password, role, imageUrl }: CreateUserParamsType,
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
            role,
            imageUrl,
        });

        //* generating token
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

export const signinUser = async ({
    email,
    password,
}: Partial<CreateUserParamsType>) => {
    try {
        const isUserFound = await UserModel.findOne({ email });

        if (!isUserFound) {
            return { result: { error: true, message: "User doesn't exist" } };
        }

        const isPasswordCorrect = isUserFound.comparePassword(
            password as string
        );
        if (!isPasswordCorrect) {
            return {
                result: { error: true, message: 'Incorrect credentials' },
            };
        }

        //* generating token
        const token = isUserFound.generateJWT();

        return { result: { isUserFound, token } };
    } catch (error) {
        if (error instanceof Error) {
            logger.error(
                'Error while logging in the user: signinUser service',
                { error: error.message }
            );
        } else {
            logger.error(
                'Error while logging in the user: signinUser service',
                { error: JSON.stringify(error) }
            );
        }

        return { result: { error: true, message: JSON.stringify(error) } };
    }
};
