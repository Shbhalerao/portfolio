import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

// Import routes
import authRoutes from './routes/authRoutes';
import homepageContentRoutes from './routes/homepageContentRoutes';
import skillRoutes from './routes/skillRoutes';
import projectRoutes from './routes/projectRoutes';
import experienceRoutes from './routes/experienceRoutes';
import articleRoutes from './routes/articleRoutes';
import contactRoutes from './routes/contactRoutes';
import socialLinkRoutes from './routes/socialLinkRoutes';

dotenv.config();

connectDB(); // Connect to MongoDB

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Body parser for JSON

// Public API Routes
app.use('/api/auth', authRoutes);
app.use('/api/homepage-content', homepageContentRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/social-links', socialLinkRoutes);

// Admin/CRM API Routes (using existing routes with protection)
app.use('/api/admin/homepage-content', homepageContentRoutes); // Re-use and protect within controller/middleware
app.use('/api/admin/skills', skillRoutes);
app.use('/api/admin/projects', projectRoutes);
app.use('/api/admin/experience', experienceRoutes);
app.use('/api/admin/articles', articleRoutes);
app.use('/api/admin/contact-messages', contactRoutes);
app.use('/api/admin/social-links', socialLinkRoutes);

// Basic test route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
