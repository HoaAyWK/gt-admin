import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { BannerUploader } from './components';
import { createBanner, refresh } from './bannerSlice';
import ACTION_STATUS from '../../../constants/actionStatus';

const BannerForm = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, imagePosition } = props;
  const dispatch= useDispatch();
  const { createBannerStatus } = useSelector((state) => state.adminBanners);
  const { enqueueSnackbar } = useSnackbar();

  const BannerSchema = Yup.object().shape({
    field: Yup.string(),
    link: Yup.string()
      .required('Link is required'),
    image: Yup.mixed().required('Image is required')
  });

  const defaultValues = {
    link: '',
    field: imagePosition ? imagePosition : 'main',
    image: undefined
  };

  const methods = useForm({
    resolver: yupResolver(BannerSchema),
    defaultValues
  });

  const { handleSubmit, reset, clearErrors, setValue } = methods;

  const onSubmit = async (data) => {
    try {
      const actionResult = await dispatch(createBanner(data));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Created successfully', { variant: 'success' });
        handleClose();
        reset();
        dispatch(refresh());
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const onDialogClose = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={onDialogClose} fullWidth={true}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
        <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              <RHFTextField autoFocus name='link' label='Link' />
              <RHFTextField  name='field' label='Position' disabled />
              <BannerUploader name='image' label='Image' setValue={setValue} clearErrors={clearErrors} />
            </Stack>
        </Box>
        <DialogActions>
          <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
            <Button variant='contained' color='inherit' onClick={onDialogClose}>Cancel</Button>
            <LoadingButton
              variant='contained'
              color='primary'
              type='submit'
              loading={createBannerStatus === ACTION_STATUS.LOADING ? true : false}
            >
              Create
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default BannerForm;
