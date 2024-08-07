import React, { useState, useEffect, useMemo } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Grid,
  Stack,
  Typography,
  styled,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { Iconify, Label, DashedLine, Loading } from '../../../../components';
import { OrderLineItem, OrderTimelines } from './components';
import { fDateTime } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
import creditCard from '../../../../assets/icons/payments/ic_visa.svg';
import { confirmOrder, getOrder, cancelOrder } from '../orderSlice';
import ACTION_STATUS from '../../../../constants/actionStatus';
import { unwrapResult } from '@reduxjs/toolkit';
import { ConfirmDialogV2 } from '../../../admin/components';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.content,
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
}));

const OrderDetails = ({ id }) => {
  const {
    order,
    getOrderStatus,
    confirmOrderStatus,
    cancelOrderStatus
  } = useSelector(state => state.orders);
  const { hubConnection } = useSelector((state) => state.notifications);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const totalDiscount = useMemo(() => {
    if (!order) {
      return 0;
    }

    return order.orderItems.reduce((acc, item) => acc + item.totalDiscount, 0);
  }, [order]);

  const statusColor = useMemo(() => {
    if (!order) {
      return 'primary';
    }

    switch (order.orderStatus) {
      case 'Pending':
        return 'warning';
      case 'Processing':
        return 'warning';
      case 'Completed':
        return 'success';
      case 'Cancelled':
        return 'error';
      case 'Refunded':
        return 'error';
      default:
        return 'primary';
    }
  }, [order]);

  const canCancelOrder = useMemo(() => {
    if (!order) {
      return false;
    }

    if (order.orderStatus === 'Pending') {
      return true;
    }

    return false;
  }, [order]);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleOpenCancelDialog = () => {
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };

  const handleConfirmOrder = async () => {
    const actionResult = await dispatch(confirmOrder(id));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Order confirmed successfully', { variant: 'success' });

      if (hubConnection) {
        try {
          await hubConnection.invoke('NotifyCustomerWhenPaymentInfoConfirmed', order.id);
        } catch (error) {
          console.log(error);
        }
      }

      handleCloseConfirmDialog();
      return;
    }

    if (result.errors) {
      const errorKeys = Object.keys(result.errors);

      errorKeys.forEach((key) => {
        result.errors[key].forEach((error) => {
          enqueueSnackbar(error, { variant: 'error' });
        });
      });

      handleCloseConfirmDialog();
      return;
    }

    enqueueSnackbar(result.error, { variant: "error" });
    handleCloseConfirmDialog();
  };

  const handleCancelOrder = async () => {
    const actionResult = await dispatch(cancelOrder(id));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Order cancelled successfully', { variant: 'success' });

      if (hubConnection) {
        try {
          await hubConnection.invoke('NotifyCustomerWhenOrderCancelled', order.id);
        } catch (error) {
          console.log(error);
        }
      }

      handleCloseCancelDialog();
      return;
    }

    if (result.errors) {
      const errorKeys = Object.keys(result.errors);

      errorKeys.forEach((key) => {
        result.errors[key].forEach((error) => {
          enqueueSnackbar(error, { variant: 'error' });
        });
      });

      handleCloseCancelDialog();
      return;
    }

    enqueueSnackbar(result.error, { variant: "error" });
    handleCloseCancelDialog();
  }

  if ( getOrderStatus === ACTION_STATUS.IDLE ||
    getOrderStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getOrderStatus === ACTION_STATUS.FAILED || !order) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 4 }}>
        Order not found.
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          flexWrap: 'wrap'
        }}
      >
        <Stack spacing={0.5}>
          <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
            <IconButton onClick={handleBack}>
              <Iconify icon='eva:arrow-ios-back-outline' width={24} height={24} />
            </IconButton>
            <Typography variant='h4' component='h1'>Order #{order.orderNumber}</Typography>
            <Label color={statusColor} >{order.orderStatus}</Label>
          </Stack>
          <Box>
            <Typography variant='body1' color='text.secondary' sx={{ ml: 6 }}>
              Order date: {fDateTime(order.createdDateTime)}
            </Typography>
          </Box>
        </Stack>
        <Stack spacing={0.5} direction='row' sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          {order && order.orderStatus === 'Pending' && (
            <Button
              color='primary'
              variant='outlined'
              size='small'
              onClick={handleOpenConfirmDialog}
            >
              Confirm Order
            </Button>
          )}
          {canCancelOrder && (
           <Button
            color='error'
            variant='outlined'
            size='small'
            onClick={handleOpenCancelDialog}
          >
              Cancel Order
            </Button>
          )}
        </Stack>
      </Box>
      <Box>
        <Grid container spacing={0}>
          <Grid xs={12} md={7.95}>
            <StyledBox>
              <Box sx={{ px: 2, py: 2 }}>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>Details</Typography>
                {order.orderItems.map(item => (
                  <OrderLineItem key={item.id} item={item} />
                ))}
              </Box>
              <DashedLine />
              <Box sx={{ p: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <Typography variant='body2' color='text.secondary' textAlign='end'>SubTotal</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant='body1' textAlign='end'>{fCurrency(order.totalAmount)}</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant='body2' color='text.secondary' textAlign='end'>Discount</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant='body1' color='error' textAlign='end'>{fCurrency(totalDiscount)}</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant='subtitle1' textAlign='end'>Total</Typography>
                  </Grid>
                  <Grid item xs={2}>
                  <Typography variant='subtitle1' textAlign='end'>{fCurrency(order.totalAmount + totalDiscount)}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </StyledBox>
            <Box sx={{ my: 1 }} />
            <StyledBox>
              <Box sx={{ px: 2, pt: 2 }}>
                <Typography variant='subtitle1'>History</Typography>
                <OrderTimelines orderStatusHistoryTrackings={order.orderStatusHistoryTrackings} />
              </Box>
            </StyledBox>
          </Grid>
          <Grid xs={12} md={0.1}>
            <Box sx={{ height: 8 }} />
          </Grid>
          <Grid xs={12} md={3.95}>
            <StyledBox>
              <Box sx={{ p: 2 }}>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>Customer</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    src={order.customer.avatarUrl}
                    alt={order.customer.fullName}
                    sx={{
                      width: 48,
                      height: 48,
                    }}
                  />
                  <Stack spacing={0.2} sx={{ ml: 1 }}>
                    <Typography variant='body2'>{order.customer.firstName} {order.customer.lastName}</Typography>
                    <Typography variant='body2' color='text.secondary'>{order.customer.email}</Typography>
                  </Stack>
                </Box>
              </Box>
              <DashedLine />
              <Box sx={{ p: 2 }}>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>Shipping Address</Typography>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant='body2' color='text.secondary'>
                      Receiver
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant='body2'>
                      {order.shippingAddress.receiverName}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant='body2' color='text.secondary'>Phone</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant='body2'>
                      {order.shippingAddress.phoneNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant='body2' color='text.secondary'>Address</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant='body2'>
                      {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <DashedLine />
              <Box sx={{ p: 2 }}>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>Payment</Typography>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant='body2' color='text.secondary'>Payment Status</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant='body2' color='text.primary'>
                      {order.paymentStatus}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                      <Typography variant='body2' color='text.secondary'>Payment Method</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
                      {order.paymentMethod === 'CreditCard' ? (
                        <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
                          <Typography variant='body2'>Credit Card</Typography>
                          <Box
                            component='img'
                            src={creditCard}
                            alt='visa'
                            sx={{
                              width: 32,
                              height: 32
                            }}
                          />
                        </Stack>
                      ) : (
                        <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
                          <Typography variant='body2'>Cash</Typography>
                          <Iconify
                            icon='mdi:cash'
                            style={{ color: '#00B074' }}
                            width={24}
                            height={24}
                          />
                        </Stack>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </StyledBox>
          </Grid>
        </Grid>
      </Box>
      <ConfirmDialogV2
        dialogTitle='Confirm Order'
        dialogContent='Are you sure you want to confirm this order?'
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        status={confirmOrderStatus}
        onConfirm={handleConfirmOrder}
      />
      <ConfirmDialogV2
        dialogTitle='Cancel Order'
        dialogContent='Are you sure you want to cancel this order?'
        open={openCancelDialog}
        handleClose={handleCloseCancelDialog}
        status={cancelOrderStatus}
        onConfirm={handleCancelOrder}
      />
    </Box>
  );
};

export default OrderDetails;
