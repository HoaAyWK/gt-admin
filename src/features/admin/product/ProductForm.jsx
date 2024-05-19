import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  InputAdornment
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import {
  FormProvider,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
  RHFSelect
} from '../../../components/hook-form';
import { refresh, searchProduct } from './productSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import PATHS from '../../../constants/paths';

const ProductForm = ({ isEdit, product, action, status, brands, categories }) => {
  const navigate = useNavigate();
  const [initialDescription, setInitialDescription] = useState('<p></p>\n');
  const { page, pageSize, order, orderBy, searchTerm } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Update the product list to get the latest data
  useEffect(() => {
    if (status === ACTION_STATUS.SUCCEEDED) {
      dispatch(searchProduct({ searchTerm, page, pageSize, order, orderBy }));
    }
  }, [status]);

  const ProductSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
      .required('Name is required.'),
    description: Yup.string()
      .required('Description is required.'),
    categoryId: Yup.string()
      .required('Category is required.'),
    brandId: Yup.string()
      .required('Brand is required.'),
    price: Yup.number()
      .required('Price is required')
      .min(0, 'Price must be greater than or equal to 0.'),
    stockQuantity: Yup.number()
      .required('Stock quantity is required.')
      .min(0, 'Stock quantity must be greater than or equal to 0.'),
    published: Yup.boolean(),
    hasVariant: Yup.boolean(),
    displayOrder: Yup.number()
      .required('Display order is required.')
  });

  const defaultValues = {
    name: product?.name ? product.name : '',
    description: product?.description ? product.description : '',
    categoryId: product?.categoryId ? product.categoryId : categories[0].id,
    brandId: product?.brandId ? product.brandId : brands[0].id,
    price: product?.price ? product.price : 0,
    stockQuantity: product?.stockQuantity ? product.stockQuantity : 0,
    published: product?.published ? product.published : false,
    hasVariant: product?.hasVariant ? product.hasVariant : false,
    displayOrder: product?.displayOrder ? product.displayOrder : 0
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const actionResult = await dispatch(action(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar(`${isEdit ? 'Updated' : 'Created'} successfully`, { variant: 'success' });
      navigate(`${PATHS.PRODUCTS_EDIT}/${result.data.id}`);

      if (!isEdit) {
        reset();
      }
    }

    if (result.errors) {
      const errorKeys = Object.keys(result.errors);

      errorKeys.forEach((key) => {
        result.errors[key].forEach(error => {
          enqueueSnackbar(error, { variant: "error" });
        }
      )});

      return;
    }

    enqueueSnackbar(result.error, { variant: "error" });
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <RHFTextField name='id' label='Id' type='hidden' sx={{ display: 'none' }}/>
      <Card sx={{ borderRadius: (theme) => theme.spacing(1) }}>
        <CardContent>
          <Stack spacing={2}>
            <Stack spacing={5} direction='row' sx={{ justifyContent: 'flex-end' }}>
              <RHFSwitch name='published' label='Published' id='published' />
              <RHFSwitch name='hasVariant' label='Has Variant' id='hasVariant' />
            </Stack>
            <Grid container>
              <Grid item xs={12} md={5.9}>
                <RHFSelect name='categoryId' label='Category' data={categories} />
              </Grid>
              <Grid item xs={12} md={0.2}>
                <Box sx={{ py: 1 }} />
              </Grid>
              <Grid item xs={12} md={5.9}>
                <RHFSelect name='brandId' label='Brand' data={brands} />
              </Grid>
            </Grid>
            <RHFTextField name='name' label='Name' />
            <RHFEditor
              name='description'
              label='Description'
              initialContent={initialDescription}
            />
            <Grid container>
              <Grid item xs={12}>
                <Divider sx={{ mb: 4, mt: 2 }} />
              </Grid>
              <Grid item xs={12} md={3.9}>
                <RHFTextField
                  name='price'
                  label='Price'
                  type='number'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={12} md={0.15}>
                <Box sx={{ py: 1 }} />
              </Grid>
              <Grid item xs={12} md={3.9}>
                <RHFTextField name='stockQuantity' label='Stock Quantity' />
              </Grid>
              <Grid item xs={12} md={0.15}>
                <Box sx={{ py: 1 }} />
              </Grid>
              <Grid item xs={12} md={3.9}>
                <RHFTextField name='displayOrder' label='Display Order' />
              </Grid>
            </Grid>
          </Stack>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              loading={status === ACTION_STATUS.LOADING}
            >
              Save
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default ProductForm;
