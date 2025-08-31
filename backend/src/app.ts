import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/payment';
import connectDB from './config/database';
import authRoutes from './routes/auth';
import menuRoutes from './routes/menu';
import orderRoutes from './routes/orders';
import userRoutes from './routes/users';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('Food Ordering API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});