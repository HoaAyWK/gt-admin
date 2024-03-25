import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { unwrapResult } from '@reduxjs/toolkit';
import { Grid, Stack, InputAdornment, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';

import { FormProvider, RHFEditor, RHFSelect, RHFSwitch, RHFTextField } from '../../../../components/hook-form';
import { updateProduct } from '../productSlice';

const ProductGeneralTab = ({ product, categories, brands }) => {
  const [initialDescription, setInitialDescription] = useState(product.description);
  const dispatch = useDispatch();
  const ProductSchema = new Yup.object().shape({
    id: Yup.string().required('Id is required.'),
    name: Yup.string().required('Name is required.'),
    description: Yup.string().required('Description is required.'),
    price: Yup.number().required('Price is required.')
      .min(0, 'Price must be at least 0.'),
    stockQuantity: Yup.number().required('Quantity is required.')
      .min(0, 'Quantity must be at least 0.'),
    categoryId: Yup.string().required('Category is required.'),
    brandId: Yup.string().required('Brand is required.'),
    displayOrder: Yup.number().required('Display order is required.'),
    hasVariant: Yup.boolean().required('Has variant is required.'),
    published: Yup.boolean().required('Published is required.'),
  });

  const defaultValues = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stockQuantity: product.stockQuantity,
    categoryId: product.category.id,
    brandId: product.brand.id,
    displayOrder: product.displayOrder,
    hasVariant: product.hasVariant,
    published: product.published
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    const actionResult = await dispatch(updateProduct(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Product has been updated successfully!', { variant: 'success' });

      return;
    }

    if (result.errors) {
      const errorKeys = Object.keys(result.errors);
      errorKeys.forEach((key) => {
        methods.setError(key, { type: 'manual', message: result.errors[key] });
      });

      return;
    }

    enqueueSnackbar(result.error, { variant: 'error' });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={5} direction='row' sx={{ justifyContent: 'flex-end' }}>
            <RHFSwitch name='published' label='Published' />
            <RHFSwitch name='hasVariant' label='Has Variant' />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField name='id' label='Id' disabled />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField name='name' label='Name' />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFSelect name='categoryId' label='Category' data={categories} />
        </Grid>
        <Grid item xs={12} md={6}>
        <RHFSelect name='brandId' label='Brand' data={brands} />
        </Grid>
        <Grid item xs={12}>
          <RHFEditor name='description' label='Description' initialContent={initialDescription} />
        </Grid>
        <Grid item xs={12} md={4}>
          <RHFTextField
            name='price'
            label='Price'
            type='number'
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RHFTextField name='stockQuantity' label='Stock Quantity' />
        </Grid>
        <Grid item xs={12} md={4}>
          <RHFTextField name='displayOrder' label='Display Order' />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton type='submit' variant='contained' loading={false}>Save</LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default ProductGeneralTab;
