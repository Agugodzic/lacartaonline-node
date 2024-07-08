import { Router } from 'express';
import { deleteById, edit, add, getAll, getById, getMixById } from './storeController';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware';
import authenticateToken from '../../lib/middlewares/authenticateToken';

const storeRouter = Router();

storeRouter.get('/store', authenticateToken, handleErrorsMiddleware(getAll));
storeRouter.get('/store/:id', authenticateToken, handleErrorsMiddleware(getById));
storeRouter.get('/storeMix/:id', authenticateToken, handleErrorsMiddleware(getMixById));
storeRouter.post('/store/add', authenticateToken, handleErrorsMiddleware(add));
storeRouter.put('/store/edit', authenticateToken, handleErrorsMiddleware(edit));
storeRouter.delete('/store/:id', authenticateToken, handleErrorsMiddleware(deleteById));

export default storeRouter;