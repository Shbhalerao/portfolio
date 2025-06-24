import express from 'express';
import { getArticles, addArticle, updateArticle, deleteArticle } from '../controllers/articleController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getArticles); // Public
router.post('/', protect, addArticle); // Protected for CRM
router.put('/:id', protect, updateArticle); // Protected for CRM
router.delete('/:id', protect, deleteArticle); // Protected for CRM

export default router;
