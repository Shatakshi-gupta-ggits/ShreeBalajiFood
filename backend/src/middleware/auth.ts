import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Check if JWT_SECRET exists
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret not configured' });
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
      
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

export { protect, admin };