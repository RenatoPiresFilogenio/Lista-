import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors';

import { router } from './routes'

const app = express();
app.use(express.json());
app.use(cors({
 origin: "http://localhost:3333",
 credentials: true
}
));

app.use(router);

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    ` 
      default-src 'self' http://localhost:3333;
      script-src 'self';
      style-src 'self';
      img-src 'self' data:;
      connect-src 'self' http://localhost:3333;
      font-src 'self';
      frame-ancestors 'none';
      object-src 'none';
      base-uri 'self';
    `.replace(/\n/g, '') 
  );
  next();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })

})

app.listen(3333, () => console.log('Servidor online!!!!'))