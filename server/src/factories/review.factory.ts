import Faker from 'faker';
import { Review } from '../entities/review';

export const createReview = (faker: typeof Faker) => {
  const reviewer = faker.name.firstName();
  const review = faker.random.words(10);
  const rating = faker.random.number({ min: 1, max: 5 });

  return new Review({
    reviewer,
    review,
    rating,
  });
};

export const createManyReviews = (faker: typeof Faker, amount: number) => {
  if (amount <= 0) {
    return [];
  }
  return Array.from({ length: amount }).map(() => createReview(faker));
};
