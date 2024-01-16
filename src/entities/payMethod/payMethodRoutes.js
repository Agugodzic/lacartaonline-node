import { Router } from 'express';
import { deleteById, edit, add, getAll, getById } from './payMethodController.js';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware.js';

const payMethodRouter = new Router();

payMethodRouter.get('/payMethod', handleErrorsMiddleware(getAll));

payMethodRouter.get('/payMethod/:id', handleErrorsMiddleware(getById));

payMethodRouter.post('/payMethod/add', handleErrorsMiddleware(add));

payMethodRouter.put('/payMethod/edit', handleErrorsMiddleware(edit));

payMethodRouter.delete('/payMethod/:id', handleErrorsMiddleware(deleteById));

export default payMethodRouter;