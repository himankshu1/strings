import { Request, response, Response } from 'express';
import { UserModel } from '../models/user.model';
import { IRequestWithUser } from 'middlewares/auth.middleware';
import { JwtPayload } from 'jsonwebtoken';
import { uploadToCloudinary } from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { Song } from '../models/song.model';
import { Album } from '../models/album.model';
import logger from '../config/logger';

export interface ExtendedUploadApiResponse extends UploadApiResponse {
    duration?: number; // Add duration for audio/video files
    is_audio?: boolean; // Add is_audio flag
}

//* get admin profile
export const getAdminProfile = async (req: IRequestWithUser, res: Response) => {
    const { email } = req.user as JwtPayload;

    const user = await UserModel.findOne({ email });

    res.status(200).json({ success: true, message: 'User found!', data: user });
};

//* creating a song
export const uploadSong = async (req: Request, res: Response): Promise<any> => {
    try {
        // Validate request
        const { title, artist, albumId } = req.body;
        if (!title || !artist) {
            res.status(400).json({
                success: false,
                message: 'Please provide all the fields',
            });
        }

        //* extracting local paths
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const imageFilePath = files?.image?.[0]?.path;
        const songFilePath = files?.song?.[0]?.path;

        if (!imageFilePath || !songFilePath) {
            res.status(400).json({
                success: false,
                message: 'Both image and song files are required.',
            });
        }

        //* creating an array for the local files path and uploading to Cloudinary
        const filesArray = [imageFilePath, songFilePath];

        const resultArray: ExtendedUploadApiResponse[] =
            await uploadToCloudinary(filesArray);

        //* Extract URLs from cloudinary response
        const cloudinaryUrlsArray = resultArray.map((result) => result.url);

        //* extract song object
        const responseSongObject = resultArray.find(
            (cloudinaryResponseItem) => cloudinaryResponseItem.is_audio === true
        );

        //* extract image url
        const imageUrl = cloudinaryUrlsArray.filter(
            (url) => !url.includes('.mp3')
        );

        //* extracting the duration and convert to minutes
        const durationInSeconds = responseSongObject?.duration;
        if (!durationInSeconds) {
            return res.status(500).json({
                success: false,
                message: 'Could not retrieve song duration.',
            });
        }

        //* duration in minutes
        const durationInMinutes = (durationInSeconds / 60).toFixed(2);
        console.log(durationInMinutes);

        //* creating song
        const song = await Song.create({
            title,
            artist,
            imageUrl: imageUrl?.[0],
            audioUrl: responseSongObject.secure_url,
            duration: durationInMinutes,
            albumId: albumId || null,
        });

        //* if song belongs to an album, update the album's song array
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id },
            });
        }

        //* return response
        res.status(200).json({
            success: true,
            message: 'Song added successfully.',
            data: song,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while uploading files.',
        });
    }
};

//* get all songs
export const getAllSongs = async (req: Request, res: Response) => {
    try {
        //* -1 means sort in descending order on createdAt
        const songs = await Song.find().sort({ createdAt: -1 });

        if (!songs) {
            res.status(404).json({
                success: false,
                message: 'no songs found',
                data: [],
            });
        }

        res.status(200).json({
            success: false,
            message: 'songs found',
            data: songs,
        });
    } catch (error) {
        console.log(error);
    }
};

//* deleting a song
export const deleteSong = async (req: Request, res: Response): Promise<any> => {
    try {
        //* validate request
        if (!req.params.id) {
            return res.status(400).json({
                success: false,
                message: 'Please provide the song id',
            });
        }

        console.log(req.params.id);

        //* find and delete the song
        const deleteResponse = await Song.findByIdAndDelete(req.params.id);

        //* find if the song belongs to an album and delete from the album
        if (deleteResponse?.albumId) {
            await Album.findByIdAndDelete(deleteResponse?.albumId);
        }

        //* return response
        if (!deleteResponse) {
            return res.status(500).json({
                success: false,
                message:
                    'Something went wrong while deleting the song could not find',
            });
        }

        return res.status(202).json({
            success: true,
            message: 'Song deleted successfully',
        });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            logger.error('Error while deleting the song', {
                error: error.message,
                stack: error.stack,
            });
        } else {
            logger.error('Error while deleting the song', {
                error: JSON.stringify(error),
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting the song',
        });
    }
};

//* creating an album
export const createAlbum = async (req: Request, res: Response) => {
    try {
        const { title, artist, releaseYear } = req.body;

        if (!title || !artist || !releaseYear) {
            res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        //* extract local file path
        const localFilePath = req.file?.path;

        //* upload success to cloudinary
        const uploadResponse = await uploadToCloudinary([
            localFilePath as string,
        ]);
        const imageUrl = uploadResponse?.[0].secure_url;

        //* create album document
        const album = await Album.create({
            title,
            artist,
            imageUrl,
            releaseYear,
        });

        //* send response
        if (!album) {
            res.status(500).json({
                success: false,
                message: "Server error: Couldn't create the album",
            });
        }

        res.status(201).json({
            success: true,
            message: 'Album created successfully',
            data: album,
        });
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Something went wrong while creating album', {
                error: error.message,
            });
        } else {
            logger.error('Something went wrong while creating album', {
                error: JSON.stringify(error),
            });
        }
    }
};

//* delete an album
export const deleteAlbum = async (req: Request, res: Response) => {
    try {
        const albumId = req.params.id;

        if (!albumId) {
            res.status(404).json({
                success: false,
                message: 'Please share the album id to delete',
            });
        }

        //* finding and deleting the album and its songs
        await Song.deleteMany({ albumId });
        const isAlbumDeleted = await Album.findByIdAndDelete(albumId);

        if (!isAlbumDeleted) {
            res.status(400).json({
                success: false,
                message:
                    "Couldn't delete the album. Please validate the album id",
            });
        }

        //* sending response after successful deletion
        res.status(202).json({
            success: true,
            message: 'Album was deleted successful',
            data: isAlbumDeleted,
        });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            logger.error("Couldn't delete the album", { error: error.message });
        } else {
            logger.error("Couldn't delete the album", {
                error: JSON.stringify(error),
            });
        }
    }
};
