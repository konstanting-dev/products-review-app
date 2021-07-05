import Joi from 'joi';

export const AddReviewSchema = Joi.object({
  reviewer: Joi.string().allow(''),
  review: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
});
