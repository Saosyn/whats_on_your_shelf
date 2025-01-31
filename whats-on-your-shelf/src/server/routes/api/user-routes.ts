// TODO - change this up 

import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
    try {
      // Get all the User data out of the database, excluding password
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
      });
      // Send back the User data as a response to the client
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

export { router as userRouter };
