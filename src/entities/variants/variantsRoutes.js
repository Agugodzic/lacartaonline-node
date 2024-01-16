import { Router } from 'express';
import { deleteById, edit, add, getAll, getById } from './variantsController.js';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware.js';

const variantsRouter = new Router();

variantsRouter.get('/variants', handleErrorsMiddleware(getAll));

variantsRouter.get('/variants/:id', handleErrorsMiddleware(getById));

variantsRouter.post('/variants/add', handleErrorsMiddleware(add));

variantsRouter.put('/variants/edit', handleErrorsMiddleware(edit));

variantsRouter.delete('/variants/:id', handleErrorsMiddleware(deleteById));

export default variantsRouter;