import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TableRow, TableCell, Link, Stack, Typography } from '@mui/material';

import { Cover, Label } from '../../../components';
import { COLOR_LIST } from '../../../constants/colors';
import { MoreMenu, MoreMenuItem, MoreMenuItemLink } from '../../../components/table';
import { ConfirmDialog } from '../components';
import { deleteProductVariant } from './productVariantSlice';
import { useSelector } from 'react-redux';

const ProductVariantLine = ({ variant }) => {
  const { id, name, price, specifications, color, status, media } = variant;
  const [openConfirm, setOpenConfirm] = useState(false);
  const { deleteProductVariantStatus } = useSelector((state) => state.adminProductVariants);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <TableRow
      key={id}
      hover
      tabIndex={-1}
    >
      <TableCell align='left' width={400} sx={{ maxWidth: 400 }}>
        <Link component={RouterLink} to={`/admin/product-variants/details/${id}`} underline='hover'>
          <Stack spacing={1} direction='row' alignItems='center'>
            {media?.length > 0 && (

              <Cover
                component='img'
                src={media?.[0]}
                alt={name}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 1,
                  objectFit: 'cover'
                }}
              />
            )}
            <Typography variant='body1'>{name}</Typography>
          </Stack>
        </Link>
      </TableCell>
      <TableCell width={200}>
        {specifications}
      </TableCell>
      <TableCell width={200}>
        {COLOR_LIST[color]}
      </TableCell>
      <TableCell width={200}>
        <Label color={status ? 'success' : 'error'}>{status ? 'Available' : 'Unavailable'}</Label>
      </TableCell>
      <TableCell align='right' width={200}>
        ${price}
      </TableCell>
      <TableCell align="right">
        <MoreMenu>
          <MoreMenuItemLink title='Details' to={`/admin/product-variants/details/${id}`} iconName='eva:eye-outline' />
          <MoreMenuItemLink title='Edit' to={`/admin/product-variants/edit/${id}`} iconName='eva:edit-outline' />
          <MoreMenuItem title="Delete" iconName="eva:trash-2-outline" handleClick={handleOpenConfirm} />
        </MoreMenu>
      </TableCell>
      <ConfirmDialog
        dialogTitle='Confirm Delete'
        dialogContent='Are you sure to delete this product variant'
        open={openConfirm}
        handleClose={handleCloseConfirm}
        action={deleteProductVariant}
        status={deleteProductVariantStatus}
        id={id}
      />
    </TableRow>
  );
};

export default ProductVariantLine;
