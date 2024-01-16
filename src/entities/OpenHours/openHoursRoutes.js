import { Router } from 'express';
import { deleteById, edit, add, getAll, getById } from './openHoursController.js';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware.js';

const openHoursRouter = new Router();

openHoursRouter.get('/openHours', handleErrorsMiddleware(getAll));

openHoursRouter.get('/openHours/:id', handleErrorsMiddleware(getById));

openHoursRouter.post('/openHours/add', handleErrorsMiddleware(add));

openHoursRouter.put('/openHours/edit', handleErrorsMiddleware(edit));

openHoursRouter.delete('/openHours/:id', handleErrorsMiddleware(deleteById));

export default openHoursRouter;