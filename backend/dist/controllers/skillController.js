"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkill = exports.updateSkill = exports.addSkill = exports.getSkills = void 0;
const Skill_1 = __importDefault(require("../models/Skill"));
const getSkills = async (req, res) => {
    try {
        const skills = await Skill_1.default.find({});
        res.json(skills);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getSkills = getSkills;
const addSkill = async (req, res) => {
    const { name, iconClass } = req.body;
    if (!name || !iconClass) {
        res.status(400).json({ message: 'Please enter all fields' });
        return;
    }
    try {
        const skill = await Skill_1.default.create({ name, iconClass });
        res.status(201).json(skill);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addSkill = addSkill;
const updateSkill = async (req, res) => {
    const { name, iconClass } = req.body;
    try {
        const skill = await Skill_1.default.findById(req.params.id);
        if (skill) {
            skill.name = name || skill.name;
            skill.iconClass = iconClass || skill.iconClass;
            const updatedSkill = await skill.save();
            res.json(updatedSkill);
        }
        else {
            res.status(404).json({ message: 'Skill not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateSkill = updateSkill;
const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill_1.default.findById(req.params.id);
        if (skill) {
            await Skill_1.default.deleteOne({ _id: skill._id });
            res.json({ message: 'Skill removed' });
        }
        else {
            res.status(404).json({ message: 'Skill not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteSkill = deleteSkill;
