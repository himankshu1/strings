import { Request, Response } from 'express';
import { Song } from '../models/song.model';
import logger from 'config/logger';

// TODO: build logic for getting featured songs with randomly. Save the songs that users listens to frequently and based on the genres, pick the songs from db and display the same

export const getFeaturedSongs = async (req: Request, res: Response) => {
    try {
        //* fetch random 6 songs
        const songs = await Song.aggregate([
            {
                $sample: { size: 6 },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                },
            },
        ]);

        if (!songs) {
            res.status(500).json({ success: false, message: 'No songs found' });
        }

        res.status(200).json({
            success: true,
            message: 'Top 6 featured songs',
            data: songs,
        });
    } catch (error) {
        console.log(error);
        logger.error('Something went wrong while fetching featured songs', {
            error: error,
        });
    }
};

export const getMadeForYouSongs = async (req: Request, res: Response) => {
    try {
        //* fetch random 6 songs
        const songs = await Song.aggregate([
            {
                $sample: { size: 4 },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                },
            },
        ]);

        if (!songs) {
            res.status(500).json({ success: false, message: 'No songs found' });
        }

        res.status(200).json({
            success: true,
            message: 'Top 6 featured songs',
            data: songs,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getTrendingSongs = async (req: Request, res: Response) => {
    try {
        //* fetch random 6 songs
        const songs = await Song.aggregate([
            {
                $sample: { size: 4 },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                },
            },
        ]);

        if (!songs) {
            res.status(500).json({ success: false, message: 'No songs found' });
        }

        res.status(200).json({
            success: true,
            message: 'Top 6 featured songs',
            data: songs,
        });
    } catch (error) {
        console.log(error);
    }
};
