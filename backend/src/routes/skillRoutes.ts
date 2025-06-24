import express from 'express';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../controllers/skillController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getSkills); // Public
router.post('/', protect, addSkill); // Protected for CRM
router.put('/:id', protect, updateSkill); // Protected for CRM
router.delete('/:id', protect, deleteSkill); // Protected for CRM

export default router;
