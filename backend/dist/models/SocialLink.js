"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SocialLinkSchema = new mongoose_1.default.Schema({
    platform: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
    },
    iconClass: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const SocialLink = mongoose_1.default.model('SocialLink', SocialLinkSchema);
exports.default = SocialLink;
