import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';

const ConfirmDeleteBannerDialog = (props) => {
  const { dialogTitle, dialogContent, onDialogClose, open, banner } = props;
  return (
    <Dialog open={open} onClose={onDialogClose} fullWidth={true}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
      <Box sx={{ px: 15, py: 1 }}>
          <Box
            component='img'
            src={banner}
            alt='img'
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 1
            }}
          />
      </Box>
      <DialogActions>
        <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
          <Button variant='contained' color='inherit' onClick={onDialogClose}>Cancel</Button>
          <LoadingButton
            variant='contained'
            color='error'
            type='submit'
          >
            Delete
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteBannerDialog;
