import { Router } from 'express';
import { deleteById, edit, getAll, add,  getById, getAllMix, getMixById } from './categoryController';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware';
import authenticateToken from '../../lib/middlewares/authenticateToken';

const categoryRouter = Router();

categoryRouter.get('/category/:storeid', authenticateToken, handleErrorsMiddleware(getAll));
categoryRouter.get('/category/:id', authenticateToken, handleErrorsMiddleware(getById));
categoryRouter.get('/categoryMix/:id', authenticateToken, handleErrorsMiddleware(getMixById));
categoryRouter.get('/categoriesMix/:storeid', authenticateToken, handleErrorsMiddleware(getAllMix));
categoryRouter.post('/category/add', authenticateToken, handleErrorsMiddleware(add));
categoryRouter.put('/category/edit', authenticateToken, handleErrorsMiddleware(edit));
categoryRouter.delete('/category/:id', authenticateToken, handleErrorsMiddleware(deleteById));

export default categoryRouter;