"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSocialLink = exports.updateSocialLink = exports.addSocialLink = exports.getSocialLinks = void 0;
const SocialLink_1 = __importDefault(require("../models/SocialLink"));
const getSocialLinks = async (req, res) => {
    try {
        const socialLinks = await SocialLink_1.default.find({});
        res.json(socialLinks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getSocialLinks = getSocialLinks;
const addSocialLink = async (req, res) => {
    const { platform, url, iconClass } = req.body;
    if (!platform || !url || !iconClass) {
        res.status(400).json({ message: 'Please enter all fields' });
        return;
    }
    try {
        const socialLink = await SocialLink_1.default.create({ platform, url, iconClass });
        res.status(201).json(socialLink);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addSocialLink = addSocialLink;
const updateSocialLink = async (req, res) => {
    const { platform, url, iconClass } = req.body;
    try {
        const socialLink = await SocialLink_1.default.findById(req.params.id);
        if (socialLink) {
            socialLink.platform = platform || socialLink.platform;
            socialLink.url = url || socialLink.url;
            socialLink.iconClass = iconClass || socialLink.iconClass;
            const updatedSocialLink = await socialLink.save();
            res.json(updatedSocialLink);
        }
        else {
            res.status(404).json({ message: 'Social link not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateSocialLink = updateSocialLink;
const deleteSocialLink = async (req, res) => {
    try {
        const socialLink = await SocialLink_1.default.findById(req.params.id);
        if (socialLink) {
            await SocialLink_1.default.deleteOne({ _id: socialLink._id });
            res.json({ message: 'Social link removed' });
        }
        else {
            res.status(404).json({ message: 'Social link not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteSocialLink = deleteSocialLink;
