"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ArticleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    mediumUrl: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Article = mongoose_1.default.model('Article', ArticleSchema);
exports.default = Article;
