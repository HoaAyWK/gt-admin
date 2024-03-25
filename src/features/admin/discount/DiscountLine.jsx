import React, { useState } from 'react';
import { Box, TableRow, TableCell, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { MoreMenu, MoreMenuItem } from '../../../components/table';
import { fDateTime } from '../../../utils/formatTime';
import { updateDiscount, deleteDiscount } from './discountSlice';
import { Iconify } from '../../../components';
import DiscountForm from './DiscountForm';

const DiscountLine = ({ discount }) => {
  const {
    id,
    name,
    discountPercentage,
    discountAmount,
    usePercentage,
    startDate,
    endDate,
    createdDateTime,
    updatedDateTime
  } = discount;

  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { updateDiscountStatus, deleteDiscountStatus } = useSelector((state) => state.discounts);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <TableRow
        key={name}
        hover
        tabIndex={-1}
      >
        <TableCell component='th' scope='row' align='left'>
          <Typography variant='body1'>{name}</Typography>
        </TableCell>
        <TableCell sx={{ maxWidth: 100 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
            <Iconify
              icon={usePercentage ? 'material-symbols:check' : 'ic:baseline-minus'}
              width={24}
              height={24}
              style={{ color: usePercentage ? '#00B074' : '#454F5B' }}
            />
          </Box>
        </TableCell>
        <TableCell component='th' scope='row' align='right'>
          <Typography variant='body1'>{discountPercentage * 100}%</Typography>
        </TableCell>
        <TableCell component='th' scope='row' align='right'>
          <Typography variant='body1'>${discountAmount}</Typography>
        </TableCell>
        <TableCell component='th' scope='row' align='left'>
          <Typography variant='body1'>{fDateTime(startDate)}</Typography>
        </TableCell>
        <TableCell component='th' scope='row' align='left'>
          <Typography variant='body1'>{fDateTime(endDate)}</Typography>
        </TableCell>
        <TableCell align="right">
          <MoreMenu>
            <MoreMenuItem
              title='Edit'
              iconName='eva:edit-outline'
              handleClick={handleOpenEdit}
            />
            <MoreMenuItem
              title="Delete"
              iconName="eva:trash-2-outline"
              handleClick={handleOpenConfirm}
              id={id}
            />
          </ MoreMenu>
        </TableCell>
      </TableRow>
      <DiscountForm
        dialogTitle='Edit discount'
        open={openEdit}
        handleClose={handleCloseEdit}
        isEdit={true}
        action={updateDiscount}
        status={updateDiscountStatus}
        discount={discount}
      />
      {/* <ConfirmDialog
        dialogTitle='Confirm Delete'
        dialogContent='Are you sure to delete this discount?'
        open={openConfirm}
        handleClose={handleCloseConfirm}
        action={deleteDiscount}
        status={deleteDiscountStatus}
        id={discount.id}
      /> */}
    </>
  );
};

export default DiscountLine;
