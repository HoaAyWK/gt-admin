import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TableRow, TableCell, Link, Typography } from '@mui/material';

import { createMarkup } from '../../../utils/sanitizeHtml';
import { MoreMenu, MoreMenuItem, MoreMenuItemLink } from '../../../components/table';
import { ConfirmDialog } from '../components';
import { deleteProductOrigin } from './productOriginSlice';

const ProductOriginLine = ({ productOrigin }) => {
  const { id, name, description, information } = productOrigin;
  const [openConfirm, setOpenConfirm] = useState(false);

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
      <TableCell align='left' sx={{ maxWidth: 300 }}>
        <Link component={RouterLink} to={`/admin/product-origins/details/${id}`} underline='hover'>
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
        </Link>
      </TableCell>
      <TableCell sx={{ maxWidth: 400 }}>
        <Typography
          variant='body1'
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            height: 24,
            '& p': {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            },
            '& span': {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              color: 'inherit !important',
              backgroundColor: 'inherit !important',
              width: 'auto'
            },
            '& img': {
              display: 'none !important'
            },

          }}
          dangerouslySetInnerHTML={createMarkup(description)}
        >
        </Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: 400 }}>
        <Typography
          variant='body1'
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            height: 24,
            '& p': {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            },
            '& span': {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              color: 'inherit !important',
              backgroundColor: 'inherit !important',
              width: 'auto'
            },
            '& img': {
              display: 'none !important'
            },
          }}
          dangerouslySetInnerHTML={createMarkup(information)}
        >
        </Typography>
      </TableCell>
      <TableCell align="right">
        <MoreMenu>
          <MoreMenuItemLink
            title='Details'
            to={`/admin/product-origins/details/${id}`}
            iconName='eva:eye-outline'
          />
          <MoreMenuItemLink
            title='Edit'
            to={`/admin/product-origins/edit/${id}`}
            iconName='eva:edit-outline'
          />
          <MoreMenuItem title="Delete" iconName="eva:trash-2-outline" handleClick={handleOpenConfirm} />
        </ MoreMenu>
      </TableCell>
      <ConfirmDialog
        dialogTitle='Confirm Delete'
        dialogContent='Are you sure to delete this product origin'
        open={openConfirm}
        handleClose={handleCloseConfirm}
        action={deleteProductOrigin}
        id={id}
      />
    </TableRow>
  );
};

export default ProductOriginLine;
