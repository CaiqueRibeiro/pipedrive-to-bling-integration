import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import cors from 'cors';
import cron from 'node-cron';
import os from 'os';
import cluster from 'cluster';

import 'reflect-metadata';

import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import '@shared/container';
import '@shared/infra/typeorm';

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  // aqui vai vir a integration
  cron.schedule('* * * * * ', () =>
    console.log(`Worker ${process.pid} is Master.`),
  );
} else {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  app.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }

      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    },
  );

  app.listen(3333);
}
