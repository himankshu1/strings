import logger from '../config/logger';
import { Request, Response } from 'express';
import { Album } from '../models/album.model';
import { Song } from '../models/song.model';
import { UserModel } from '../models/user.model';

export const getStats = async (req: Request, res: Response) => {
    try {
        const [totalSongs, totalUsers, totalAlbums, allUniqueArtists] =
            await Promise.all([
                Song.countDocuments(),
                UserModel.countDocuments(),
                Album.countDocuments(),

                Song.aggregate([
                    {
                        $unionWith: {
                            coll: 'albums',
                            pipeline: [],
                        },
                    },
                    {
                        $group: {
                            _id: '$artist',
                        },
                    },
                    {
                        $count: 'count',
                    },
                ]),
            ]);

        if (!totalSongs || !totalUsers || !totalAlbums || !allUniqueArtists) {
            res.status(500).json({
                success: false,
                message: 'No data found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Stats found',
            data: {
                totalSongs,
                totalUsers,
                totalAlbums,
                totalArtists: allUniqueArtists[0]?.count || 0,
            },
        });
    } catch (error) {
        logger.error('Something went wrong while fetching stats', {
            error: JSON.stringify(error),
        });
    }
};
