import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
            min: [6, "password must be atleast 6 characters"],
        },
        imageUrl: {
            type: String,
        },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
