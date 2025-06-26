"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const experienceController_1 = require("../controllers/experienceController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', experienceController_1.getExperiences); // Public
router.post('/', authMiddleware_1.protect, experienceController_1.addExperience); // Protected for CRM
router.put('/:id', authMiddleware_1.protect, experienceController_1.updateExperience); // Protected for CRM
router.delete('/:id', authMiddleware_1.protect, experienceController_1.deleteExperience); // Protected for CRM
exports.default = router;
