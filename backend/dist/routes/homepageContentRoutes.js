"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homepageContentController_1 = require("../controllers/homepageContentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', homepageContentController_1.getHomepageContent);
router.put('/', authMiddleware_1.protect, homepageContentController_1.updateHomepageContent); // Protected for CRM
exports.default = router;
