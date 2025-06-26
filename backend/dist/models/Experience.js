"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ExperienceSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    responsibilities: [
        {
            type: String,
        }
    ],
    technologies: [
        {
            type: String,
        }
    ],
}, { timestamps: true });
const Experience = mongoose_1.default.model('Experience', ExperienceSchema);
exports.default = Experience;
