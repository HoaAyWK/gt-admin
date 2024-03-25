import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import ProductImage from './ProductImage';
import { addImage } from '../../productSlice';

import { Iconify } from '../../../../../components';
import ProductImageForm from './ProductImageForm';

const ImagesTab = ({ productId, images }) => {
  const [openProductImageForm, setOpenProductImageForm] = useState(false);
  const { addImageStatus } = useSelector((state) => state.products);

  const handleOpenProductImageForm = () => {
    setOpenProductImageForm(true);
  };

  const handleCloseProductImageForm = () => {
    setOpenProductImageForm(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h5' component='h2'>Product images</Typography>
        <Button variant='contained' color='primary' onClick={handleOpenProductImageForm}>
          <Iconify icon='material-symbols:add' width={20} height={20} />
          Add Image
        </Button>
      </Box>
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item key={image.id} sm={12} md={2}>
            <ProductImage image={image.imageUrl} isMain={image.isMain} height='120px' />
          </Grid>
        ))}
      </Grid>
      <ProductImageForm
        open={openProductImageForm}
        handleClose={handleCloseProductImageForm}
        dialogTitle='Add Product Image'
        dialogContent='Upload a new image for the product.'
        action={addImage}
        status={addImageStatus}
        isEdit={false}
        productId={productId}
      />
    </>
  );
};

export default ImagesTab;
