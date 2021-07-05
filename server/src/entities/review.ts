import { Column } from 'typeorm';

export interface ReviewPayload {
  reviewer: string;
  review?: string;
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

  @Column()
  reviewer: string;

  @Column({ nullable: true })
  review: string;

  @Column()
  rating: number;
}
