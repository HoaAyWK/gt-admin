import React, { useState } from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { deleteBrand, updateBrand } from './brandSlice';
import { MoreMenu, MoreMenuItem } from '../../../components/table';
import BrandForm from './BrandForm';
import { ConfirmDialog } from '../components';

const BrandLine = ({ brand }) => {
  const { id, name, phone } = brand;
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { updateBrandStatus, deleteBrandStatus } = useSelector((state) => state.adminBrands);

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
        <TableCell component='th' scope='row'>
          <Typography variant='body1'>{name}</Typography>
        </TableCell>
        <TableCell>
          {phone}
        </TableCell>
        <TableCell align="right">
          <MoreMenu>
            <MoreMenuItem title='Edit' iconName='eva:edit-outline' handleClick={handleOpenEdit} />
            <MoreMenuItem title="Delete" iconName="eva:trash-2-outline" handleClick={handleOpenConfirm} id={id}/>
          </ MoreMenu>
        </TableCell>
      </TableRow>
      <BrandForm
        dialogTitle='Edit Brand'
        open={openEdit}
        handleClose={handleCloseEdit}
        isEdit={true}
        action={updateBrand}
        status={updateBrandStatus}
        brand={brand}
      />
      <ConfirmDialog
        dialogTitle='Confirm Delete'
        dialogContent='Are you sure to delete this brand'
        open={openConfirm}
        handleClose={handleCloseConfirm}
        action={deleteBrand}
        status={deleteBrandStatus}
        id={brand.id}
      />
    </>
  );
};

export default BrandLine;
