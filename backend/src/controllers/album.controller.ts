import { Request, Response } from 'express';
import { Album } from '../models/album.model';
import logger from '../config/logger';

//* get all albums
export const getAllAlbums = async (req: Request, res: Response) => {
    try {
        //* query all album
        const albums = await Album.find().populate('songs');

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

//* get an album by id
export const getAlbumById = async (req: Request, res: Response) => {
    try {
        const { albumId } = req.params;

        //* if album id not provided
        if (!albumId) {
            res.status(400).json({
                success: false,
                message: 'Invalid request! Please provide the album id',
            });
        }

        //* finding the album document
        const album = await Album.findById(albumId).populate('songs');

        //* if album not found by the id
        if (!album) {
            res.status(404).json({
                success: false,
                message: 'Incorrect album id or album not available',
            });
        }

        //* success response
        res.status(200).json({
            success: true,
            message: 'album found!',
            data: album,
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
