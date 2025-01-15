import { getAdminProfile } from '../controllers/admin.controller';
import { Router } from 'express';

const router = Router();

router.get('/get-admin', getAdminProfile);

export default router;
