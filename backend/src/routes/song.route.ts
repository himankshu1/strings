import {
    getFeaturedSongs,
    getMadeForYouSongs,
    getTrendingSongs,
} from '../controllers/song.controller';
import { Router } from 'express';

const router = Router();

router.get('/featured', getFeaturedSongs);

router.get('/made-for-you', getMadeForYouSongs);

router.get('/trending', getTrendingSongs);

export default router;
