import { getAllAlbums } from '../controllers/album.controller';
import { Router } from 'express';

const router = Router();

router.get('/get-albums', getAllAlbums);

export default router;
