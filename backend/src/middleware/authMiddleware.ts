import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  id: string;
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('[protect] Raw token:', token); // Debug

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
      console.log('[protect] Decoded JWT:', decoded); // Debug

      // Attach user to the request (optional, but useful for authorization)
      const user = await User.findById(decoded.id).select('-password');
      console.log('[protect] User found:', user); // Debug
      (req as any).user = user;
      
      next();
    } catch (error) {
      console.error('[protect] JWT verification error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    console.error('[protect] No token found in Authorization header');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };
