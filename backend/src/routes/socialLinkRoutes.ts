import express from 'express';
import { getSocialLinks, addSocialLink, updateSocialLink, deleteSocialLink } from '../controllers/socialLinkController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getSocialLinks); // Public
router.post('/', protect, addSocialLink); // Protected for CRM
router.put('/:id', protect, updateSocialLink); // Protected for CRM
router.delete('/:id', protect, deleteSocialLink); // Protected for CRM

export default router;
