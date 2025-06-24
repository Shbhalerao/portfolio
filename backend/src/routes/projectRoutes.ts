import express from 'express';
import { getProjects, addProject, updateProject, deleteProject } from '../controllers/projectController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getProjects); // Public
router.post('/', protect, addProject); // Protected for CRM
router.put('/:id', protect, updateProject); // Protected for CRM
router.delete('/:id', protect, deleteProject); // Protected for CRM

export default router;
