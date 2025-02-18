import { Router } from 'express';
import { deleteById, edit, add, get } from './userController.ts';
import handleErrorsMiddleware from '../../../lib/middlewares/handleErrorsMiddleware.ts';
import authenticateToken from '../../../lib/middlewares/authenticateToken.ts';

const userRoutes = Router();

userRoutes.get('/user/:id', authenticateToken, handleErrorsMiddleware(get));

userRoutes.post('/user/add', authenticateToken, handleErrorsMiddleware(add));

userRoutes.put('/user/edit', authenticateToken, handleErrorsMiddleware(edit));

userRoutes.delete('/user/:id', authenticateToken, handleErrorsMiddleware(deleteById));

export default userRoutes;