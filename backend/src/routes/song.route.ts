import {
    getFeaturedSongs,
    getMadeForYouSongs,
    getTrendingSongs,
} from '../controllers/song.controller';
import { Router } from 'express';

const router = Router();

router.get('/featured-songs', getFeaturedSongs);

router.get('/made-for-you-songs', getMadeForYouSongs);

router.get('/trending-songs', getTrendingSongs);

export default router;
