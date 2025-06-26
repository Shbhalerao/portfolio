"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skillController_1 = require("../controllers/skillController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', skillController_1.getSkills); // Public
router.post('/', authMiddleware_1.protect, skillController_1.addSkill); // Protected for CRM
router.put('/:id', authMiddleware_1.protect, skillController_1.updateSkill); // Protected for CRM
router.delete('/:id', authMiddleware_1.protect, skillController_1.deleteSkill); // Protected for CRM
exports.default = router;
