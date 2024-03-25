import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, IconButton, Tooltip } from '@mui/material';

import { Iconify, Label } from '../../../../../components';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[900], 0.32),
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[900], 0.64)
  },
}));

const ProductImage = ({ image, isMain, height }) => {

  return (
    <Box
      sx={{
        position: 'relative'
      }}
    >
      <Box
        component='img'
        src={image}
        alt='image'
        sx={{
          width: '100%',
          height: `${height ? height : '100%'}`,
          objectFit: 'cover',
          borderRadius: 1,
        }}
        loading='lazy'
      />
      {isMain && (
        <Label
          variant='filled'
          color='success'
          aria-label='favorite'
          sx={{
            zIndex: 9,
            top: 0,
            left: 0,
            position: 'absolute'
          }}
        >
          <Iconify icon='eva:checkmark-fill' width={16} height={16} />
          &nbsp;
          Main
        </Label>
      )}
      <Tooltip title='Delete' sx={{ position: 'absolute', top: 6, right: 6 }}>
        <StyledIconButton size='small'>
          <Iconify icon='material-symbols:close-rounded' width={20} height={20} />
        </StyledIconButton>
      </Tooltip>
      {/* <ConfirmDeleteBannerDialog
        dialogTitle='Delete banner'
        dialogContent='Are you sure to delete this banner'
        open={openConfirmDelete}
        onDialogClose={handleCloseConfirmDelete}
        banner={image}
      /> */}
    </Box>
  );
};

export default ProductImage;
