import React, { useEffect } from "react";
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
  RHFSwitch,
  RHFTextField,
} from "../../../../../components/hook-form";
import ImageUploader from "./ImageUploader";
import { searchProduct } from '../../productSlice';
import ACTION_STATUS from "../../../../../constants/actionStatus";

const ProductImageForm = (props) => {
  const {
    dialogTitle,
    dialogContent,
    open,
    handleClose,
    isEdit,
    image,
    action,
    status,
    productId,
  } = props;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { page, pageSize, order, orderBy, searchTerm } = useSelector((state) => state.products);

  const ProductImageSchema = Yup.object().shape({
    id: Yup.string(),
    isMain: Yup.boolean(),
    displayOrder: Yup.number().min(
      0,
      "Display order must be a positive number."
    ),
    image: Yup.mixed().required("Image is required."),
  });

  const defaultValues = {
    id: image ? image.id : "",
    displayOrder: image ? image.displayOrder : 0,
    isMain: image ? image.isMain : false,
    image: undefined,
  };

  const methods = useForm({
    resolver: yupResolver(ProductImageSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (image && isEdit) {
      methods.setValue("id", image.id);
      methods.setValue("displayOrder", image.displayOrder);
      methods.setValue("isMain", image.isMain);
      methods.setValue("image", image.imageUrl);
    }
  }, [image, methods]);

  // Update the product list to get the latest data
  useEffect(() => {
    if (status === ACTION_STATUS.SUCCEEDED) {
      dispatch(searchProduct({ searchTerm, page, pageSize, order, orderBy }));
    }
  }, [status]);

  const { handleSubmit, reset, clearErrors, setValue } = methods;

  const onSubmit = async (data) => {
    data.productId = productId;

    const actionResult = await dispatch(action(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar("Created successfully", { variant: "success" });

      // if (!isEdit) {
      //   reset();
      // }
      handleClose();
      reset();
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
            <RHFTextField name="displayOrder" label="Display Order" />
            <RHFSwitch name="isMain" label="Main Image" />
            <ImageUploader
              name="image"
              label="Image"
              setValue={setValue}
              clearErrors={clearErrors}
              imageUrl={image ? image.imageUrl : ""}
            />
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
              loading={status === ACTION_STATUS.LOADING ? true : false}
            >
              Save
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default ProductImageForm;
