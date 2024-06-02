import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import {
  FormProvider,
  RHFSelect,
  RHFSelectDirection,
  RHFSwitch,
  RHFTextField,
} from "../../../components/hook-form";
import ACTION_STATUS from "../../../constants/actionStatus";
import { getAllProducts, refresh } from "../product/productSlice";
import { createBanner, getBanners, updateBanner } from "./bannerSlice";

const direction = ["Horizontal", "Vertical"];

const BannerForm = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, banner, isEdit } =
    props;
  const dispatch = useDispatch();
  const { getAllProductStatus, getAllProduct } = useSelector(
    (state) => state.products
  );
  const { createBannerStatus, updateBrandStatus } = useSelector(
    (state) => state.banners
  );

  useEffect(() => {
    if (getAllProductStatus === ACTION_STATUS.IDLE) {
      dispatch(getAllProducts());
    }
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const BannerSchema = Yup.object().shape({
    productId: Yup.string().required("ProductId is required"),
    productVariantId: Yup.string().required("ProductVariantId is required"),
    direction: Yup.mixed().required("Direction is required"),
    displayOrder: Yup.number().required("Display order is required"),
    isActive: Yup.boolean().required("IsActive is required"),
  });

  const defaultValues = {
    productId: banner ? banner.productId : getAllProduct?.items[0].id,
    productVariantId: banner
      ? banner.productVariantId
      : getAllProduct?.items[0].variants[0].id,
    direction: banner ? banner.direction : "Horizontal",
    displayOrder: 1,
    isActive: false,
  };

  const methods = useForm({
    resolver: yupResolver(BannerSchema),
    defaultValues,
  });

  const { handleSubmit, reset, clearErrors, setValue, watch } = methods;

  const watchProductId = watch("productId");

  useEffect(() => {
    if (!isEdit && getAllProductStatus === ACTION_STATUS.SUCCEEDED) {
      console.log("1");
      setValue("productId", getAllProduct?.items[0].id);
      setValue("productVariantId", getAllProduct?.items[0].variants[0].id);
    }
  }, [getAllProductStatus, isEdit]);

  useEffect(() => {
    if (banner && isEdit) {
      setValue("productId", banner.product?.id);
      setValue("productVariantId", banner.product?.productVariant?.id);
      setValue("direction", banner.direction);
      setValue("displayOrder", banner.displayOrder);
      setValue("isActive", banner.isActive);
    }
  }, [banner, isEdit]);

  const onSubmit = async (data) => {
    if (isEdit) {
      const { direction, displayOrder, isActive } = data;
      const editData = {
        bannerId: banner.id,
        direction,
        displayOrder,
        isActive,
      };

      const actionResult = await dispatch(updateBanner(editData));
      const result = unwrapResult(actionResult);

      if (result.success) {
        enqueueSnackbar("Create banner successfully", { variant: "success" });
        dispatch(getBanners());
        onDialogClose();
        return;
      }

      if (result.errors) {
        const errorKeys = Object.keys(result.errors);
        errorKeys.forEach((key) => {
          result.errors[key].forEach((error) => {
            enqueueSnackbar(error, { variant: "error" });
          });
        });

        return;
      }

      enqueueSnackbar(result.error, { variant: "error" });

      return;
    }

    const actionResult = await dispatch(createBanner(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar("Create banner successfully", { variant: "success" });
      dispatch(getBanners());
      onDialogClose();
      return;
    }

    if (result.errors) {
      const errorKeys = Object.keys(result.errors);
      errorKeys.forEach((key) => {
        result.errors[key].forEach((error) => {
          enqueueSnackbar(error, { variant: "error" });
        });
      });

      return;
    }

    enqueueSnackbar(result.error, { variant: "error" });
  };

  const onDialogClose = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={onDialogClose} fullWidth={true}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            <RHFSelect
              name="productId"
              label="Product Id"
              data={getAllProduct?.items}
              setValue={setValue}
              clearErrors={clearErrors}
              isEdit={isEdit}
            />
            <RHFSelect
              name="productVariantId"
              label="Product Variant Id"
              watchProductId={watchProductId}
              isEdit={isEdit}
              data={getAllProduct?.items.filter(
                (item) => item.id === watchProductId
              )}
              setValue={setValue}
              clearErrors={clearErrors}
            />
            <RHFTextField name="displayOrder" label="Display Order" />
            <RHFSelectDirection
              name="direction"
              label="Direction"
              data={direction}
            />
            <RHFSwitch name="isActive" label="Is Active" id="isActive" />
          </Stack>
        </Box>
        <DialogActions>
          <Stack spacing={1} direction="row" sx={{ mb: 1 }}>
            <Button variant="contained" color="inherit" onClick={onDialogClose}>
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              type="submit"
              loading={
                createBannerStatus === ACTION_STATUS.LOADING
                  ? true
                  : false || updateBrandStatus === ACTION_STATUS.LOADING
                  ? true
                  : false
              }
            >
              {isEdit ? "Update" : "Create"}
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default BannerForm;
