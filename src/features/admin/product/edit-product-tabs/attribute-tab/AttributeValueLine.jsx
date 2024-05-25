import React, { useState } from 'react';
import { Box, Stack, Typography, TableRow, TableCell } from '@mui/material';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

import { MoreMenu, MoreMenuItem } from '../../../../../components/table';
import AttributeValueForm from './AttributeValueForm';
import { ConfirmDialog } from '../../../components';
import { deleteAttributeValue } from '../../productSlice';
import { fCurrency } from '../../../../../utils/formatNumber';

const ColorBoxWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5),
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
}));

const ColorBox = styled(Box)(({ theme }) => ({
  width: 24,
  height: 20,
  borderRadius: theme.spacing(0.5),
}));


const AttributeValueLine = ({ productId, attributeId, attributeValue, colorable }) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { id, name, color, priceAdjustment, displayOrder } = attributeValue;
  const [openAttributeValueForm, setOpenAttributeValueForm] = useState(false);
  const { deleteAttributeValueStatus } = useSelector((state) => state.products);

  const handleOpenAttributeValueForm = () => {
    setOpenAttributeValueForm(true);
  };

  const handleCloseAttributeValueForm = () => {
    setOpenAttributeValueForm(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
      >
        <TableCell align='left' sx={{ maxWidth: 200 }}>
          <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
            {colorable && (
              <ColorBoxWrapper>
                <ColorBox sx={{ background: color }} />
              </ColorBoxWrapper>
            )}
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
            {priceAdjustment === 0 ? '$0' : fCurrency(priceAdjustment)}
          </Typography>
        </TableCell>
        <TableCell align='center' sx={{ maxWidth: 300 }}>
          {displayOrder}
        </TableCell>
        <TableCell align="right">
          <MoreMenu>
            <MoreMenuItem
              title='Edit'
              iconName='eva:edit-outline'
              handleClick={handleOpenAttributeValueForm}
            />
            <MoreMenuItem
              title="Delete"
              iconName="eva:trash-2-outline"
              handleClick={handleOpenConfirmDialog}
            />
          </ MoreMenu>
        </TableCell>
      </TableRow>
      <AttributeValueForm
        dialogTitle='Edit Attribute Value'
        dialogContent='Update attribute value'
        isEdit={true}
        open={openAttributeValueForm}
        handleClose={handleCloseAttributeValueForm}
        attributeValue={attributeValue}
      />
      <ConfirmDialog
        dialogTitle={`Delete "${name}" Attribute Value`}
        dialogContent='Are you sure you want to delete this attribute value?'
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        action={deleteAttributeValue}
        status={deleteAttributeValueStatus}
        id={id}
        productId={productId}
        attributeId={attributeId}
      />
    </>
  );
};

export default AttributeValueLine;
