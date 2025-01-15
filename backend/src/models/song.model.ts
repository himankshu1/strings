import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        artist: {
            type: [String],
            required: true,
            min: [3, 'artist name should be atleast 3 characters'],
        },
        imageUrl: {
            type: String,
            required: true,
        },
        audioUrl: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        albumId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album',
            required: false,
        },
    },
    { timestamps: true }
);

export const Song = mongoose.model('Song', songSchema);
