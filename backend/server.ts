import express from 'express';
import dotenv from 'dotenv';
import paymentRoutes from './src/routes/payments';

// Load environment variables
dotenv.config();

console.log('Environment check:');
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// Simple test route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is working!',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
});

// Add error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

app.use('/api/payments', paymentRoutes);