import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

// Generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });
};

const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Please enter all fields' });
    return;
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({ username, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(String(user._id)),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = (await User.findOne({ username })) as IUser | null;

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(String(user._id)),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

const getUserProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export { registerUser, loginUser, getUserProfile };
