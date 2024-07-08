import { Router } from 'express';
import {createPayment, createSubscription } from './paymentController';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware';
import authenticateToken from '../../lib/middlewares/authenticateToken';//eslint-disable-line

const paymentRouter:Router = Router();

paymentRouter.post('/payment/createSubscription',/* authenticateToken, */handleErrorsMiddleware(createSubscription));

export default paymentRouter;