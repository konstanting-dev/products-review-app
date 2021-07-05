import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Review } from './review';

@Entity()
export class Product {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column(() => Review)
  reviews: Review[];
}
