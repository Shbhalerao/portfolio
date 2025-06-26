"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const HomepageContentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    headline: {
        type: String,
        required: true,
    },
    aboutText: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
    },
    featuredSkillIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Skill',
        }
    ],
    featuredProjectIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Project',
        }
    ],
    resumeUrl: {
        type: String,
    },
}, { timestamps: true });
const HomepageContent = mongoose_1.default.model('HomepageContent', HomepageContentSchema);
exports.default = HomepageContent;
