import { Router } from 'express';
import { add, deleteUserMessage } from './UserMessageController';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware';
import authenticateToken from '../../lib/middlewares/authenticateToken';

const userMessageRouter = Router();

userMessageRouter.post('/userMessage/add', authenticateToken, handleErrorsMiddleware(add));
userMessageRouter.delete('/userMessage/:id', authenticateToken, handleErrorsMiddleware(deleteUserMessage));

export default userMessageRouter;
