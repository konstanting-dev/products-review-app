import Joi from 'joi';

export const AddReviewSchema = Joi.object({
  reviewer: Joi.string().required(),
  review: Joi.string().allow(''),
  rating: Joi.number().min(1).max(5).required(),
});
