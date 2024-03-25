import React, { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, TableRow, TableCell, Link, Typography, Stack } from '@mui/material';

import { Iconify } from '../../../components';
import { createMarkup } from '../../../utils/sanitizeHtml';
import { MoreMenu, MoreMenuItem, MoreMenuItemLink } from '../../../components/table';
import { ConfirmDialog } from '../components';
import defaultImage from '../../../assets/images/default_product_image.png'

const ProductLine = ({ product }) => {
  const { id, name, description, price, published, hasVariant, images } = product;
  const [openConfirm, setOpenConfirm] = useState(false);

  const mainImage = useMemo(() => {
    if (images.length === 0) {
      return defaultImage;
    }

    var image = images.filter(i => i.isMain);

    return image[0].imageUrl;
  }, [images]);

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
        <Stack direction='row' spacing={2} alignItems='center'>
          <Box
            component='img'
            src={mainImage}
            alt={name}
            sx={{
              width: 56,
              height: 56,
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
          <Link component={RouterLink} to={`/admin/products/edit/${id}`} underline='hover'>
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
        </Stack>
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
          variant = 'body1'
          align = 'right'
        >
          {price} $
        </Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: 100 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
          <Iconify
            icon={published ? 'material-symbols:check' : 'ic:baseline-minus'}
            width={24}
            height={24}
            style={{ color: published ? '#00B074' : '#454F5B' }}
          />
        </Box>
      </TableCell>
      <TableCell sx={{ maxWidth: 100 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
          <Iconify
            icon={hasVariant ? 'material-symbols:check' : 'ic:baseline-minus'}
            width={24}
            height={24}
            style={{ color: hasVariant ? '#00B074' : '#454F5B' }}
          />
        </Box>
      </TableCell>
      <TableCell align="right">
        <MoreMenu>
          <MoreMenuItemLink
            title='Edit'
            to={`/admin/products/edit/${id}`}
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

        id={id}
      />
    </TableRow>
  );
};

export default ProductLine;
