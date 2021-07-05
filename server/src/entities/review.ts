import { Column } from 'typeorm';

export interface ReviewPayload {
  reviewer?: string;
  review: string;
  rating: number;
}

export class Review {
  constructor(props: ReviewPayload) {
    if (props) {
      this.reviewer = props.reviewer;
      this.review = props.review;
      this.rating = props.rating;
    }
  }

  @Column({ nullable: true })
  reviewer: string;

  @Column()
  review: string;

  @Column()
  rating: number;
}
