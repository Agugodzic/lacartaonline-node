import { Router } from 'express';
import { deleteById, edit, add, getAll, getById, getAllMixProducts, getMixById } from './productController.js';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware.js';
import authenticateToken from '../../lib/middlewares/authenticateToken.js';

const productRouter = new Router();

productRouter.get('/product', authenticateToken, handleErrorsMiddleware(getAll));
productRouter.get('/product/:id', authenticateToken, handleErrorsMiddleware(getById));
productRouter.get('/productMix/:storeid', authenticateToken, handleErrorsMiddleware(getAllMixProducts));
productRouter.get('/productMixById/:id', authenticateToken, handleErrorsMiddleware(getMixById));
productRouter.post('/product/add', authenticateToken, handleErrorsMiddleware(add));
productRouter.put('/product/edit', authenticateToken, handleErrorsMiddleware(edit));
productRouter.delete('/product/:id', authenticateToken, handleErrorsMiddleware(deleteById));


export default productRouter;