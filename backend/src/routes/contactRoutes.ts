import express from 'express';
import { submitContactForm, getContactMessages, deleteContactMessage } from '../controllers/contactController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', submitContactForm); // Public
router.get('/admin', protect, getContactMessages); // Protected for CRM
router.delete('/admin/:id', protect, deleteContactMessage); // Protected for CRM

export default router;
