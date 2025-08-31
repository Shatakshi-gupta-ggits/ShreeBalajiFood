import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

// Add user-related routes here if needed
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;