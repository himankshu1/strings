import { getAlbumById, getAllAlbums } from '../controllers/album.controller';
import { Router } from 'express';

const router = Router();

router.get('/get-albums', getAllAlbums);
router.get('/get-album/:albumId', getAlbumById);

export default router;
