import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { Iconify, LetterAvatar } from '../../../../../components';

const TopUser = ({ user }) => {
  const { firstName, lastName, numOrders, totalSpend } = user;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Stack spacing={1} direction='row' alignItems='center'>
        <LetterAvatar name={firstName + ' ' + lastName} />
        <Stack spacing={0.5}>
          <Typography variant='body1' color='text.primary'>{firstName + ' ' + lastName}</Typography>
          <Stack spacing={0.5} direction='row'>
            <Iconify icon='solar:delivery-bold' width={20} height={20} sx={{ color: 'text.secondary' }} />
            <Typography variant='body1'>{numOrders}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={1} direction='row' alignItems='center'>
        <Iconify icon='ph:currency-circle-dollar-fill' width={24} height={24} color='success.main' />
        <Typography variant='subtitle1' color='text.primary'>{totalSpend}</Typography>
      </Stack>
    </Box>
  );
};

export default TopUser;
