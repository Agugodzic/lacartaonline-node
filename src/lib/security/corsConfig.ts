import cors from 'cors';

const corsOptions = {
  origin: process.env.CORS_ORIGIN, //eslint-disable-line
  optionsSuccessStatus: 200
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;