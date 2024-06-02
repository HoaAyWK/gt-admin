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
  Stack
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

import { FormProvider, RHFSwitch, RHFTextField } from '../../../../../components/hook-form';
import ACTION_STATUS from '../../../../../constants/actionStatus';

const ProductAttributeForm = (props) => {
  const {
    dialogTitle,
    dialogContent,
    open,
    handleClose,
    attribute,
    isEdit,
    action,
    status,
    productId
  } = props;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const ProductAttributeSchema = Yup.object().shape({
    id: Yup.string(),
    productId: Yup.string(),
    name: Yup.string()
      .required('Name is required.'),
    canCombine: Yup.boolean(),
    colorable: Yup.boolean(),
    displayOrder: Yup.number()
      .required('Display Order is required.')
  });

  const defaultValues = {
    productId: productId,
    id: attribute ? attribute.id : '',
    name: attribute ? attribute.name : '',
    canCombine: attribute ? attribute.canCombine : false,
    colorable: attribute ? attribute.colorable : false,
    displayOrder: attribute ? attribute.displayOrder : 0
  };

  const methods = useForm({
    resolver: yupResolver(ProductAttributeSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const actionResult = await dispatch(action(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar(`${isEdit ? 'Updated' : 'Created'} successfully`, { variant: 'success' });
      // dispatch(refresh());
      if (!isEdit) {
        reset();
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

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
        <Box sx={{ p: 2 }}>
            <RHFTextField type='hidden' name='id' sx={{ display: 'none' }}/>
            <Stack spacing={2}>
              <RHFTextField autoFocus name='name' label='Name' />
              <RHFTextField name='displayOrder' type='number' label='Display Order' />
              <Stack spacing={2} direction='row'>
                <RHFSwitch name='canCombine' id='canCombine' label='Can Combine' />
                <RHFSwitch name='colorable' id='Colorable' label='Colorable' />
              </Stack>
            </Stack>
        </Box>
        <DialogActions>
          <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
            <Button variant='contained' color='inherit' onClick={handleClose}>Cancel</Button>
            <LoadingButton
              variant='contained'
              color='primary'
              type='submit'
              loading={status === ACTION_STATUS.LOADING}
            >
              {isEdit ? 'Update' : 'Create' }
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default ProductAttributeForm;
