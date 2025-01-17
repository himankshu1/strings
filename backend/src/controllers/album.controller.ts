import { Request, Response } from 'express';
import { Album } from '../models/album.model';
import logger from '../config/logger';

export const getAllAlbums = async (req: Request, res: Response) => {
    try {
        //* query all album
        const albums = await Album.find();

        if (albums.length === 0) {
            res.status(200).json({ success: true, message: 'no albums found' });
        }

        res.status(200).json({
            success: true,
            message: 'all albums retrieved',
            data: albums,
        });
    } catch (err) {
        if (err instanceof Error) {
            logger.error('something went wrong while fetching all albums', {
                error: err.message,
            });
        } else {
            logger.error('something went wrong while fetching all albums', {
                error: JSON.stringify(err),
            });
        }
    }
};
