import { verifyAdmin, verifyJwt } from '../middlewares/auth.middleware';
import {
    uploadSong,
    getAdminProfile,
    deleteSong,
    createAlbum,
    deleteAlbum,
    getAllSongs,
} from '../controllers/admin.controller';
import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware';

const router = Router();

//* apply these for all the below of the routes
router.use(verifyJwt, verifyAdmin);

//* get admin details
router.get('/get-admin', getAdminProfile);

//* upload a song
router.post(
    '/upload-song',
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'song', maxCount: 1 },
    ]),
    uploadSong
);

//* fetch all songs
router.get('/get-songs', getAllSongs);

//* delete a song
router.delete('/delete-song/:id', deleteSong);

//* create an album
router.post(
    '/create-album',
    verifyJwt,
    verifyAdmin,
    upload.single('image'),
    createAlbum
);

//* delete album by id
router.delete('/delete-album/:id', deleteAlbum);

export default router;
