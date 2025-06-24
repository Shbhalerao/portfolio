import express from 'express';
import { getExperiences, addExperience, updateExperience, deleteExperience } from '../controllers/experienceController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getExperiences); // Public
router.post('/', protect, addExperience); // Protected for CRM
router.put('/:id', protect, updateExperience); // Protected for CRM
router.delete('/:id', protect, deleteExperience); // Protected for CRM

export default router;
