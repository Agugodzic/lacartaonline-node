import { Router } from 'express';
import { login, register } from './userCredentialsController.js';
import handleErrorsMiddleware from '../../../lib/middlewares/handleErrorsMiddleware.js';

const userRouter = new Router();

userRouter.post('/login', handleErrorsMiddleware(login));

userRouter.post('/register', handleErrorsMiddleware(register));

export default userRouter;