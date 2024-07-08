import { Router } from 'express';
import { deleteById, edit, add, getAll, getById } from './payMethodController';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware';
import authenticateToken from '../../lib/middlewares/authenticateToken';

const payMethodRouter = Router();

payMethodRouter.get('/payMethod', authenticateToken, handleErrorsMiddleware(getAll));
payMethodRouter.get('/payMethod/:id', authenticateToken, handleErrorsMiddleware(getById));
payMethodRouter.post('/payMethod/add', authenticateToken, handleErrorsMiddleware(add));
payMethodRouter.put('/payMethod/edit', authenticateToken, handleErrorsMiddleware(edit));
payMethodRouter.delete('/payMethod/:id', authenticateToken, handleErrorsMiddleware(deleteById));

export default payMethodRouter;