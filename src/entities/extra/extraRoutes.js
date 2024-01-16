import { Router } from 'express';
import { deleteById, edit, add, getAll, getById } from './extraController.js';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware.js';

const extraRouter = new Router();

extraRouter.get('/extra', handleErrorsMiddleware(getAll));

extraRouter.get('/extra/:id', handleErrorsMiddleware(getById));

extraRouter.post('/extra/add', handleErrorsMiddleware(add));

extraRouter.put('/extra/edit', handleErrorsMiddleware(edit));

extraRouter.delete('/extra/:id', handleErrorsMiddleware(deleteById));

export default extraRouter;