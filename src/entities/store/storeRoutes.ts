import { Router } from 'express';
import { deleteStore, edit, add, getStore, getMix } from './storeController';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware';
import authenticateToken from '../../lib/middlewares/authenticateToken';

const storeRouter = Router();

storeRouter.get('/store', authenticateToken, handleErrorsMiddleware(getStore));
storeRouter.get('/storeMix', authenticateToken, handleErrorsMiddleware(getMix));
storeRouter.post('/store/add', authenticateToken, handleErrorsMiddleware(add));
storeRouter.put('/store/edit', authenticateToken, handleErrorsMiddleware(edit));
storeRouter.delete('/store', authenticateToken, handleErrorsMiddleware(deleteStore));

export default storeRouter;