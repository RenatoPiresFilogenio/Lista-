import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';

import { router } from './routes';

const api = process.env.API ?? 'http://localhost:3333';
const front = process.env.FRONTEND ?? 'http://localhost:3000';

const app = express();
app.use(express.json());

app.use(cors({
  origin: front,
}));

app.use(helmet());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'", api ], 
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    frameAncestors: ["'none'"],
    baseUri: ["'self'"]
  }
}));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  });
});

app.listen(process.env.PORT, () => console.log('Servidor online!!!!'));
