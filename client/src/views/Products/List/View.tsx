import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LoadingIndicator from 'src/components/LoadingIndicator';
import { Product } from 'src/types/product';

import ProductCard from '../Item';

interface ProductsListProps {
  products: Product[];
  onAddReviewClick: (data: Product) => void;
  loading: boolean;
}

const useStyles = makeStyles({
  root: {
    padding: 20,
  },
});

export default function ProductsListView({ products, onAddReviewClick, loading }: ProductsListProps) {
  const classes = useStyles();

  return (
    <Grid container spacing={3} classes={{ root: classes.root }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        products?.map((product) => (
          <Grid key={product._id} container item xs={3}>
            <ProductCard product={product} onAddReview={onAddReviewClick} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
