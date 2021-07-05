import { Request, Response } from 'express';
import * as ProductsService from 'src/services/products';
import logger from 'src/services/logger';

export const list = async (req: Request, res: Response) => {
  try {
    const data = await ProductsService.getAll();
    return res.status(200).json(data);
  } catch (err) {
    logger.error(err);
    return res.status(400).json({ message: err.message });
  }
};

export const addReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reviewData = req.body;
    const newReview = await ProductsService.addReview(id, reviewData);
    return res.status(200).json(newReview);
  } catch (err) {
    logger.error(err);
    return res.status(400).json({ message: err.message });
  }
};
