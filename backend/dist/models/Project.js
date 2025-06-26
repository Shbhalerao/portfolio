"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technologies: [
        {
            type: String,
        }
    ],
    repoLink: {
        type: String,
    },
    liveLink: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Project = mongoose_1.default.model('Project', ProjectSchema);
exports.default = Project;
