import { Router } from 'express';
import { deleteById, edit, add, getAll, getById, getMixById } from './storeController.js';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware.js';

const storeRouter = new Router();

storeRouter.get('/store', handleErrorsMiddleware(getAll));

storeRouter.get('/store/:id', handleErrorsMiddleware(getById));

storeRouter.get('/storeMix/:id', handleErrorsMiddleware(getMixById));

storeRouter.post('/store/add', handleErrorsMiddleware(add));

storeRouter.put('/store/edit', handleErrorsMiddleware(edit));

storeRouter.delete('/store/:id', handleErrorsMiddleware(deleteById));

export default storeRouter;