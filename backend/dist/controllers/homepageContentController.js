"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHomepageContent = exports.getHomepageContent = void 0;
const HomepageContent_1 = __importDefault(require("../models/HomepageContent"));
const getHomepageContent = async (req, res) => {
    try {
        const content = await HomepageContent_1.default.findOne().populate('featuredSkillIds').populate('featuredProjectIds');
        if (content) {
            res.json(content);
        }
        else {
            const defaultContent = await HomepageContent_1.default.create({
                name: 'Your Name',
                headline: 'Fullstack Software Engineer',
                aboutText: 'Welcome to my portfolio! I build robust and scalable web applications with a focus on both backend and frontend technologies.',
                profileImageUrl: 'https://placehold.co/150x150/EEEEEE/333333?text=Profile',
                featuredSkillIds: [],
                featuredProjectIds: [],
                resumeUrl: '',
            });
            res.status(201).json(defaultContent);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getHomepageContent = getHomepageContent;
const updateHomepageContent = async (req, res) => {
    try {
        const { name, headline, aboutText, profileImageUrl, featuredSkillIds, featuredProjectIds, resumeUrl } = req.body;
        let content = await HomepageContent_1.default.findOne();
        if (content) {
            content.name = name || content.name;
            content.headline = headline || content.headline;
            content.aboutText = aboutText || content.aboutText;
            content.profileImageUrl = profileImageUrl || content.profileImageUrl;
            content.featuredSkillIds = featuredSkillIds || content.featuredSkillIds;
            content.featuredProjectIds = featuredProjectIds || content.featuredProjectIds;
            content.resumeUrl = resumeUrl || content.resumeUrl;
            const updatedContent = await content.save();
            res.json(updatedContent);
        }
        else {
            res.status(404).json({ message: 'Homepage content not found. Please create one first.' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateHomepageContent = updateHomepageContent;
