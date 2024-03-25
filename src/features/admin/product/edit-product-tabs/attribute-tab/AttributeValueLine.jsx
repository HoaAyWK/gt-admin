import React, { useState } from 'react';
import { Box, Typography, TableRow, TableCell } from '@mui/material';

import { MoreMenu, MoreMenuItem, MoreMenuItemLink } from '../../../../../components/table';
import AttributeValueForm from './AttributeValueForm';

const AttributeValueLine = ({ attributeValue }) => {
  const { id, name, alias, priceAdjustment, displayOrder } = attributeValue;
  const [openAttributeValueForm, setOpenAttributeValueForm] = useState(false);

  const handleOpenAttributeValueForm = () => {
    setOpenAttributeValueForm(true);
  };

  const handleCloseAttributeValueForm = () => {
    setOpenAttributeValueForm(false);
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
      >
        <TableCell align='left' sx={{ maxWidth: 200 }}>
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
        <TableCell align='left' sx={{ maxWidth: 200 }}>
          <Typography
            variant='body1'
          >
            {alias}
          </Typography>
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
            {priceAdjustment}
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
            <MoreMenuItem title="Delete" iconName="eva:trash-2-outline"  />
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
    </>
  );
};

export default AttributeValueLine;
