import React, { useState } from 'react';
import { TableRow,TableCell, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Label } from '../../../components';
import { MoreMenu, MoreMenuItem } from '../../../components/table';
import { deleteCategory, updateCategory } from './categorySlice';
import CategoryForm from './CategoryForm';
import { ConfirmDialog } from '../components';

const CategoryLine = ({ category }) => {
  const { name, status } = category;
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { updateCategoryStatus, deleteCategoryStatus } = useSelector((state) => state.adminCategories);

  const handleClickOpenEdit = () => {
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
          <Label color={ status === true ? 'success' : 'error' }>{status ? 'Available' : 'Unavailable'}</Label>
        </TableCell>
        {/* <TableCell align='right'>
          {numberOfProducts}
        </TableCell> */}
        <TableCell align="right">
          <MoreMenu>
            <MoreMenuItem title='Edit' iconName='eva:edit-outline' handleClick={handleClickOpenEdit} />
            <MoreMenuItem title='Delete' iconName='eva:trash-2-outline' handleClick={handleOpenConfirm} />
          </MoreMenu>
        </TableCell>
      </TableRow>
      <CategoryForm
        isEdit={true}
        dialogTitle={'Edit Category'}
        open={openEdit}
        handleClose={handleCloseEdit}
        action={updateCategory}
        actionStatus={updateCategoryStatus}
        category={category}
      />
      <ConfirmDialog
        dialogTitle='Confirm Delete'
        dialogContent='Are you sure to delete this category'
        open={openConfirm}
        action={deleteCategory}
        status={deleteCategoryStatus}
        handleClose={handleCloseConfirm}
        id={category.id}
      />
    </>
  );
};

export default CategoryLine;
