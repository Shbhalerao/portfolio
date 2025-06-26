"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/', contactController_1.submitContactForm); // Public
router.get('/admin', authMiddleware_1.protect, contactController_1.getContactMessages); // Protected for CRM
router.delete('/admin/:id', authMiddleware_1.protect, contactController_1.deleteContactMessage); // Protected for CRM
exports.default = router;
