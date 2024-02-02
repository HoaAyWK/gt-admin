import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import LineItemTable from '../../order-details/components/LineItemTable';
import { Iconify, Label } from '../../../components';
import ACTION_STATUS from '../../../constants/actionStatus';
import { fDateTime } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
import { PAYMENT_OPTIONS } from '../../../constants/payment';
import { cancelOrder, getOrders, selectOrderById, finishOrder } from './orderSlice';
import { FetchDataErrorMessage, Loading } from '../components';
import ROLES from '../../../constants/userRoles';
import { STATUS } from '../../../constants/orderStatus';
import ConfirmDialog from '../../common/ConfirmDialog';
import { getInventories } from '../inventory/inventorySlice';

const OrderDetails = ({ id }) => {
  const dispatch = useDispatch();
  const bill = useSelector((state) => selectOrderById(state, id));
  const { getOrdersStatus, cancelOrderStatus, finishOrderStatus } = useSelector((state) => state.adminOrders);
  const { user } = useSelector((state) => state.auth);
  const [openConfirmFinishDialog, setOpenConfirmFinishDialog] = useState(false);
  const [openConfirmCancelDialog, setOpenConfirmCancelDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (getOrdersStatus === ACTION_STATUS.IDLE) {
      dispatch(getOrders());
    }
  }, []);

  useEffect(() => {
    if (cancelOrderStatus === ACTION_STATUS.SUCCEEDED) {
      enqueueSnackbar('Cancel successfully', { variant: 'success' });
    }
  }, [cancelOrderStatus]);

  useEffect(() => {
    if (finishOrderStatus === ACTION_STATUS.SUCCEEDED) {
      dispatch(getInventories());
      enqueueSnackbar('Finished order', { variant: 'success' });
    }
  }, [finishOrderStatus]);

  const handleOpenConfirmFinishDialog = () => {
    setOpenConfirmFinishDialog(true);
  };

  const handleCloseConfirmFinishDialog = () => {
    setOpenConfirmFinishDialog(false);
  };

  const handleOpenConfirmCancelDialog = () => {
    setOpenConfirmCancelDialog(true);
  };

  const handleCloseConfirmCancelDialog = () => {
    setOpenConfirmCancelDialog(false);
  };

  const labelColor = (status) => {
    if (status === STATUS.PAID) {
      return 'primary';
    }

    if (status === STATUS.PROCESSING) {
      return 'warning';
    }

    return 'error';
  };

  if (getOrdersStatus === ACTION_STATUS.IDLE ||
      getOrdersStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getOrdersStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

  return (
    <Box>
      {bill.status === STATUS.PROCESSING && bill.paymentType === PAYMENT_OPTIONS.CASH && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Stack spacing={1} direction='row'>
              {user.role === ROLES.ADMIN && (
                <Button variant='outlined' onClick={handleOpenConfirmFinishDialog}>
                  Finish
                </Button>
              )}
              <Button
                variant='outlined'
                color='error'
                onClick={handleOpenConfirmCancelDialog}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
          <ConfirmDialog
            dialogTitle='Confirm finish order'
            dialogContent='Are you sure to finish this order'
            open={openConfirmFinishDialog}
            handleClose={handleCloseConfirmFinishDialog}
            billId={id}
            action={finishOrder}
            status={finishOrderStatus}
          />
          <ConfirmDialog
            dialogTitle='Confirm cancel order'
            dialogContent='Are you sure to cancel this order'
            open={openConfirmCancelDialog}
            handleClose={handleCloseConfirmCancelDialog}
            billId={id}
            action={cancelOrder}
            status={cancelOrderStatus}
          />
        </>
      )}
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alginItems: 'start',
              mb: 4
            }}
          >
            <Typography variant='h6' component='h1' sx={{ mb: 2 }}>
              Order Details
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                <Label color={labelColor(bill?.status)}>{bill?.status}</Label>
              </Box>
              <Typography variant='subtitle1'>ID: {bill?.id}</Typography>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={0.5}>
                <Typography variant='subtitle1' color='text.secondary' textTransform='uppercase'>
                  Order Date
                </Typography>
                <Typography variant='body2' color='text.primary'>{fDateTime(bill?.orderDate)}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={0.5}>
                <Typography variant='subtitle1' color='text.secondary' textTransform='uppercase'>
                  To
                </Typography>
                <Typography variant='body2' color='text.primary'>{bill?.shippingAddress?.acceptorName}</Typography>
                <Typography variant='body2' color='text.primary'>{bill?.shippingAddress?.acceptorPhone}</Typography>
                <Typography variant='body2' color='text.primary'>{bill?.shippingAddress?.deliveryAddress}</Typography>
              </Stack>
            </Grid>
          </Grid>
          <LineItemTable items={bill.orderItems} status={bill.status} orderUser={bill?.userId} />
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
          >
            <Stack spacing={2} direction='row'>
              <Typography variant='subtitle1'>Total</Typography>
              <Typography variant='subtitle1'>{fCurrency(bill?.price)}</Typography>
            </Stack>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Stack spacing={2}>
            <Typography variant='subtitle1' color='text.secondary' textTransform='uppercase'>
              Payment method
            </Typography>
            <Stack spacing={1} direction='row' alignItems='center'>
              <Iconify
                icon={bill?.paymentType === PAYMENT_OPTIONS.CASH ? 'ph:money' : 'material-symbols:credit-card-outline'}
                width={24}
                height={24}
              />
              <Typography variant='body1' textTransform='capitalize'>{bill?.paymentType}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetails;
