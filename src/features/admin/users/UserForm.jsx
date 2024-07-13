import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, InputAdornment, CardContent, Grid, IconButton, Switch, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { AvatarUploader } from '../../../components';
import { FormProvider, RHFDateTextField, RHFRadioGroup, RHFTextField } from '../../../components/hook-form';
import ACTION_STATUS from '../../../constants/actionStatus';
import { refresh } from './userSlice';
import { Iconify } from '../../../components';


const UserForm = ({  isEdit, defaultUser, action, status }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const UserSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required.'),
    lastName: Yup.string()
      .required('Last Name is required.'),
    email: Yup.string()
      .email('Email must be a valid email address.')
      .required('Email is required.'),
    phoneNumber: Yup.string()
      .required('Phone is required.')
      .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Phone is not valid.'),
    avatar: Yup.mixed(),
    password: Yup
      .string()
      .required('Password is required.')
  });

  const defaultValues = defaultUser ? defaultUser : {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    avatar: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    const formData = { ...data, role: isAdmin ? 'Admin' : 'Customer', isEmailConfirmed };
    const actionResult = await dispatch(action(formData));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar(`${isEdit ? 'Updated' : 'Created'} successfully`, { variant: 'success' });
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

  const handleSwitchChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  const handleSwitchEmailConfirmedChange = (event) => {
    setIsEmailConfirmed(event.target.checked);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: (theme) => theme.spacing(1) }}>
            <CardContent>
              <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <AvatarUploader name='avatar' />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 3
                }}
              >
                <Typography variant='subtitle1'>
                  Is Admin
                </Typography>
                <Switch
                  checked={isAdmin}
                  inputProps={{ 'aria-label': 'switch admin or not' }}
                  onChange={handleSwitchChange}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 1
                }}
              >
                <Typography variant='subtitle1'>
                  Email Confirmed
                </Typography>
                <Switch
                  checked={isEmailConfirmed}
                  inputProps={{ 'aria-label': 'switch confirmed email or not' }}
                  onChange={handleSwitchEmailConfirmedChange}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <RHFTextField name='email' label='Email' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='password'
                    type={showPassword ? 'text' : 'password' }
                    label='Password'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name='firstName' label='First Name' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name='lastName' label='Last Name' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name='phoneNumber' label='Phone' />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 3
                }}
              >
                <LoadingButton type='submit' variant='contained' loading={status === ACTION_STATUS.LOADING ? true : false}>
                  {isEdit ? 'Update' : 'Create'}
                </LoadingButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default UserForm;
