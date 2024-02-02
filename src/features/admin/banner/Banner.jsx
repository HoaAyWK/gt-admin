import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, IconButton, Tooltip } from '@mui/material';

import { Iconify } from '../../../components';
import { ConfirmDeleteBannerDialog } from './components';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[900], 0.32),
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[900], 0.64)
  },
}));

const Banner = ({ image, height }) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleOpenConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

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
      <Tooltip title='Delete' sx={{ position: 'absolute', top: 6, right: 6 }}>
        <StyledIconButton size='small' onClick={handleOpenConfirmDelete}>
          <Iconify icon='material-symbols:close-rounded' width={20} height={20} />
        </StyledIconButton>
      </Tooltip>
      <ConfirmDeleteBannerDialog
        dialogTitle='Delete banner'
        dialogContent='Are you sure to delete this banner'
        open={openConfirmDelete}
        onDialogClose={handleCloseConfirmDelete}
        banner={image}
      />
    </Box>
  );
};

export default Banner;
