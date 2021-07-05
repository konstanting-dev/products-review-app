import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

import { Product } from 'src/types/product';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  ratingRoot: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

interface ProductCardProps {
  product: Product;
  onAddReview: (data: Product) => void;
}

interface ProductCardActionAreaProps {
  product: Product;
}

export function ProductCardActionArea({ product }: ProductCardActionAreaProps) {
  const classes = useStyles();

  return (
    <CardActionArea disableRipple={true} disableTouchRipple={true} focusRipple={false}>
      {product.image && <CardMedia className={classes.media} image={product.image} title={product.name} />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
        <div className={classes.ratingRoot}>
          <Rating name="read-only" value={product.rating} readOnly precision={0.1} />
          <Box ml={2}>{product.rating}</Box>
        </div>
      </CardContent>
    </CardActionArea>
  );
}

export default function ProductCard({ product, onAddReview }: ProductCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <ProductCardActionArea product={product} />
      <CardActions>
        <Button size="small" color="primary" onClick={() => onAddReview(product)}>
          Add Review
        </Button>
      </CardActions>
    </Card>
  );
}
