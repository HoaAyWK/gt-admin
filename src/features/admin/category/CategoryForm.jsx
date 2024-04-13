import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { getCategories, refresh, selectAllCategories } from './categorySlice';
import ACTION_STATUS from '../../../constants/actionStatus';


const CategoryForm = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, isEdit, category, action, actionStatus } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const categories = useSelector(selectAllCategories);
  const { getCategoriesStatus } = useSelector((state) => state.adminCategories);

  const CategorySchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
      .required('Name is required'),
    slug: Yup.string()
      .required('Slug is required.')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
    parentId: Yup.string(),
  });

  const defaultValues = category ? category : {
    id: '',
    name: '',
    slug: '',
    parentId: null,
  };

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (getCategoriesStatus === ACTION_STATUS.IDLE) {
      dispatch(getCategories());
    }
  }, []);

  const exclusiveSelfCategories = useMemo(() => {
    if (!category) {
      return categories;
    }

    const filteredCategories = categories.filter((item) => item.id !== category.id);

    return filteredCategories.filter((item) => item.parentId != category.id);
  }, [category, categories]);

  const onSubmit = async (data) => {
    const actionResult = await dispatch(action(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar(`${isEdit ? 'Updated' : 'Created'} successfully`, { variant: 'success' });
      reset();
      handleClose();
      dispatch(refresh());

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
              <RHFTextField autoFocus name='slug' label='Slug' />
              <RHFSelect name='parentId' data={exclusiveSelfCategories} label='Parent' id='parentId' />
            </Stack>

        </Box>
        <DialogActions>
          <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
            <Button variant='contained' color='inherit' onClick={handleClose}>Cancel</Button>
            <LoadingButton
              variant='contained'
              color='primary'
              type='submit'
              loading={actionStatus === ACTION_STATUS.LOADING ? true : false}
            >
              {isEdit ? 'Update' : 'Create' }
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default CategoryForm;
