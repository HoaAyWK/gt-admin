import React from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../../constants/actionStatus';

const ConfirmDialog = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, action, status, ...data } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickConfirm = async () => {
    const actionResult = await dispatch(action(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar("Deleted successfully", { variant: 'success' });
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

      handleClose();
      return;
    }

    enqueueSnackbar(result.error, { variant: "error" });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
      <DialogActions>
        <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
          <Button variant='contained' color='inherit' onClick={handleClose}>Cancel</Button>
          <LoadingButton
            variant='contained'
            color='primary'
            onClick={handleClickConfirm}
            loading={status === ACTION_STATUS.LOADING ? true : false}
          >
            Confirm
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
