import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/staff.js';
import memberRoutes from './routes/members.js';
import activityRoutes from './routes/activities.js';
import authMiddleware from './middlewares/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// admin (Login and Registration)
app.use('/api/admin', adminRoutes);

// Protected routes
app.use('/api/members', authMiddleware, memberRoutes);
app.use('/api/activities', activityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
