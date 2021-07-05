import { Factory, Seeder } from 'typeorm-seeding';
import { Product } from '../entities/product';

export default class CreateProducts implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Product)().createMany(10);
  }
}
