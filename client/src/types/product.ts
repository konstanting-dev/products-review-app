export interface Review {
  reviewer: string;
  review?: string;
  rating: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image?: string;
  rating: number;
  reviews: Review[];
}

export type ReviewPayload = Omit<Review, '_id'>;
