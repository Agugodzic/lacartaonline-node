import { Router } from 'express';
import { add, deleteSuggestion } from './SuggestionController';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware';
import authenticateToken from '../../lib/middlewares/authenticateToken';

const suggestionsRouter = Router();

suggestionsRouter.post('/suggestions/add', authenticateToken, handleErrorsMiddleware(add));
suggestionsRouter.delete('/suggestions/:id', authenticateToken, handleErrorsMiddleware(deleteSuggestion));

export default suggestionsRouter;
