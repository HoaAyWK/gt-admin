import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardContent, Grid, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

import { ImagesUploader } from './components';
import ACTION_STATUS from '../../../constants/actionStatus';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField } from '../../../components/hook-form';
import { COLOR } from '../../../constants/colors';
import { refresh } from './productVariantSlice';
import { getProductsPerCategory } from '../../common/productDetailsSlice';

const colors = [
  { id: COLOR.NONE, name: 'None' },
  { id: COLOR.WHITE, name: 'White' },
  { id: COLOR.BLACK, name: 'Black' },
  { id: COLOR.GOLD, name: 'Gold '},
  { id: COLOR.RED, name: 'Red' },
  { id: COLOR.BLUE, name: 'Blue' },
  { id: COLOR.GREEN, name: 'Green' },
  { id: COLOR.SILVER, name: 'Silver' },
  { id: COLOR.YELLOW, name: 'Yellow' },
  { id: COLOR.VOILET, name: 'Violet' },
  { id: COLOR.PINK, name: 'Pink' }
];

const statuses = [
  { id: true, name: 'Available'},
  { id: false, name: 'Unavailable' }
];


const FullProductVariantForm = ({ productOrigins, productVariant, action, status }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const ProductSchema = Yup.object().shape({
    id: Yup.string(),
    productId: Yup.string(),
    specifications: Yup.string()
      .required('Specification is required'),
    status: Yup.boolean(),
    color: Yup.string()
      .required('Color is required'),
    price: Yup.number()
      .required('Price is required')
      .moreThan(0, 'Price must be more than 0'),
    discount: Yup.number()
      .min(0, 'Discount must be a positive number')
      .max(99, 'Discount must between 0 and 99%'),
    quantity: Yup.number()
      .min(0, 'Quantity must be a positive number'),
    images: Yup.array()
      .required('Images is required')
      .min(1, `Images is required`),
    showOnHomePage: Yup.boolean(),
  });

  const defaultValues = {
    id: productVariant.id,
    productId: productVariant.productId,
    color: productVariant.color,
    specifications: productVariant.specifications,
    status: productVariant.status,
    price: productVariant.price,
    discount: productVariant.discount ? productVariant.discount : 0,
    quantity: productVariant.warehouse,
    images: productVariant.media,
    showOnHomePage: productVariant.showOnHomePage,
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues
  });

  const { handleSubmit, setValue, getValues, clearErrors } = methods;

  useEffect(() => {
    if (status === ACTION_STATUS.SUCCEEDED) {
      setValue('images', productVariant.media);
    }
  }, [status]);

  const onSubmit = async (data) => {
    try {
      const actionResult = await dispatch(action(data));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar(`Updated successfully`, { variant: 'success' });
        dispatch(getProductsPerCategory());
        dispatch(refresh());
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleSelectProductOriginChange = (event) => {
    setValue('productId', event.target.value);
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <RHFTextField name='id' type='hidden' sx={{ display: 'none' }} />
              <Stack spacing={2}>
                <RHFTextField name='productId' label='Product Origin Id' disabled />
                <TextField
                  id='select-product-origin'
                  select
                  label='Product Origin'
                  defaultValue={productVariant.productId ? productVariant.productId : productOrigins[0].id}
                  onChange={handleSelectProductOriginChange}
                >
                  {productOrigins?.map((product) => (
                    <MenuItem key={product?.id} value={product?.id}>
                      {product?.name}
                    </MenuItem>
                  ))}
                </TextField>
                <RHFTextField name='specifications' multiline minRows={3} label='Specification' placeholder='Write specification...' />
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 1, mt: 2 }}>
            <CardContent>
              <ImagesUploader
                name='images'
                getValues={getValues}
                setValue={setValue}
                clearErrors={clearErrors}
                actionStatus={status}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <Stack spacing={2}>
                <RHFSelect
                  name='status'
                  data={statuses}
                  id='status'
                  label='Status'
                />
                <RHFSelect
                  name='color'
                  data={colors}
                  id='color'
                  label='Color'
                />
                <RHFTextField
                  name='quantity'
                  label='Quantity'
                  type='number'
                />
                <RHFSwitch
                  name='showOnHomePage'
                  label='Show on homepage'
                  id='showOnHomePage'
                />
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 1, mt: 2 }}>
            <CardContent>
              <Stack spacing={2}>
                <RHFTextField
                  name='price'
                  label='Price'
                  type='number'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
                <RHFTextField
                  name='discount'
                  label='Discount'
                  type='number'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type='submit'
              variant='contained'
              color='primary'
              loading={status === ACTION_STATUS.LOADING ? true : false}
            >
              Update Product Variant
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default FullProductVariantForm;
