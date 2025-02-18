import { Router } from 'express';
import { addCancellation } from './cancellationController';
import handleErrorsMiddleware from '../../lib/middlewares/handleErrorsMiddleware';
import authenticateToken from '../../lib/middlewares/authenticateToken';

const cancellationsRouter = Router();

// Endpoint para registrar una nueva cancelación
cancellationsRouter.post('/cancellation', authenticateToken, handleErrorsMiddleware(addCancellation));

export default cancellationsRouter;
