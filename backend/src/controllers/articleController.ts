import { Request, Response } from 'express';
import Article from '../models/Article';

const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find({});
    articles.sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime());
    res.json(articles);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const addArticle = async (req: Request, res: Response) => {
  const { title, mediumUrl, imageUrl, excerpt } = req.body;

  if (!title || !mediumUrl || !imageUrl || !excerpt) {
    res.status(400).json({ message: 'Please enter all fields' });
    return;
  }

  try {
    const article = await Article.create({ title, mediumUrl, imageUrl, excerpt });
    res.status(201).json(article);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req: Request, res: Response) => {
  const { title, mediumUrl, imageUrl, excerpt } = req.body;

  try {
    const article = await Article.findById(req.params.id);

    if (article) {
      article.title = title || article.title;
      article.mediumUrl = mediumUrl || article.mediumUrl;
      article.imageUrl = imageUrl || article.imageUrl;
      article.excerpt = excerpt || article.excerpt;

      const updatedArticle = await article.save();
      res.json(updatedArticle);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);

    if (article) {
      await Article.deleteOne({ _id: article._id });
      res.json({ message: 'Article removed' });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getArticles, addArticle, updateArticle, deleteArticle };
