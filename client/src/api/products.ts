import { Product, ReviewPayload } from 'src/types/product';

import api from './apiService';

export const getProducts = async () => {
  const { data } = await api.get<Product[]>('/products');
  return data;
};

export const addProductReview = async ({ id, reviewData }: { id: string; reviewData: ReviewPayload }) => {
  const { data } = await api.post(`/products/${id}/review`, reviewData);
  console.log(data);
  return data;
};
