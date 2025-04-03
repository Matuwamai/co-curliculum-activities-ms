import express from 'express';
import { deleteUser, getAllUsers, getUser, login, registerAdmin, registerUser, updateUser } from '../controllers/users.js';
import authMiddleware from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/register/admin", registerAdmin);
userRouter.post("/login", login);
userRouter.get("/", authMiddleware, getAllUsers);
userRouter.get('/:id', authMiddleware, getUser);
userRouter.put('/:id/edit', authMiddleware, updateUser);
userRouter.delete('/:id/delete', authMiddleware, deleteUser);

export default userRouter;
