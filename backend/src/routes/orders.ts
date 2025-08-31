import express from 'express';
import Order from '../models/Order';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/', protect, async (req: any, res) => {
  try {
    const { orderItems, deliveryAddress, paymentMethod } = req.body;
    
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Calculate total price
    const totalPrice = orderItems.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );

    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
      deliveryAddress,
      paymentMethod,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: 'Invalid order data' });
  }
});

router.get('/myorders', protect, async (req: any, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', protect, async (req: any, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if (order) {
      if (order.user._id.toString() === req.user._id.toString() || req.user.isAdmin) {
        res.json(order);
      } else {
        res.status(401).json({ message: 'Not authorized' });
      }
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;