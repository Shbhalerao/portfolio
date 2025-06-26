"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactMessage = exports.getContactMessages = exports.submitContactForm = void 0;
const Contact_1 = __importDefault(require("../models/Contact"));
const submitContactForm = async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
        res.status(400).json({ message: 'Please enter all required fields: name, email, message' });
        return;
    }
    try {
        const contactMessage = await Contact_1.default.create({ name, email, subject, message });
        res.status(201).json({ message: 'Message sent successfully!', data: contactMessage });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.submitContactForm = submitContactForm;
const getContactMessages = async (req, res) => {
    try {
        const messages = await Contact_1.default.find({});
        messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getContactMessages = getContactMessages;
const deleteContactMessage = async (req, res) => {
    try {
        const message = await Contact_1.default.findById(req.params.id);
        if (message) {
            await Contact_1.default.deleteOne({ _id: message._id });
            res.json({ message: 'Contact message removed' });
        }
        else {
            res.status(404).json({ message: 'Contact message not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteContactMessage = deleteContactMessage;
