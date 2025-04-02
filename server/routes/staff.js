import express from 'express';
import { registerStaff, loginStaff } from '../controllers/staff.js';
const router = express.Router();

router.post('/register', registerStaff);
router.post('/login', loginStaff);

export default router;
