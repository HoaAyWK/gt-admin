import { FormProvider, RHFTextField } from "../../../../components/hook-form";
import Iconify from "../../../../components/iconify/Iconify";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SettingLayout from "../../../../layouts/setting/SettingLayout";

export default function Password(props) {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      "Confirm Password must match New Password"
    ),
  });

  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SettingLayout>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="h1">
          Change password
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12} sm={7}>
                <Stack spacing={2}>
                  <RHFTextField
                    name="oldPassword"
                    type="password"
                    label="Old Password"
                  />
                  <RHFTextField
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    label="New Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            edge="end"
                          >
                            <Iconify
                              icon={
                                showNewPassword
                                  ? "eva:eye-fill"
                                  : "eva:eye-off-fill"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <RHFTextField
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            <Iconify
                              icon={
                                showConfirmPassword
                                  ? "eva:eye-fill"
                                  : "eva:eye-off-fill"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  component="div"
                  sx={{ mb: 0.5 }}
                >
                  Make sure it's at least 15 characters OR at least 8 characters
                  including a number and a lowercase letter.
                </Typography>
                <LoadingButton type="submit" variant="outlined">
                  Update Password
                </LoadingButton>
              </Box>
            </Grid>
          </FormProvider>
        </Box>
      </Box>
    </SettingLayout>
  );
}
