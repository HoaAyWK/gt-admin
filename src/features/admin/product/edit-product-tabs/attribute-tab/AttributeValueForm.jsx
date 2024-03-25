import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  InputAdornment,
  Stack
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

import { FormProvider, RHFSwitch, RHFTextField } from '../../../../../components/hook-form';
import ACTION_STATUS from '../../../../../constants/actionStatus';

const AttributeValueForm = (props) => {
  const {
    dialogTitle,
    dialogContent,
    open,
    handleClose,
    attributeValue,
    isEdit,
    action,
    status,
    productId,
    attributeId
  } = props;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const AttributeValueSchema = Yup.object().shape({
    productId: Yup.string(),
    attributeId: Yup.string(),
    id: Yup.string(),
    name: Yup.string()
      .required('Name is required.'),
    alias: Yup.string()
      .required('Alias is required.'),
    displayOrder: Yup.number()
      .required('Display Order is required.'),
    priceAdjustment: Yup.number()
      .min(0, 'Price Adjustment must be greater than or equal to 0.')
  });

  const defaultValues = {
    productId: productId,
    attributeId: attributeId,
    id: attributeValue ? attributeValue.id : '',
    name: attributeValue ? attributeValue.name : '',
    alias: attributeValue ? attributeValue.alias : '',
    displayOrder: attributeValue ? attributeValue.displayOrder : 0,
    priceAdjustment: attributeValue ? attributeValue.priceAdjustment : 0
  };

  const methods = useForm({
    resolver: yupResolver(AttributeValueSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const actionResult = await dispatch(action(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar(`${isEdit ? 'Updated' : 'Created'} successfully`, { variant: 'success' });

      if (!isEdit) {
        reset();
      }
      handleClose();

      return;
    }

    if (result.errors) {
      const errorKeys = Object.keys(result.errors);

      errorKeys.forEach((key) => {
        result.errors[key].forEach((error) => {
          enqueueSnackbar(error, { variant: 'error' });
        });
      });
      return;
    }

    enqueueSnackbar(result.error, { variant: "error" });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
        <Box sx={{ p: 2 }}>
            <RHFTextField type='hidden' name='productId' sx={{ display: 'none' }}/>
            <RHFTextField type='hidden' name='id' sx={{ display: 'none' }}/>
            <Stack spacing={2}>
              <RHFTextField autoFocus name='name' label='Name' />
              <RHFTextField name='alias' label='Alias' />
              <RHFTextField name='displayOrder' type='number' label='Display Order' />
              <RHFTextField
                  name='priceAdjustment'
                  label='Price Adjustment'
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

export default AttributeValueForm;
