import express from 'express';
import MenuItem from '../models/MenuItem';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ available: true });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Invalid menu item data' });
  }
});

// Add more routes for update, delete, etc.

export default router;