import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
// import { authenticateToken } from '../middleware/auth.js';
import { bookRouter } from './book-routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);
// router.use('/api', authenticateToken, apiRoutes);
router.use('/books', bookRouter);

export default router;
