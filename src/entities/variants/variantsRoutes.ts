import { Router } from 'express';
import { deleteById, edit, add, getAll, getById } from './variantsController.ts';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware.ts';
import authenticateToken from '../../lib/middlewares/authenticateToken.ts';

const variantsRouter = Router();

variantsRouter.get('/variants', authenticateToken, handleErrorsMiddleware(getAll));
variantsRouter.get('/variants/:id', authenticateToken, handleErrorsMiddleware(getById));
variantsRouter.post('/variants/add', authenticateToken, handleErrorsMiddleware(add));
variantsRouter.put('/variants/edit', authenticateToken, handleErrorsMiddleware(edit));
variantsRouter.delete('/variants/:id', authenticateToken, handleErrorsMiddleware(deleteById));

export default variantsRouter;