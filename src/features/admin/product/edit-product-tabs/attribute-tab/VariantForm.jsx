import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  InputAdornment,
  Stack,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

import { FormProvider, RHFSelect, RHFSwitch, RHFTextField } from '../../../../../components/hook-form';
import ACTION_STATUS from '../../../../../constants/actionStatus';
import ImageSelecting from './ImageSelecting';

const VariantForm = (props) => {
  const {
    dialogTitle,
    dialogContent,
    open,
    handleClose,
    variant,
    isEdit,
    action,
    status,
    productId,
    attributes,
    images
  } = props;
  const [assignedImageIds, setAssignedImageIds] = useState([]);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const defaultAttributeValues = useMemo(() => {
    let defaultSelectedAttributes = {};
    attributes.forEach(attribute => {
      defaultSelectedAttributes[attribute.id] = variant
        ? variant.attributeSelection[attribute.id]
        : attribute.attributeValues[0]?.id
    });

    return defaultSelectedAttributes;
  }, [attributes, variant]);

  const VariantSchema = Yup.object().shape({
    id: Yup.string(),
    productId: Yup.string(),
    stockQuantity: Yup.number()
      .min(0, 'Stock quantity must be greater than or equal to 0.'),
    price: Yup.number()
      .min(0, 'Price must be greater than or equal to 0.'),
    isActive: Yup.boolean()
  });

  useEffect(() => {
    if (variant) {
      setAssignedImageIds(variant.assignedProductImageIds);
    }
  }, [variant]);

  const defaultValues = {
    productId: productId,
    stockQuantity: variant ? variant.stockQuantity : 0,
    price: variant ? variant.price : 0,
    isActive: variant ? variant.isActive : false,
    ...defaultAttributeValues
  };

  const methods = useForm({
    resolver: yupResolver(VariantSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const { isActive, price, stockQuantity, productId, ...attributeSelections } = data;
    const selectedAttributes = Object.keys(attributeSelections).map((key) => ({
        productAttributeId: key,
        productAttributeValueId: attributeSelections[key]
    }));

    const variant = {
      productId,
      isActive,
      price,
      stockQuantity,
      selectedAttributes,
      assignedImageIds
    };

    console.log('variant', variant);

    const actionResult = await dispatch(action(variant));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar(`${isEdit ? 'Updated' : 'Created'} successfully`, { variant: 'success' });

      if (!isEdit) {
        reset();
        setAssignedImageIds([]);
      }

      handleClose();

      return;
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
  };

  const handleImageClick = (imageId) => {
    if (assignedImageIds.includes(imageId)) {
      setAssignedImageIds(assignedImageIds.filter((id) => id !== imageId));
    } else {
      setAssignedImageIds([...assignedImageIds, imageId]);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
        <Box sx={{ p: 2 }}>
            <RHFTextField type='hidden' name='id' sx={{ display: 'none' }}/>
            <RHFTextField type='hidden' name='productId' sx={{ display: 'none' }}/>
            <Stack spacing={2}>
              {attributes.map((attribute) => (
                <RHFSelect
                  key={attribute.id}
                  name={attribute.id}
                  id={attribute.id}
                  label={attribute.name}
                  data={attribute.attributeValues}
                  disabled={isEdit}
                  defaultValue={
                    variant ?
                    variant.attributeSelection[attribute.id]
                      : attribute.attributeValues.length > 0
                      ? attribute.attributeValues[0].id
                      : ''
                  }
                />
              ))}
              <RHFSwitch name='isActive' label='Is Active' />
              <Box sx={{ width: '100%' }}>
                <Typography variant='body1'>
                  Pictures
                </Typography>
                <Grid container spacing={1} >
                  {images && (images.map(image => (
                    <ImageSelecting
                      key={image.id}
                      id={image.id}
                      imageUrl={image.imageUrl}
                      isSelected={assignedImageIds.includes(image.id)}
                      handleClick={handleImageClick}
                    />
                  )))}
                </Grid>
              </Box>
              <RHFTextField name='stockQuantity' type='number' label='Stock Quantity' />
              <RHFTextField
                  name='price'
                  label='Price'
                  type='number'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
              />
            </Stack>
        </Box>
        <DialogActions>
          <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
            <Button variant='contained' color='inherit' onClick={handleClose}>Cancel</Button>
            <LoadingButton
              variant='contained'
              color='primary'
              type='submit'
              loading={status === ACTION_STATUS.LOADING ? true : false}
            >
              {isEdit ? 'Update' : 'Create' }
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default VariantForm;
