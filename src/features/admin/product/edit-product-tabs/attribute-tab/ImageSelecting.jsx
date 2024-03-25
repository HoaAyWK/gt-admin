import React from 'react';
import { Grid, Box } from '@mui/material';
import { Iconify } from '../../../../../components';
import { styled } from '@mui/material/styles';

const StyledSelected = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  width: 20,
  height: 20,
  borderTopLeftRadius: theme.spacing(0.5),
  borderBottomRightRadius: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  right: 0
}));

const ImageSelecting = (props) => {
  const { imageUrl, id, isSelected, handleClick } = props;

  return (
    <Grid item sm={4} md={2}>
      <Box sx={{ pt: '100%', width: '100%', height: '100%', position: 'relative' }}>
        <Box
          component='img'
          src={imageUrl}
          alt={id}
          sx={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 1,
            cursor: 'pointer',
            position: 'absolute'
          }}
          loading='lazy'
          onClick={() => handleClick(id)}
        />
        {isSelected && (
          <StyledSelected className='check'>
            <Iconify icon='material-symbols:check' width={16} height={16} />
          </StyledSelected>
        )}
      </Box>
    </Grid>
  )
};

export default ImageSelecting;
