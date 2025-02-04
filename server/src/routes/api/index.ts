import { Router } from 'express';
import { userRouter } from './user-routes.js';
// import { bookRouter } from '../book-routes.js';

const router = Router();

router.use('/users', userRouter);
// router.use('/books', bookRouter);

export default router;
