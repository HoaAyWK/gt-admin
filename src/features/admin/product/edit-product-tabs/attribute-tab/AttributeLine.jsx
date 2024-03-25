import React, { useState } from 'react';
import { Box, TableRow, TableCell, Typography, Link } from '@mui/material';
import { useSelector } from 'react-redux';

import { Iconify } from '../../../../../components/';
import { MoreMenu, MoreMenuItem } from '../../../../../components/table';
import ProductAttributeForm from './ProductAttributeForm';
import AttributeValueListDialog from './AttributeValueListDialog';
import { addAttributeValue } from '../../productSlice';

const AttributeLine = ({ productId, attribute }) => {
  const { id, name, canCombine, displayOrder } = attribute;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAttributeForm, setOpenAttributeForm] = useState(false);
  const [openAttributeValueListDialog, setOpenAttributeValueListDialog] = useState(false);
  const { addAttributeValueStatus } = useSelector((state) => state.products);

  const handleOpenAttributeForm = () => {
    setOpenAttributeForm(true);
  };

  const handleCloseAttributeForm = () => {
    setOpenAttributeForm(false);
  };

  const handleOpenAttributeValueListDialog = () => {
    setOpenAttributeValueListDialog(true);
  };

  const handleCloseAttributeValueListDialog = () => {
    setOpenAttributeValueListDialog(false);
  };

  return (
    <>
      <TableRow
        key={id}
        hover
        tabIndex={-1}
      >
        <TableCell align='left' sx={{ maxWidth: 300 }}>
          <Typography
            variant='body1'
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {name}
          </Typography>
        </TableCell>
        <TableCell align='center' sx={{ maxWidth: 300 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
            <Iconify
              icon={canCombine ? 'material-symbols:check' : 'ic:baseline-minus'}
              width={24}
              height={24}
              style={{ color: canCombine ? '#00B074' : '#454F5B' }}
            />
          </Box>
        </TableCell>
        <TableCell sx={{ maxWidth: 400 }}>
          <Typography
            variant = 'body1'
            align = 'left'
          >
            {displayOrder}
          </Typography>
        </TableCell>
        <TableCell sx={{ maxWidth: 400 }}>
          <Link underline='hover' onClick={handleOpenAttributeValueListDialog} sx={{ cursor: 'pointer' }}>
            <Typography
            variant = 'body1'
            align = 'left'
            >
              Edit Options (Total {attribute.attributeValues.length} options)
            </Typography>
          </Link>
        </TableCell>
        <TableCell align="right">
          <MoreMenu>
            <MoreMenuItem
              title='Edit'
              handleClick={handleOpenAttributeForm}
              iconName='eva:edit-outline'
            />
            <MoreMenuItem title="Delete" iconName="eva:trash-2-outline"  />
          </ MoreMenu>
        </TableCell>
      </TableRow>
      <ProductAttributeForm
        dialogTitle='Edit Product Attribute'
        dialogContent='Update product attribute'
        isEdit={true}
        open={openAttributeForm}
        handleClose={handleCloseAttributeForm}
        attribute={attribute}
        // action={createBrand}
        // status={createBrandStatus}
      />
      <AttributeValueListDialog
        productId={productId}
        attributeValues={attribute.attributeValues}
        attributeName={attribute.name}
        attributeId={attribute.id}
        open={openAttributeValueListDialog}
        handleClose={handleCloseAttributeValueListDialog}
        action={addAttributeValue}
        status={addAttributeValueStatus}
      />
    </>
  );
};

export default AttributeLine;
