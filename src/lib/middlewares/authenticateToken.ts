import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

function authenticateToken(req:Request, res:Response, next:NextFunction) {
  const secretKey = process.env.SECRET_KEY; //eslint-disable-line
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided.' });
  }

  jwt.verify(token, secretKey || '' , (err:any, user:any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    
    req.user = user;
    next();
  });
}

export default authenticateToken;