import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import clsx from 'clsx';
import * as yup from 'yup';

import LoadingButton from 'src/components/LoadingButton';
import { Product, ReviewPayload } from 'src/types/product';
import { useYupValidationResolver } from 'src/utils/hooks/useYupResolver';
import { ProductCardActionArea } from 'src/views/Products/Item';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%',
  },
  container: {
    marginTop: theme.spacing(3),
    height: 200,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  field: {
    marginTop: 0,
    marginBottom: 0,
  },
  dateRangeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
  },
  periodDelim: {
    margin: '0 10px',
  },
  removePeriodButton: {
    marginLeft: 10,
    cursor: 'pointer',
  },
  addPeriod: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 400,
  },
}));

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ReviewPayload) => void;
  className?: string;
  loading: boolean;
  product: Product | null;
}

const AddReviewModalSchema = yup.object().shape({
  reviewer: yup.string().required(),
  review: yup.string(),
  rating: yup.number().required(),
});

const defaultValues: ReviewPayload = {
  reviewer: '',
  review: '',
  rating: 0,
};

function AddReviewModal({ open, onClose, className, onSubmit, loading, product, ...rest }: BaseModalProps) {
  const classes = useStyles();
  const resolver = useYupValidationResolver(AddReviewModalSchema);
  const { handleSubmit, control, errors } = useForm<ReviewPayload>({
    defaultValues,
    resolver,
  });

  const handleClick = useCallback(
    (data: ReviewPayload) => {
      onSubmit(data);
    },
    [onSubmit],
  );

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open} disableEnforceFocus>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title="Add review" />
        <Divider />
        {product && <ProductCardActionArea product={product} />}
        <CardContent>
          <Controller
            as={TextField}
            name="reviewer"
            label="Your name"
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
            control={control}
            error={Boolean(errors?.reviewer)}
            helperText={errors?.reviewer?.message}
          />
          <Controller
            as={TextField}
            name="review"
            label="Your Review"
            margin="normal"
            variant="outlined"
            size="small"
            multiline
            rows={3}
            fullWidth
            control={control}
            error={Boolean(errors?.review)}
            helperText={errors?.review?.message}
          />
          <FormControl className={classes.formControl}>
            <Typography component="legend">Your rating</Typography>
            <Controller control={control} as={Rating} name="rating" />
            {Boolean(errors?.rating) && <Typography>{errors?.rating?.message}</Typography>}
          </FormControl>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton pending={loading} color="primary" onClick={handleSubmit(handleClick)} variant="contained">
            Add
          </LoadingButton>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default AddReviewModal;
