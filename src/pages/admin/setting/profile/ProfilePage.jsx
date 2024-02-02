import React from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import {
  FormProvider,
  RHFDateTextField,
  RHFTextField,
  RHFRadioGroup,
} from "../../../../components/hook-form";
import AvatarUploader from "../../../../components/avatar-uploader/AvatarUploader";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SettingLayout from "../../../../layouts/setting/SettingLayout";
const genders = ["Male", "Female"];

const user = {
  avatar:
    "https://i.pinimg.com/736x/28/41/71/2841716e64ff836211f9a433bca44147.jpg",
  firstName: "Pam",
  lastName: "Pam",
  email: "PamYeuOi@gmail.com",
};

const AccountSettings = () => {
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phone: Yup.string().required("Phone is required"),
    birthDate: Yup.string().required("Date of birth is required"),
    gender: Yup.string(),
    image: Yup.mixed(),
  });

  // const defaultValues = {
  //   firstName: user?.firstName,
  //   lastName: user?.lastName,
  //   phone: user?.phone,
  //   address: user?.address,
  //   birthDate: user?.birthDate,
  //   gender: user?.gender,
  //   avatar: ''
  // };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    // defaultValues
  });

  const { handleSubmit, reset } = methods;
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    enqueueSnackbar("Update profile successfully", { variant: "success" });
  });

  return (
    <SettingLayout>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="h1">
          My Profile
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Grid
              container
              spacing={2}
              sx={{
                flexDirection: {
                  xs: "column-reverse",
                  md: "row",
                },
              }}
            >
              <Grid item xs={12} md={8}>
                <Stack spacing={2}>
                  <RHFTextField name="firstName" label="First Name" />
                  <RHFTextField name="lastName" label="Last Name" />
                  <RHFTextField name="phone" label="Phone" />
                  <RHFDateTextField name="birthDate" label="Date of birth" />
                  <RHFRadioGroup
                    name="gender"
                    id="gender-radios"
                    label="Gender"
                    items={genders}
                    row
                  />
                </Stack>
                <Box sx={{ mt: 2 }}>
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Update Profile
                  </LoadingButton>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2">Profile picture</Typography>
                <Box sx={{ marginBlock: 1 }}>
                  <AvatarUploader avatarUrl={user?.avatar} name="avatar" />
                </Box>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </Box>
    </SettingLayout>
  );
};

export default AccountSettings;
