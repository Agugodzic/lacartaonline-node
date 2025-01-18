import { Request } from 'express';

export default interface UserRequest<T = any> extends Request<T> {
   userid: number;
}