export interface Review {
  _id: string;
  reviewer?: string;
  review: string;
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

export type ProductPayload = Omit<Product, '_id'>;

export type ReviewPayload = Omit<Review, '_id'>;
