import express, { Request, Response, NextFunction} from 'express';

type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default RequestHandler;

