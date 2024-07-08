import { Router } from 'express';
import { deleteById, edit, add, getAll, getById } from './userController.ts';
import handleErrorsMiddleware from '../../../lib/middlewares/handleErrorsMiddleware.ts';
import authenticateToken from '../../../lib/middlewares/authenticateToken.ts';

const userRoutes = Router();

userRoutes.get('/user', authenticateToken, handleErrorsMiddleware(getAll));

userRoutes.get('/user/:id', authenticateToken, handleErrorsMiddleware(getById));

userRoutes.post('/user/add', authenticateToken, handleErrorsMiddleware(add));

userRoutes.put('/user/edit', authenticateToken, handleErrorsMiddleware(edit));

userRoutes.delete('/user/:id', authenticateToken, handleErrorsMiddleware(deleteById));

export default userRoutes;