import { Router } from 'express';
import { deleteById, edit, add, getAll, getById } from './openHoursController.js';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware.js';
import authenticateToken from '../../lib/middlewares/authenticateToken.js';

const openHoursRouter = new Router();

openHoursRouter.get('/openHours', authenticateToken, handleErrorsMiddleware(getAll));
openHoursRouter.get('/openHours/:id', authenticateToken, handleErrorsMiddleware(getById));
openHoursRouter.post('/openHours/add', authenticateToken, handleErrorsMiddleware(add));
openHoursRouter.put('/openHours/edit', authenticateToken, handleErrorsMiddleware(edit));
openHoursRouter.delete('/openHours/:id', authenticateToken, handleErrorsMiddleware(deleteById));

export default openHoursRouter;