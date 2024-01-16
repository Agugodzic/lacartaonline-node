import { Router } from 'express';
import { deleteById, edit, getAll, add,  getById, getAllMix, getMixById } from './categoryController.js';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware.js';

const categoryRouter = new Router();

categoryRouter.get('/category', handleErrorsMiddleware(getAll));

categoryRouter.get('/category/:id', handleErrorsMiddleware(getById));

categoryRouter.get('/categoryMix/:id', handleErrorsMiddleware(getMixById));

categoryRouter.get('/categoryMix', handleErrorsMiddleware(getAllMix));

categoryRouter.post('/category/add', handleErrorsMiddleware(add));

categoryRouter.put('/category/edit', handleErrorsMiddleware(edit));

categoryRouter.delete('/category/:id', handleErrorsMiddleware(deleteById));

export default categoryRouter;