import React, { useCallback, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { getProducts, addProductReview } from 'src/api/products';
import { useSnackbar } from 'src/providers/snackbar';
import { Product, ReviewPayload } from 'src/types/product';
import usePopup from 'src/utils/hooks/usePopup';
import AddReviewModal from 'src/views/Products/AddReviewForm';
import ProductsListView from 'src/views/Products/List/View';

export default function ProductsList() {
  const showMessage = useSnackbar();
  const [pickedProduct, setPickedProduct] = useState<Product | null>(null);
  const { isLoading, data, refetch } = useQuery('products', getProducts);
  const { handleClose, handleOpen, open } = usePopup();
  const { isLoading: addReviewLoading, mutateAsync } = useMutation('addReview', addProductReview, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = useCallback(
    async (data: ReviewPayload) => {
      if (pickedProduct) {
        await mutateAsync({
          id: pickedProduct?._id,
          reviewData: data,
        });
      }
      showMessage('Review has been added', 'success');
      handleClose();
      setPickedProduct(null);
    },
    [handleClose, mutateAsync, pickedProduct, showMessage],
  );

  const handleAddReviewClick = useCallback(
    (data: Product) => {
      setPickedProduct(data);
      handleOpen();
    },
    [handleOpen],
  );

  return (
    <>
      <ProductsListView products={data || []} onAddReviewClick={handleAddReviewClick} loading={isLoading} />
      <AddReviewModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        loading={addReviewLoading}
        product={pickedProduct}
      />
    </>
  );
}
