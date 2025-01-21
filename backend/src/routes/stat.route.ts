import { Router } from 'express';
import { getStats } from '../controllers/stats.controller';
import { verifyAdmin, verifyJwt } from '../middlewares/auth.middleware';

const router = Router();

router.get('/get-stats', verifyJwt, verifyAdmin, getStats);

export default router;
