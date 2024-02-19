import { Router } from 'express';
import {createPayment } from './paymentController.js';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware';
import authenticateToken from '../../lib/middlewares/authenticateToken';//eslint-disable-line

const paymentRouter:Router = Router();

paymentRouter.get('/payment/add',/* authenticateToken, */handleErrorsMiddleware(createPayment));

export default paymentRouter;