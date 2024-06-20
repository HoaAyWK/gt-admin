import React, { useMemo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Iconify } from '../../../../../components';
import AttributeList from './AttributeList';
import ProductVariantList from './ProductVariantList';
import ProductAttributeForm from './ProductAttributeForm';
import VariantForm from './VariantForm';
import { addAttribute, addVariant } from '../../productSlice';

const AttributesTab = ({ productId, product, attributes, variants, images }) => {
  const [openProductAttributeForm, setOpenProductAttributeForm] = useState(false);
  const [openVariantForm, setOpenVariantForm] = useState(false);
  const { addAttributeStatus, addVariantStatus } = useSelector((state) => state.products);

  const canAddVariant = useMemo(() => {
    if (images && images.length > 0) {
      return true;
    }

    return false;
  }, [images]);

  const combinedAttributes = useMemo(() => {
    return attributes.filter(attribute => attribute.canCombine)
  }, [attributes]);

  const handleCloseAttributeForm = () => {
    setOpenProductAttributeForm(false);
  };

  const handleOpenAttributeForm = () => {
    setOpenProductAttributeForm(true);
  };

  const handleOpenVariantForm = () => {
    setOpenVariantForm(true);
  };

  const handleCloseVariantForm = () => {
    setOpenVariantForm(false);
  };

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography component='h2' variant='h5'>Attributes</Typography>
        <Button variant='contained' color='primary' onClick={handleOpenAttributeForm}>
          <Iconify icon='material-symbols:add' width={20} height={20} />
          Add Attribute
        </Button>
      </Box>
      <Box sx={{ mt: 2, width: '100%' }}>
        <AttributeList productId={productId} attributes={attributes} />
      </Box>
      <ProductAttributeForm
        dialogTitle='Add Product Attribute'
        dialogContent='Add a new product attribute'
        isEdit={false}
        open={openProductAttributeForm}
        handleClose={handleCloseAttributeForm}
        productId={productId}
        action={addAttribute}
        status={addAttributeStatus}
      />
      {attributes.length > 0 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Typography component='h2' variant='h5'>Product Variants (Attribute Combinations)</Typography>
            <Button variant='contained' color='primary' disabled={!canAddVariant} onClick={handleOpenVariantForm}>
              <Iconify icon='material-symbols:add' width={20} height={20} />
              Add Variant
            </Button>
          </Box>
          <Box sx={{ mt: 2, width: '100%' }}>
            <ProductVariantList
              variants={variants}
              productId={productId}
              product={product}
              attributes={attributes}
              images={images}
            />
          </Box>
          <VariantForm
            open={openVariantForm}
            product={product}
            handleClose={handleCloseVariantForm}
            dialogTitle='Add Product Variant'
            dialogContent='Add a new product variant'
            isEdit={false}
            productId={productId}
            attributes={combinedAttributes}
            action={addVariant}
            status={addVariantStatus}
            images={images}
          />
        </>
      )}
    </Box>
  );
};

export default AttributesTab;
