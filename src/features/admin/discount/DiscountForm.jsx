import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { enGB } from 'date-fns/locale';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { FormProvider, RHFDateTimePicker, RHFSwitch, RHFTextField } from '../../../components/hook-form';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import ACTION_STATUS from '../../../constants/actionStatus';

const DiscountForm = (props) => {
  const {
    dialogTitle,
    dialogContent,
    open,
    handleClose,
    discount,
    isEdit,
    action,
    status
  } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const DiscountSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
      .required('Name is required.'),
    usePercentage: Yup.boolean(),
    discountPercentage: Yup.number()
      .when('usePercentage', {
        is: value => value === true,
        then: schema => schema
          .required('Discount percentage is required.')
          .min(0, 'Discount percentage must be greater than or equal to 0.')
          .max(100, 'Discount percentage must be less than or equal to 100.')
      }),
    discountAmount: Yup.number()
      .when('usePercentage', {
        is: value => value === false,
        then: schema => schema
          .required('Discount amount is required.')
          .min(0, 'Discount amount must be greater than or equal to 0.')
      }),
    startDate: Yup.date(),
    endDate: Yup.date()
      .when('startDate', (startDate, schema) => {
        return startDate && schema.min(startDate, 'End date must be later than start date.');
      })
  });



  const defaultValues = {
    id: discount ? discount.id : '',
    name: discount ? discount.name : '',
    usePercentage: discount ? discount.usePercentage : true,
    discountPercentage: discount ? discount.discountPercentage * 100 : 0,
    discountAmount: discount ? discount.discountAmount : 0,
    startDate: discount ? new Date(discount.startDate) : new Date(Date.now()),
    endDate: discount ? new Date(discount.endDate) : new Date(Date.now())
  };

  const methods = useForm({
    resolver: yupResolver(DiscountSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const { discountPercentage, ...other } = data;
    other.discountPercentage = discountPercentage / 100;

    const actionResult = await dispatch(action(other));
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
            <RHFSwitch name='usePercentage' label='Use Percentage' />
            <RHFTextField
              name='discountPercentage'
              label='Discount Percentage'
              type='number'
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>
              }}
            />
            <RHFTextField
              name='discountAmount'
              label='Discount Amount'
              type='number'
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
            <RHFDateTimePicker name='startDate' label='Start Date' />
            <RHFDateTimePicker name='endDate' label='End Date' />
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

export default DiscountForm;
