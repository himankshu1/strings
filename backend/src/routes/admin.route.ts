import { checkAdmin, verifyJwt } from '../middlewares/auth.middleware';
import { getAdminProfile } from '../controllers/admin.controller';
import { Router } from 'express';

const router = Router();

router.get('/get-admin', verifyJwt, checkAdmin, getAdminProfile);

export default router;
