import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardContent, Grid, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

import ACTION_STATUS from '../../../constants/actionStatus';
import { FormProvider, RHFMultiSelect, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { COLOR } from '../../../constants/colors';
import { refresh } from './productVariantSlice';

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

const ProductVariantForm = ({ productOrigins, product, action, status }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [colorItems, setColorItems] = useState([]);

  const ProductSchema = Yup.object().shape({
    id: Yup.string(),
    productId: Yup.string(),
    specifications: Yup.string()
      .required('Specification is required'),
    status: Yup.boolean(),
    colors: Yup.array()
      .min(1, 'Color is required'),
    price: Yup.number()
      .required('Price is required')
      .moreThan(0, 'Price must be more than 0'),
  });

  const defaultValues = {
    id: '',
    productId: productOrigins[0].id,
    colors: [],
    specifications: '',
    status: statuses[0].id,
    price: 0,
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues
  });

  const { handleSubmit, setValue, reset } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const actionResult = await dispatch(action(data));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar(`Created successfully`, { variant: 'success' });
        dispatch(refresh());
        setColorItems([]);
        reset();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleColorItemsChange = (items) => {
    setColorItems(items);
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
                  defaultValue={product ? product.id : productOrigins[0].id}
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
                <RHFMultiSelect
                  name='colors'
                  data={colors}
                  id='color'
                  label='Color'
                  defaultValue={[]}
                  items={colorItems}
                  onItemsChange={handleColorItemsChange}
                />
                <RHFTextField
                  name='price'
                  label='Price'
                  type='number'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
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
              Create Product Variant
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default ProductVariantForm;
