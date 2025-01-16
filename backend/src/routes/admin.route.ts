import { verifyAdmin, verifyJwt } from '../middlewares/auth.middleware';
import {
    uploadSong,
    getAdminProfile,
    deleteSong,
    createAlbum,
    deleteAlbum,
} from '../controllers/admin.controller';
import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware';

const router = Router();

router.use(verifyJwt, verifyAdmin);

router.get('/get-admin', getAdminProfile);

router.post(
    '/upload-song',
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'song', maxCount: 1 },
    ]),
    uploadSong
);

router.delete('/delete-song/:id', deleteSong);

router.post(
    '/create-album',
    verifyJwt,
    verifyAdmin,
    upload.single('image'),
    createAlbum
);
router.delete('/delete-album/:id', deleteAlbum);

export default router;
