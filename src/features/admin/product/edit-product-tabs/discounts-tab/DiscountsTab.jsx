import React, { useEffect, useMemo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import { FormProvider, RHFSelect } from '../../../../../components/hook-form';
import { getDiscounts, selectAllDiscounts } from '../../../discount/discountSlice';
import ACTION_STATUS from '../../../../../constants/actionStatus';
import { fCurrency } from '../../../../../utils/formatNumber';
import { fDateTime } from '../../../../../utils/formatTime';
import { assignDiscount } from '../../productSlice';

const DiscountsTab = (props) => {
  const { productId, discountId } = props;
  const dispatch = useDispatch();
  const discounts = useSelector(selectAllDiscounts);
  const { getDiscountsStatus } = useSelector((state) => state.discounts);
  const { assignDiscountStatus } = useSelector(state => state.products);
  const defaultDiscount = { id: '1', name: 'No discount' };
  const { enqueueSnackbar } = useSnackbar();

  const discountsWithDefault = useMemo(() => {
    if (!discounts || discounts.length === 0) {
      return [defaultDiscount];
    }

    return [defaultDiscount, ...discounts];
  }, [discounts]);

  const AssignDiscountSchema = yup.object().shape({
    discountId: yup.string(),
  });

  const defaultValues = {
    discountId: discountId ?? defaultDiscount.id,
  };

  const methods = useForm({
    resolver: yupResolver(AssignDiscountSchema),
    defaultValues
  });

  const { handleSubmit, watch } = methods;
  const currentDiscountId = watch('discountId');
  const currentDiscount = useMemo(() => {
    return discountsWithDefault.find((d) => d.id === currentDiscountId);
  }, [currentDiscountId, discountsWithDefault]);

  useEffect(() => {
    if (getDiscountsStatus === ACTION_STATUS.IDLE) {
      dispatch(getDiscounts());
    }
  }, [getDiscountsStatus]);

  const onSubmit = async (data) => {
    data.productId = productId;

    const productDiscountId = data.discountId;

    if (data.discountId === defaultDiscount.id) {
      data.discountId = null;
    }

    const actionResult = await dispatch(assignDiscount(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar("Discount assigned successfully", { variant: "success" });
      data.discountId = productDiscountId;
      return;
    }

    if (result.errors) {
      const errorKeys = Object.keys(result.errors);
      errorKeys.forEach((key) => {
        result.errors[key].forEach(error => {
          enqueueSnackbar(error, { variant: "error" });
        }
      )});
      data.discountId = productDiscountId;
      return;
    }

    enqueueSnackbar(result.error, { variant: "error" });
    data.discountId = productDiscountId;
  };

  return (
    <Box sx={{ minHeight: 500 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Discounts
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <RHFSelect
            name="discountId"
            label="Discount"
            data={discountsWithDefault}
            size='small'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={assignDiscountStatus === ACTION_STATUS.LOADING}
          >
            Save
          </LoadingButton>
        </Grid>
        {currentDiscountId !== defaultDiscount.id && currentDiscount && (
          <Typography variant="body1" sx={{ mt: 1, ml: 1 }}>
            Discount <strong>{currentDiscount.usePercentage
              ? `${currentDiscount.discountPercentage * 100}% `
              : `${fCurrency(currentDiscount.discountAmount)} `}</strong>
              from {fDateTime(currentDiscount.startDate)} to {fDateTime(currentDiscount.endDate)}
          </Typography>
        )}
      </Grid>
      </FormProvider>
    </Box>
  );
};

export default DiscountsTab;
