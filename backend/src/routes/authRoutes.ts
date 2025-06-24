import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser); // Use for initial admin setup
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;
