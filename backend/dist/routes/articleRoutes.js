"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articleController_1 = require("../controllers/articleController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', articleController_1.getArticles); // Public
router.post('/', authMiddleware_1.protect, articleController_1.addArticle); // Protected for CRM
router.put('/:id', authMiddleware_1.protect, articleController_1.updateArticle); // Protected for CRM
router.delete('/:id', authMiddleware_1.protect, articleController_1.deleteArticle); // Protected for CRM
exports.default = router;
