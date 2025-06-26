"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.addProject = exports.getProjects = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const getProjects = async (req, res) => {
    try {
        const projects = await Project_1.default.find({});
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProjects = getProjects;
const addProject = async (req, res) => {
    const { name, description, technologies, repoLink, liveLink, imageUrl } = req.body;
    if (!name || !description || !technologies || !imageUrl) {
        res.status(400).json({ message: 'Please enter all required fields: name, description, technologies, imageUrl' });
        return;
    }
    try {
        const project = await Project_1.default.create({ name, description, technologies, repoLink, liveLink, imageUrl });
        res.status(201).json(project);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addProject = addProject;
const updateProject = async (req, res) => {
    const { name, description, technologies, repoLink, liveLink, imageUrl } = req.body;
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (project) {
            project.name = name || project.name;
            project.description = description || project.description;
            project.technologies = technologies || project.technologies;
            project.repoLink = repoLink || project.repoLink;
            project.liveLink = liveLink || project.liveLink;
            project.imageUrl = imageUrl || project.imageUrl;
            const updatedProject = await project.save();
            res.json(updatedProject);
        }
        else {
            res.status(404).json({ message: 'Project not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (project) {
            await Project_1.default.deleteOne({ _id: project._id });
            res.json({ message: 'Project removed' });
        }
        else {
            res.status(404).json({ message: 'Project not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteProject = deleteProject;
