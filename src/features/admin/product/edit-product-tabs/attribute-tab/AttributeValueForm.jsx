import React, { useState } from 'react';
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
  InputAdornment,
  Stack,
  TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

import { ColorPicker } from '../../../../../components';
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
    attributeId,
    attribute
  } = props;

  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [color, setColor] = useState(() => ({ r: '0', g: '0', b: '0', a: '1' }));
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  let AttributeValueSchema = Yup.object().shape({
    productId: Yup.string(),
    attributeId: Yup.string(),
    id: Yup.string(),
    name: Yup.string()
      .required('Name is required.'),
    displayOrder: Yup.number()
      .required('Display Order is required.'),
    priceAdjustment: Yup.number()
      .min(0, 'Price Adjustment must be greater than or equal to 0.')
  });

  if (attribute && attribute.colorable) {
    AttributeValueSchema = Yup.object().shape({
      productId: Yup.string(),
      attributeId: Yup.string(),
      id: Yup.string(),
      name: Yup.string()
        .required('Name is required.'),
      color: Yup.string()
        .required('Color is required.'),
      displayOrder: Yup.number()
        .required('Display Order is required.'),
      priceAdjustment: Yup.number()
        .min(0, 'Price Adjustment must be greater than or equal to 0.')
    });
  }

  let defaultValues = {
    productId: productId,
    attributeId: attributeId,
    id: attributeValue ? attributeValue.id : '',
    name: attributeValue ? attributeValue.name : '',
    displayOrder: attributeValue ? attributeValue.displayOrder : 0,
    priceAdjustment: attributeValue ? attributeValue.priceAdjustment : 0
  };

  if (attribute && attribute.colorable) {
    defaultValues.color = attributeValue ? attributeValue.color : '';
  }

  const methods = useForm({
    resolver: yupResolver(AttributeValueSchema),
    defaultValues
  });

  const { handleSubmit, reset, setValue } = methods;

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

  const handleColorChange = (color) => {
    setColor(color.rgb);
    setValue('color', `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
  };

  const handleOpenColorPicker = () => {
    setOpenColorPicker(true);
  };

  const handleCloseColorPicker = () => {
    setOpenColorPicker(false);
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
              <RHFTextField name='displayOrder' type='number' label='Display Order' />
              <RHFTextField
                  name='priceAdjustment'
                  label='Price Adjustment'
                  type='number'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
              />
              {attribute && attribute.colorable && (
                <RHFTextField
                  name='color'
                  label='Color'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <ColorPicker
                          color={color}
                          onColorChange={handleColorChange}
                          open={openColorPicker}
                          handleOpen={handleOpenColorPicker}
                          handleClose={handleCloseColorPicker}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              )}
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
