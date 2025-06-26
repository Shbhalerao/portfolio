"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socialLinkController_1 = require("../controllers/socialLinkController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', socialLinkController_1.getSocialLinks); // Public
router.post('/', authMiddleware_1.protect, socialLinkController_1.addSocialLink); // Protected for CRM
router.put('/:id', authMiddleware_1.protect, socialLinkController_1.updateSocialLink); // Protected for CRM
router.delete('/:id', authMiddleware_1.protect, socialLinkController_1.deleteSocialLink); // Protected for CRM
exports.default = router;
