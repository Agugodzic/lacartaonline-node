import { Router } from 'express';
import { deleteById, edit, add, getAll, getById } from './userController.js';
import handleErrorsMiddleware from '../../../lib/middlewares/handleErrorsMiddleware.js';
import authenticateToken from '../../../lib/middlewares/authenticateToken.js';

const userRoutes = new Router();

userRoutes.get('/user', authenticateToken, handleErrorsMiddleware(getAll));

userRoutes.get('/user/:id', authenticateToken, handleErrorsMiddleware(getById));

userRoutes.post('/user/add', authenticateToken, handleErrorsMiddleware(add));

userRoutes.put('/user/edit', authenticateToken, handleErrorsMiddleware(edit));

userRoutes.delete('/user/:id', authenticateToken, handleErrorsMiddleware(deleteById));

export default userRoutes;