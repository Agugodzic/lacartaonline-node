import { Router } from 'express';
import { deleteById, edit, add, getAll, getById, getAllMixProducts, getMixById, deleteMany, disableMany, enableMany } from './productController';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware';
import authenticateToken from '../../lib/middlewares/authenticateToken';

const productRouter = Router();

productRouter.get('/product', authenticateToken, handleErrorsMiddleware(getAll));
productRouter.get('/product/:id', authenticateToken, handleErrorsMiddleware(getById));
productRouter.get('/productMix/:storeid', authenticateToken, handleErrorsMiddleware(getAllMixProducts));
productRouter.get('/productMixById/:id', authenticateToken, handleErrorsMiddleware(getMixById));
productRouter.post('/product/add', authenticateToken, handleErrorsMiddleware(add));
productRouter.put('/product/edit', authenticateToken, handleErrorsMiddleware(edit));
productRouter.delete('/product/:id', authenticateToken, handleErrorsMiddleware(deleteById));
productRouter.post('/product/deleteMany', authenticateToken, handleErrorsMiddleware(deleteMany));
productRouter.post('/product/disableMany', authenticateToken, handleErrorsMiddleware(disableMany));
productRouter.post('/product/enableMany', authenticateToken, handleErrorsMiddleware(enableMany));



export default productRouter;