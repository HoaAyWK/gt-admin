import React, { useState, useMemo } from 'react';
import { Box, Stack, TableRow, TableCell, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { deleteBrand, updateBrand } from './brandSlice';
import { MoreMenu, MoreMenuItem } from '../../../components/table';
import BrandForm from './BrandForm';
import { ConfirmDialog } from '../components';
import { fDateTime } from '../../../utils/formatTime';
import emptyImage from '../../../assets/images/default_product_image.png';

const BrandLine = ({ brand }) => {
  const { id, name, imageUrl, createdDateTime, updatedDateTime } = brand;
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { updateBrandStatus, deleteBrandStatus } = useSelector((state) => state.adminBrands);
  const image = useMemo(() => {
    if (imageUrl) {
      return imageUrl;
    }
    return emptyImage;
  }, [imageUrl]);

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
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              component="img"
              src={image}
              alt={name}
              sx={{
                width: 34,
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align='left'>
          {fDateTime(createdDateTime)}
        </TableCell>
        <TableCell align='left'>
          {fDateTime(updatedDateTime)}
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
        dialogContent='Are you sure to delete this brand?'
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
