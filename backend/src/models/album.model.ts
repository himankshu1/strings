import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        artist: {
            type: [String],
            required: true,
            min: [3, 'artist name should be at least 3 characters'],
        },
        imageUrl: {
            type: String,
            required: true,
        },
        releaseYear: {
            type: Number,
            required: true,
        },
        songs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Song',
            },
        ],
    },
    { timestamps: true }
);

export const Album = mongoose.model('Album', albumSchema);
