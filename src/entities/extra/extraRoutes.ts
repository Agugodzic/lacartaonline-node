import { Router } from 'express';
import { deleteById, edit, add, getAll, getById } from './extraController';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware';
import authenticateToken from '../../lib/middlewares/authenticateToken';

const extraRouter = Router();

extraRouter.get('/extra', authenticateToken, handleErrorsMiddleware(getAll));
extraRouter.get('/extra/:id', authenticateToken, handleErrorsMiddleware(getById));
extraRouter.post('/extra/add', authenticateToken, handleErrorsMiddleware(add));
extraRouter.put('/extra/edit', authenticateToken, handleErrorsMiddleware(edit));
extraRouter.delete('/extra/:id', authenticateToken, handleErrorsMiddleware(deleteById));

export default extraRouter;