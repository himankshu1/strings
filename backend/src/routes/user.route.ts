import { verifyJwt } from '../middlewares/auth.middleware';
import {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
} from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', verifyJwt, logoutUser);
router.get('/get-all-users', verifyJwt, getAllUsers);

export default router;
