import React, { useState, useMemo } from 'react';
import { Box, Typography, TableRow, TableCell, Stack } from '@mui/material';

import { MoreMenu, MoreMenuItem } from '../../../../../components/table';
import { Iconify } from '../../../../../components';
import VariantForm from './VariantForm';

const ProductVariantLine = ({ productId, attributes, variant, images }) => {
  const { id, attributes: selectedAttribute, price, stockQuantity, isActive } = variant;
  const [openVariantForm, setOpenVariantForm] = useState(false);

  const combinedAttributes = useMemo(() => {
    return attributes.filter(attribute => attribute.canCombine)
  }, [attributes]);

  const handleCloseVariantForm = () => {
    setOpenVariantForm(false);
  };

  const handleOpenVariantForm = () => {
    setOpenVariantForm(true);
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
      >
        <TableCell align='left' sx={{ maxWidth: 200 }}>
          <Stack spacing={1}>
            {Object.keys(selectedAttribute).map(key => (
              <Typography
                key={key}
                variant='body1'
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
              >
                {key}: {selectedAttribute[key]}
              </Typography>
            ))}
          </Stack>
        </TableCell>
        <TableCell align='right' sx={{ maxWidth: 300 }}>
          <Typography
            variant='body1'
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {price}
          </Typography>
        </TableCell>
        <TableCell align='right' sx={{ maxWidth: 300 }}>
          {stockQuantity}
        </TableCell>
        <TableCell align='center' sx={{ maxWidth: 300 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
            <Iconify
              icon={isActive ? 'material-symbols:check' : 'ic:baseline-minus'}
              width={24}
              height={24}
              style={{ color: isActive ? '#00B074' : '#454F5B' }}
            />
          </Box>
        </TableCell>
        <TableCell align="right">
          <MoreMenu>
            <MoreMenuItem
              title='Edit'
              handleClick={handleOpenVariantForm}
              iconName='eva:edit-outline'
            />
            <MoreMenuItem title="Delete" iconName="eva:trash-2-outline"  />
          </ MoreMenu>
        </TableCell>
      </TableRow>
      <VariantForm
        open={openVariantForm}
        handleClose={handleCloseVariantForm}
        dialogTitle='Edit Product Variant'
        dialogContent='Edit product variant'
        isEdit={true}
        productId={productId}
        attributes={combinedAttributes}
        variant={variant}
        images={images}
        // action={editVariant}
        // status={addVariantStatus}
      />
    </>
  );
};

export default ProductVariantLine;
