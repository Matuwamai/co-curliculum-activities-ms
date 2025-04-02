import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import activityRoutes from './routes/activities.js';
import userRouter from './routes/users.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/activities', activityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
