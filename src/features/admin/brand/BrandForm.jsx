import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';

import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { refresh } from './brandSlice';
import ACTION_STATUS from '../../../constants/actionStatus';

const BrandForm = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, brand, isEdit, action, status } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const BrandSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
      .required('Name is required')
  });

  const defaultValues = {
    id: brand ? brand.id : '',
    name: brand ? brand.name : ''
  };

  const methods = useForm({
    resolver: yupResolver(BrandSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const actionResult = await dispatch(action(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar(`${isEdit ? 'Updated' : 'Created'} successfully`, { variant: 'success' });
      dispatch(refresh());
      handleClose();

      if (!isEdit) {
        reset();
      }

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
        <RHFTextField name='id' label='Id' type='hidden' sx={{ display: 'none' }}/>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            <RHFTextField name='name' label='Name' autoFocus={true} />
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

export default BrandForm;
