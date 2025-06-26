"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.addArticle = exports.getArticles = void 0;
const Article_1 = __importDefault(require("../models/Article"));
const getArticles = async (req, res) => {
    try {
        const articles = await Article_1.default.find({});
        articles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        res.json(articles);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getArticles = getArticles;
const addArticle = async (req, res) => {
    const { title, mediumUrl, imageUrl, excerpt } = req.body;
    if (!title || !mediumUrl || !imageUrl || !excerpt) {
        res.status(400).json({ message: 'Please enter all fields' });
        return;
    }
    try {
        const article = await Article_1.default.create({ title, mediumUrl, imageUrl, excerpt });
        res.status(201).json(article);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addArticle = addArticle;
const updateArticle = async (req, res) => {
    const { title, mediumUrl, imageUrl, excerpt } = req.body;
    try {
        const article = await Article_1.default.findById(req.params.id);
        if (article) {
            article.title = title || article.title;
            article.mediumUrl = mediumUrl || article.mediumUrl;
            article.imageUrl = imageUrl || article.imageUrl;
            article.excerpt = excerpt || article.excerpt;
            const updatedArticle = await article.save();
            res.json(updatedArticle);
        }
        else {
            res.status(404).json({ message: 'Article not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateArticle = updateArticle;
const deleteArticle = async (req, res) => {
    try {
        const article = await Article_1.default.findById(req.params.id);
        if (article) {
            await Article_1.default.deleteOne({ _id: article._id });
            res.json({ message: 'Article removed' });
        }
        else {
            res.status(404).json({ message: 'Article not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteArticle = deleteArticle;
