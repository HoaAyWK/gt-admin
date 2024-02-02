import React from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../../constants/actionStatus';

const ConfirmDialog = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, action, status, id } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickConfirm = async () => {
    try {
      const actionResult = await dispatch(action(id));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar("Delete successfully", { variant: 'success' });
        handleClose();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
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
