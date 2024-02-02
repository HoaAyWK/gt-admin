import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardContent, Grid, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import ACTION_STATUS from '../../../constants/actionStatus';
import { FormProvider, RHFEditor, RHFSelect, RHFMultiSelect, RHFTextField } from '../../../components/hook-form';
import { refresh } from './productOriginSlice';

const ProductOriginForm = ({ isEdit, product, action, status, brands, categories }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [categoryItems, setCategoryItems] = useState([]);
  const [initialDescription, setInitialDescription] = useState('<p></p>\n');
  const [initialInformation, setInitialInformation] = useState('<p></p>\n');

  useEffect(() => {
    if (product) {
      setInitialDescription(product.description);
      setInitialInformation(product.information);
      setCategoryItems(product.categories);
    }
  }, []);

  const ProductSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
      .required('Name is required'),
    description: Yup.string()
      .required('Description is required'),
    information: Yup.string()
      .required('Specification is required'),
    categories: Yup.array()
      .required('Category is required')
      .min(1, 'Category is required'),
    distributorId: Yup.string()
      .required('Brand is required'),
  });

  const defaultValues = {
    id: product?.id ? product.id : '',
    name: product?.name ? product.name : '',
    description: product?.description ? product.description : '',
    information: product?.information ? product.information : '',
    categories: product?.categories ? product.categories : [],

    // brand and distributor are the same entity
    distributorId: product?.distributorId ? product.distributorId : brands?.[0]?.id,
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const handleCategoryItemsChange = (items) => {
    setCategoryItems(items);
  };

  const onSubmit = async (data) => {
    try {
      const actionResult = await dispatch(action(data));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar(`${isEdit ? 'Updated' : 'Created'} successfully`, { variant: 'success' });
        dispatch(refresh());

        if (!isEdit) {
          reset();
          setCategoryItems([]);
        }
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <RHFTextField name='id' label='Id' type='hidden' sx={{ display: 'none' }}/>
              <Stack spacing={2}>
                <RHFTextField name='name' label='Name' />
                <RHFEditor
                  name='description'
                  label='Description'
                  initialContent={initialDescription}
                  actionStatus={isEdit ? undefined : status}
                />
                <RHFEditor
                  name='information'
                  label='Information'
                  initialContent={initialInformation}
                  actionStatus={isEdit ? undefined: status}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <Stack spacing={2}>
                <RHFMultiSelect
                  name='categories'
                  data={categories}
                  id='category'
                  label='Category'
                  items={categoryItems}
                  onItemsChange={handleCategoryItemsChange}
                  defaultValue={[]}
                />
                <RHFSelect
                  name='distributorId'
                  data={brands}
                  id='brand'
                  label='Brand'
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
              size='large'
              loading={status === ACTION_STATUS.LOADING ? true : false}
            >
              {`${isEdit ? 'Update' : 'Create'} product origin`}
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default ProductOriginForm;
