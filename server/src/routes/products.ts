import * as express from 'express';
import * as ProductsController from 'src/controllers/products';
import { validateBody } from './middlewares/validateReview';
import { AddReviewSchema } from './validationSchemes/review';

const router = express.Router();

router.get('/', ProductsController.list);
router.post('/:id/review', validateBody(AddReviewSchema), ProductsController.addReview);

export default router;
