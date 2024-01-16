import { Router } from 'express';
import { deleteById, edit, add, getAll, getById, getAllMixProducts, getMixById } from './productController.js';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware.js';

const productRouter = new Router();

// GET

productRouter.get('/product', handleErrorsMiddleware(getAll));

productRouter.get('/product/:id', handleErrorsMiddleware(getById));

productRouter.get('/productMix', handleErrorsMiddleware(getAllMixProducts));

productRouter.get('/productMix/:id', handleErrorsMiddleware(getMixById));

// POST

productRouter.post('/product/add', handleErrorsMiddleware(add));

// PUT

productRouter.put('/product/edit', handleErrorsMiddleware(edit));

// DELETE

productRouter.delete('/product/:id', handleErrorsMiddleware(deleteById));




export default productRouter;