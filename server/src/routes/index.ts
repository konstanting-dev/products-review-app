import { Application } from 'express';
import productRoutes from './products';

const initRoutes = (app: Application) => {
  app.use('/products', productRoutes);
};

export default initRoutes;
