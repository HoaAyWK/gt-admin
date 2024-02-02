import React, { useState } from 'react';
import { TableRow, TableCell, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { MoreMenu, MoreMenuItem } from '../../../components/table';
import InventoryForm from './InventoryForm';
import { updateInventory } from './inventorySlice';

const InventoryLine = ({ inventory, onSelectProduct }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { productId, productName, quantity, id } = inventory;
  const { updateInventoryStatus } = useSelector((state) => state.adminInventories);

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleClickProductId = () => {
    onSelectProduct(productId);
  };

  return (
    <>
      <TableRow
        key={productId}
        hover
        tabIndex={-1}
      >
        <TableCell component='th' scope='row'>
          <Button color='inherit' onClick={handleClickProductId} >
            {productId}
          </Button>
        </TableCell>
        <TableCell>
        <Typography variant='body1'>{productName}</Typography>
        </TableCell>
        <TableCell align='right'>
          {quantity}
        </TableCell>
        <TableCell align="right">
          <MoreMenu>
            <MoreMenuItem title='Edit' iconName='eva:edit-outline' handleClick={handleOpenEditDialog} />
          </ MoreMenu>
        </TableCell>
      </TableRow>

      <InventoryForm
        dialogTitle='Edit Inventory'
        isEdit={true}
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        inventory={inventory}
        action={updateInventory}
        status={updateInventoryStatus}
      />
    </>
  );
};

export default InventoryLine;
