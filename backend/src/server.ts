import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';

import { router } from './Routes/routes';

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(helmet());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'", "http://localhost:3333"],
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

app.listen(3333, () => console.log('Servidor online!!!!'));
