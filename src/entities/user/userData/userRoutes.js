import { Router } from 'express';
import { deleteById, edit, add, getAll, getById } from './userController.js';
import handleErrorsMiddleware from '../../../lib/middlewares/handleErrorsMiddleware.js';


const userRoutes = new Router();

userRoutes.get('/user', handleErrorsMiddleware(getAll));

userRoutes.get('/user/:id', handleErrorsMiddleware(getById));

userRoutes.post('/user/add', handleErrorsMiddleware(add));

userRoutes.put('/user/edit', handleErrorsMiddleware(edit));

userRoutes.delete('/user/:id', handleErrorsMiddleware(deleteById));

export default userRoutes;