import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Product } from '../entities/product';
import { createManyReviews } from './review.factory';

define(Product, (faker: typeof Faker) => {
  const name = faker.random.word();
  const description = faker.random.words(10);
  const image = faker.random.image();
  const reviews = createManyReviews(faker, 3);

  const product = new Product();
  product.name = name;
  product.description = description;
  product.image = image;
  product.reviews = reviews;

  return product;
});
