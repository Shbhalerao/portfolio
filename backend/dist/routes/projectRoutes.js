"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', projectController_1.getProjects); // Public
router.post('/', authMiddleware_1.protect, projectController_1.addProject); // Protected for CRM
router.put('/:id', authMiddleware_1.protect, projectController_1.updateProject); // Protected for CRM
router.delete('/:id', authMiddleware_1.protect, projectController_1.deleteProject); // Protected for CRM
exports.default = router;
