import React, { useEffect, useState } from 'react';
import { Link, TableRow, TableCell, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { DataTable, FetchDataErrorMessage, Loading } from '../components';
import { MoreMenuItemLink, MoreMenu, MoreMenuItem } from '../../../components/table';
import { Label } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import ACTION_STATUS from '../../../constants/actionStatus';
import { getOrders, selectAllOrders } from './orderSlice';
import { fCurrency } from '../../../utils/formatNumber';
import { fDateTime } from '../../../utils/formatTime';

const TABLE_HEAD = [
  { id: 'id', label: 'Order ID', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'total', label: 'Total', alignRight: true },
  { id: 'orderDate', label: 'Order Date', alignRight: false },
  { id: '', label: '', alignRight: false },
];

const OrderList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const { getOrdersStatus } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (getOrdersStatus === ACTION_STATUS.IDLE) {
      dispatch(getOrders());
    }
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterOrders = applySortFilter(orders, getComparator(order, orderBy), filterName);

  const statusColor = (status) => {
    if (status === 'Paid') {
      return 'primary';
    } else if (status === 'Processing') {
      return 'warning';
    } else if (status === 'Delivered') {
      return 'success';
    } else return 'error';
  }

  // if (getOrdersStatus === ACTION_STATUS.IDLE ||
  //     getOrdersStatus === ACTION_STATUS.LOADING) {
  //   return <Loading />;
  // }

  // if (getOrdersStatus === ACTION_STATUS.FAILED) {
  //   return <FetchDataErrorMessage />;
  // }

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filterOrders}
      tableHead={TABLE_HEAD}
      title='orders'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filterOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { id, price, status, orderDate } = row;

        return (
          <TableRow
            key={id}
            hover
            tabIndex={-1}
          >
            <TableCell component='th' scope='row'>
              <Link component={RouterLink} to={`/admin/orders/details/${id}`} underline='hover' >
                <Typography variant='body1'>{id}</Typography>
              </Link>
            </TableCell>
            <TableCell>
              <Label color={statusColor(status)}>{status}</Label>
            </TableCell>
            <TableCell align='right'>
              {fCurrency(price)}
            </TableCell>
            <TableCell>
              {fDateTime(orderDate)}
            </TableCell>
            <TableCell align="right">
              <MoreMenu>
                <MoreMenuItemLink title='Details' to={`/admin/orders/details/${id}`} iconName='eva:edit-outline' />
              </ MoreMenu>
            </TableCell>
          </TableRow>
        );
      })}
    </DataTable>
  );
};

export default OrderList;
