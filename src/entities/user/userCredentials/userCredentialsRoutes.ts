import { Router } from 'express';
import { login, register, updatePassword } from './userCredentialsController.ts';
import handleErrorsMiddleware from '../../../lib/middlewares/handleErrorsMiddleware.ts';
import authenticateToken from '../../../lib/middlewares/authenticateToken.ts';

const userRouter = Router();

userRouter.post('/login', handleErrorsMiddleware(login));

userRouter.post('/register', handleErrorsMiddleware(register));

// with token
userRouter.put('/updatePassword', authenticateToken, handleErrorsMiddleware(updatePassword, "Error al intentar actualizar la contraseña."));

export default userRouter;