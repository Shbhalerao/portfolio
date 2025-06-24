import express from 'express';
import { getHomepageContent, updateHomepageContent } from '../controllers/homepageContentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getHomepageContent);
router.put('/', protect, updateHomepageContent); // Protected for CRM

export default router;
