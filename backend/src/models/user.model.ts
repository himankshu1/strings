import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Config } from '../config';

interface IUserSchema extends Document {
    fullName: string;
    email: string;
    password: string;
    imageUrl?: string;

    generateJWT(): string;
    comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUserSchema>(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: [6, 'password must be atleast 6 characters'],
        },
        imageUrl: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

//* hash the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);

    return next();
});

//* method to generate jwt token
userSchema.methods.generateJWT = function (): string {
    const payload = {
        id: this._id,
        fullName: this.fullName,
        email: this.email,
    };

    return jwt.sign(payload, Config.JWT_SECRET as string, {
        expiresIn: Config.JWT_EXPIRY,
    });
};

//* method to compare the password
userSchema.methods.comparePassword = async function (
    enteredPassword: string
): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const UserModel = mongoose.model<IUserSchema>('User', userSchema);
