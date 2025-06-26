"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
// Import routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const homepageContentRoutes_1 = __importDefault(require("./routes/homepageContentRoutes"));
const skillRoutes_1 = __importDefault(require("./routes/skillRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const experienceRoutes_1 = __importDefault(require("./routes/experienceRoutes"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const socialLinkRoutes_1 = __importDefault(require("./routes/socialLinkRoutes"));
dotenv_1.default.config();
(0, db_1.default)(); // Connect to MongoDB
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Enable CORS for all origins
app.use(express_1.default.json()); // Body parser for JSON
// Public API Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/homepage-content', homepageContentRoutes_1.default);
app.use('/api/skills', skillRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/experience', experienceRoutes_1.default);
app.use('/api/articles', articleRoutes_1.default);
app.use('/api/contact', contactRoutes_1.default);
app.use('/api/social-links', socialLinkRoutes_1.default);
// Admin/CRM API Routes (using existing routes with protection)
app.use('/api/admin/homepage-content', homepageContentRoutes_1.default); // Re-use and protect within controller/middleware
app.use('/api/admin/skills', skillRoutes_1.default);
app.use('/api/admin/projects', projectRoutes_1.default);
app.use('/api/admin/experience', experienceRoutes_1.default);
app.use('/api/admin/articles', articleRoutes_1.default);
app.use('/api/admin/contact-messages', contactRoutes_1.default);
app.use('/api/admin/social-links', socialLinkRoutes_1.default);
// Basic test route
app.get('/', (req, res) => {
    res.send('API is running...');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
