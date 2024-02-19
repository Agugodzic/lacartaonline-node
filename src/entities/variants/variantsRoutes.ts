import { Router } from 'express';
import { deleteById, edit, add, getAll, getById } from './variantsController.js';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware.js';
import authenticateToken from '../../lib/middlewares/authenticateToken.js';

const variantsRouter = new Router();

variantsRouter.get('/variants', authenticateToken, handleErrorsMiddleware(getAll));
variantsRouter.get('/variants/:id', authenticateToken, handleErrorsMiddleware(getById));
variantsRouter.post('/variants/add', authenticateToken, handleErrorsMiddleware(add));
variantsRouter.put('/variants/edit', authenticateToken, handleErrorsMiddleware(edit));
variantsRouter.delete('/variants/:id', authenticateToken, handleErrorsMiddleware(deleteById));

export default variantsRouter;