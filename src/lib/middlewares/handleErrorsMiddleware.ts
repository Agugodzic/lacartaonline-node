import express, { Request, Response, NextFunction} from 'express';
import RequestHandler from '../types/RequestHandler';

const handleErrorsMiddleware = (fn:RequestHandler) => async (req:Request, res:Response, next:NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
};

export default handleErrorsMiddleware;