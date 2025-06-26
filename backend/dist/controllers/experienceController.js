"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperience = exports.updateExperience = exports.addExperience = exports.getExperiences = void 0;
const Experience_1 = __importDefault(require("../models/Experience"));
const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience_1.default.find({});
        experiences.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
        res.json(experiences);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getExperiences = getExperiences;
const addExperience = async (req, res) => {
    const { title, company, startDate, endDate, responsibilities, technologies } = req.body;
    if (!title || !company || !startDate || !responsibilities) {
        res.status(400).json({ message: 'Please enter all required fields: title, company, startDate, responsibilities' });
        return;
    }
    try {
        const experience = await Experience_1.default.create({ title, company, startDate, endDate, responsibilities, technologies });
        res.status(201).json(experience);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addExperience = addExperience;
const updateExperience = async (req, res) => {
    const { title, company, startDate, endDate, responsibilities, technologies } = req.body;
    try {
        const experience = await Experience_1.default.findById(req.params.id);
        if (experience) {
            experience.title = title || experience.title;
            experience.company = company || experience.company;
            experience.startDate = startDate || experience.startDate;
            experience.endDate = endDate;
            experience.responsibilities = responsibilities || experience.responsibilities;
            experience.technologies = technologies || experience.technologies;
            const updatedExperience = await experience.save();
            res.json(updatedExperience);
        }
        else {
            res.status(404).json({ message: 'Experience not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateExperience = updateExperience;
const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience_1.default.findById(req.params.id);
        if (experience) {
            await Experience_1.default.deleteOne({ _id: experience._id });
            res.json({ message: 'Experience removed' });
        }
        else {
            res.status(404).json({ message: 'Experience not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteExperience = deleteExperience;
