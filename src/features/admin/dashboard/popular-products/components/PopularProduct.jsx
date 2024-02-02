import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';
import { Iconify } from '../../../../../components';

const StyledBoxIcon = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const PopularProduct = ({ product, index }) => {
  const { name, image, totalOrders } = product;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Stack spacing={1} direction='row'>
        <Box
          component='img'
          src={image}
          alt={name}
          sx={{
            width: 36,
            height: 36,
            objectFit: 'cover',
            borderRadius: 1
          }}
        />
        <Stack spacing={0.5}>
          <Typography variant='body1'>
            {name}
          </Typography>
          <Typography variant='body2'>
            {totalOrders} Orders
          </Typography>
        </Stack>
      </Stack>
      {index === 0 && (
        <StyledBoxIcon
          sx={{
            background: (theme) => `${alpha(theme.palette.warning.main, 0.16)}`
          }}
        >
          <Iconify icon='mdi:trophy' width={24} height={24} color='warning.main' />
        </StyledBoxIcon>
      )}
      {index === 1 && (
        <StyledBoxIcon
          sx={{
            background: (theme) => `${theme.palette.background.neutral}`
          }}
        >
          <Iconify icon='mdi:trophy' width={24} height={24} color='text.secondary' />
        </StyledBoxIcon>
      )}
      {index === 2 && (
        <StyledBoxIcon
          sx={{
            background: (theme) => `${alpha('#774E12', 0.16)}`
          }}
        >
          <Iconify icon='mdi:trophy' width={24} height={24} color='#774E12' />
        </StyledBoxIcon>
      )}
    </Box>
  );
};

export default PopularProduct;
