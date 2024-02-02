import React from 'react';
import { Box } from '@mui/material';

const ProductVariantImage = ({ image }) => {
  return (
    <Box
      sx={{
        display: 'block'
      }}
    >
      <Box
        component='span'
        sx={{
          lineHeight: 1,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
        }}
      >
        <Box
          component='span'
          sx={{
            width: '100%',
            height: '100%',
            display: 'block',
            backgroundSize: 'cover'
          }}
        >
          <Box
            component='img'
            sx={{
              width: '100%',
              height: '100%',
              display: 'inline-block',
              objectFit: 'cover',
              borderRadius: 1
            }}
            src={image}
            alt='thumbnail'
            loading='lazy'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductVariantImage;
