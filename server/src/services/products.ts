import { getMongoManager } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Product } from 'src/entities/product';
import { ReviewPayload } from 'src/entities/review';

export const getAll = async () => {
  const productRepository = getMongoManager().getMongoRepository(Product);

  return productRepository
    .aggregate([
      {
        $addFields: {
          rating_average: { $avg: '$reviews.rating' },
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          image: 1,
          rating: { $round: ['$rating_average', 1] },
        },
      },
    ])
    .toArray();
};

export const addReview = async (productId: string, reviewData: ReviewPayload) => {
  const productRepository = getMongoManager().getMongoRepository(Product);

  await productRepository.updateOne({ _id: new ObjectID(productId) }, { $push: { reviews: reviewData } });
  return await productRepository.findOne({ where: { _id: new ObjectID(productId) } });
};
