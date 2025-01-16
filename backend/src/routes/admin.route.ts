import { verifyAdmin, verifyJwt } from '../middlewares/auth.middleware';
import {
    uploadSong,
    getAdminProfile,
    deleteSong,
    createAlbum,
} from '../controllers/admin.controller';
import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware';

const router = Router();

router.get('/get-admin', verifyJwt, verifyAdmin, getAdminProfile);

router.post(
    '/upload-song',
    verifyJwt,
    verifyAdmin,
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'song', maxCount: 1 },
    ]),
    uploadSong
);

router.delete('/delete-song/:id', verifyJwt, verifyAdmin, deleteSong);

router.post(
    '/create-album',
    verifyJwt,
    verifyAdmin,
    upload.single('image'),
    createAlbum
);

export default router;
