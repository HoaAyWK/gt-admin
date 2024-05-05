import React, { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, TableRow, TableCell, Link, Typography, Stack, Avatar } from '@mui/material';

import PATHS from '../../../../../constants/paths';
import { fDateTime } from '../../../../../utils/formatTime';
import { Label } from '../../../../../components';
import { fCurrency } from '../../../../../utils/formatNumber';
import { MoreMenu, MoreMenuItemLink } from '../../../../../components/table';

const OrderLine = ({ order }) => {
  const {
    id,
    orderNumber,
    customer,
    createdDateTime,
    orderItems,
    totalAmount,
    orderStatus,
    paymentStatus
  } = order;

  const paintOrderStatusLabel = useCallback(() => {
    switch (orderStatus) {
      case 'Completed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'error';
      default:
        return 'info';
    }}, [orderStatus]);

  const paintPaymentStatusLabel = useCallback(() => {
    switch (paymentStatus) {
      case 'Paid':
        return 'success';
      case 'Unpaid':
        return 'error';
      default:
        return 'info';
    }
  }, [paymentStatus]);

  return (
    <TableRow
      hover
      tabIndex={-1}
    >
      <TableCell align='left' sx={{ maxWidth: 50 }}>
        <Link component={RouterLink} to={`${PATHS.ORDERS}/${id}`} underline='hover'>
          <Typography
            variant='body1'
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            #{orderNumber}
          </Typography>
      </Link>
      </TableCell>
      <TableCell sx={{ maxWidth: 300 }} align='left'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar src={customer.avatarUrl} alt={customer.email} />
          <Stack spacing={0.1} sx={{ ml: 1 }}>
            <Typography variant='body2'>{`${customer.firstName} ${customer.lastName}`}</Typography>
            <Typography variant='body2' color='text.secondary'>{customer.email}</Typography>
          </Stack>
        </Box>
      </TableCell>
      <TableCell sx={{ maxWidth: 200 }}>
        <Typography
          variant = 'body2'
          align = 'left'
        >
          {fDateTime(createdDateTime)}
        </Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: 100 }}>
        <Typography
          variant = 'body1'
          align = 'center'
        >
          {orderItems.length}
        </Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: 120 }} align='center'>
        <Typography
          variant = 'body1'
          align = 'center'
        >
          {fCurrency(totalAmount)}
        </Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: 100 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
          <Label color={paintOrderStatusLabel(orderStatus)}>{orderStatus}</Label>
        </Box>
      </TableCell>
      <TableCell sx={{ maxWidth: 100 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
          <Label color={paintPaymentStatusLabel(paymentStatus)}>{paymentStatus}</Label>
        </Box>
      </TableCell>
      <TableCell align="right">
        <MoreMenu>
          <MoreMenuItemLink
            title='Edit'
            to={`${PATHS.ORDERS}/${id}`}
            iconName='eva:edit-outline'
          />
          {/* <MoreMenuItem title="Delete" iconName="eva:trash-2-outline" handleClick={handleOpenConfirm} /> */}
        </ MoreMenu>
      </TableCell>
      {/* <ConfirmDialog
        dialogTitle='Confirm Delete'
        dialogContent='Are you sure to delete this product origin'
        open={openConfirm}
        handleClose={handleCloseConfirm}

        id={id}
      /> */}
    </TableRow>
  );
};

export default OrderLine;
