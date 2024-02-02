import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";

import { AvatarUploader } from "../../../components";
import {
  FormProvider,
  RHFDateTextField,
  RHFRadioGroup,
  RHFTextField,
} from "../../../components/hook-form";
import ACTION_STATUS from "../../../constants/actionStatus";
import { refresh, updateUser } from "./userSlice";
import { fDateN } from "../../../utils/formatTime";

const genders = ["Male", "Female"];

const EditUserForm = ({ user }) => {
  const [isAdmin, setIsAdmin] = useState(user?.role === "admin" ? true : false);
  // const { updateUserStatus } = useSelector((state) => state.adminUsers);
  // const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();

  const UserSchema = Yup.object().shape({
    id: Yup.string(),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    gender: Yup.string().required("Gender is required"),
    birthDate: Yup.string().required("Date of birth is required"),
    address: Yup.string().required("Address is required"),
    avatar: Yup.mixed(),
  });

  const defaultValues = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    birthDate: fDateN(user.birthDate),
    avatar: "",
    address: user.address,
  };

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    const formData = { ...data, role: isAdmin ? "admin" : "user" };

    // try {
    //   const actionResult = await dispatch(updateUser(formData));
    //   const result = unwrapResult(actionResult);

    //   if (result) {
    //     enqueueSnackbar(`Update successfully`, { variant: 'success' });
    //     dispatch(refresh());
    //   }
    // } catch (error) {
    //   enqueueSnackbar(error.message, { variant: 'error' });
    // }
  };

  const handleSwitchChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AvatarUploader name="avatar" avatarUrl={user.avatar} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 3,
                }}
              >
                <Typography variant="subtitle1">Is Admin</Typography>
                <Switch
                  checked={isAdmin}
                  inputProps={{ "aria-label": "switch admin or not" }}
                  onChange={handleSwitchChange}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <RHFTextField name="id" type="hidden" sx={{ display: "none" }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <RHFTextField name="email" disabled label="Email" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name="firstName" label="First Name" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name="lastName" label="Last Name" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name="phone" label="Phone" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFDateTextField name="birthDate" label="Date Of Birth" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFRadioGroup
                    name="gender"
                    id="radios-gender"
                    label="Gender"
                    items={genders}
                    row
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="address"
                    label="Address"
                    multiline
                    minRows={3}
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 3,
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  // loading={
                  //   updateUserStatus === ACTION_STATUS.LOADING ? true : false
                  // }
                >
                  Update
                </LoadingButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default EditUserForm;
