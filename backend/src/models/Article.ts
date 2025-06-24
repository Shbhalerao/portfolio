import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  mediumUrl: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Article = mongoose.model('Article', ArticleSchema);
export default Article;
