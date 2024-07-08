import { Router } from 'express';
import { login, register } from './userCredentialsController.ts';
import handleErrorsMiddleware from '../../../lib/middlewares/handleErrorsMiddleware.ts';

const userRouter = Router();

userRouter.post('/login', handleErrorsMiddleware(login));

userRouter.post('/register', handleErrorsMiddleware(register));

export default userRouter;