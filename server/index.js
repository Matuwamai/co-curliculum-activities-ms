const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const memberRoutes = require('./routes/members.js');
const activityRoutes = require('./routes/activities.js');
const adminRoutes = require('./routes/admin.js');
const authMiddleware = require('./middlewares/auth.js');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// admin (Login and Registration)
app.use('/api/admin', adminRoutes);
// Protected routes
app.use('/api/members', authMiddleware, memberRoutes);
app.use('/api/activities', authMiddleware, activityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
