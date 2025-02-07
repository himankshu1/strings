import { verifyJwt } from '../middlewares/auth.middleware';
import {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUser,
} from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.get('/me', verifyJwt, getCurrentUser);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', verifyJwt, logoutUser);
router.get('/get-all-users', verifyJwt, getAllUsers);
//todo - get user messages

export default router;
