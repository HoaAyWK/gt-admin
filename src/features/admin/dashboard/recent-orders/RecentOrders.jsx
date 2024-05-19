import React, { useState, useEffect } from 'react';
import {
  Box,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Scrollbar } from '../../../../components';
import { SortableTableHead, EmptyRow } from '../../../../components/table';
import { getOrders, selectOrdersByPage } from '../../../../features/admin/order/orderSlice';
import ACTION_STATUS from '../../../../constants/actionStatus';
import { ORDER_BY, ORDER_PER_PAGE_OPTIONS } from '../../../../constants/common';
import OrderLine from './OrderLine';

const TABLE_HEAD = [
  { id: "orderNumber", label: "Order", align: 'left', sortable: true },
  { id: "createdDateTime", label: "Date", align: 'left', sortable: true },
  { id: "items", label: "Items", align: 'center', sortable: true },
  { id: "totalAmount", label: "Total", align: 'center', sortable: true },
  { id: "orderStatus", label: "Status", align: 'center', sortable: true },
  { id: "paymentStatus", label: "Payment Status", align: 'center', sortable: true },
  { id: "", label: "", align: 'left' },
];

const Orders = () => {
  const defaultPage = 1;
  const defaultOrderBy = 'createdDateTime';
  const dispatch = useDispatch();
  const [order, setOrder] = useState(ORDER_BY.DESC);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [page, setPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(ORDER_PER_PAGE_OPTIONS[0]);

  const orders = useSelector((state) => selectOrdersByPage(state, page));
  const { ordersTotalItems, getOrdersStatus } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getOrders({ page, pageSize, order, orderBy }));
  }, []);

  const handleRequestOrdersSort = (event, property) => {
    const isAsc = orderBy === property && order === ORDER_BY.ASC;

    setOrder(isAsc ? ORDER_BY.DESC : ORDER_BY.ASC);
    setOrderBy(property);
    dispatch(getOrders({ page, pageSize, order, orderBy: property }));
  };

  const handleChangeOrdersPage = (event, newPage) => {
    setPage(newPage + 1);
    dispatch(getOrders({ page: newPage + 1, pageSize, order, orderBy }));
  };

  const handleChangeRowPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);

    setPageSize(newPageSize);
    setPage(defaultPage);
    dispatch(getOrders({ page: defaultPage, pageSize: newPageSize, order, orderBy }));
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: theme => theme.spacing(1),
          border: theme => `1px solid ${theme.palette.divider}`,
          backgroundColor: theme => theme.palette.background.paper
        }}
      >
        <Typography variant='h5' component='h1' sx={{ ml: 2, mt: 2 }}>
          Recent Orders
        </Typography>
        <Box
          sx={{
            width: "100%",
            mb: 1,
          }}
        >
          <LinearProgress
            variant='query'
            sx={{ visibility: `${getOrdersStatus === ACTION_STATUS.LOADING ? 'visible' : 'hidden' }` }}
          />
        </Box>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 700 }}>
            <Table>
              <SortableTableHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                onRequestSort={handleRequestOrdersSort}
              />
              <TableBody>
              {orders.length !== 0 ? (orders.map((order) => (
                  <OrderLine key={order.id} order={order} />
                ))) : (
                  <TableRow>
                    <TableCell align='center' colSpan={12} sx={{ py: 3 }}>
                      <EmptyRow />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          rowsPerPageOptions={ORDER_PER_PAGE_OPTIONS}
          component='div'
          count={ordersTotalItems}
          rowsPerPage={pageSize}
          page={page - 1}
          onPageChange={handleChangeOrdersPage}
          onRowsPerPageChange={handleChangeRowPerPage}
        />
      </Box>
    </>
  );
};

export default Orders;
