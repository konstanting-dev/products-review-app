import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import { urlencoded, json } from 'body-parser';
import initRoutes from 'src/routes';
import * as databaseConnectionService from 'src/services/databaseConnection';

dotenv.config();

export async function configureApp() {
  await databaseConnectionService
    .connect()
    .then(() => console.log('MongoDB connected successful'))
    .catch((e) => console.log(`MongoDB connection error: ${e}`));

  const app = express();

  app.use(logger('dev'));

  app.use(cors());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

  initRoutes(app);

  return app;
}
