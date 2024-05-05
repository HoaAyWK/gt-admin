import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ORDER_BY, ORDER_PER_PAGE_OPTIONS } from '../../../../constants/common';
import { OrdersTab } from './components';
import {
  getCompletedOrders,
  selectCompletedOrdersByPage
} from '../orderSlice';

const CompletedOrdersTab = ({ tableHead }) => {
  const defaultPage = 1;
  const defaultOrderBy = 'orderNumber';

  const dispatch = useDispatch();
  const [order, setOrder] = useState(ORDER_BY.ASC);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [page, setPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(ORDER_PER_PAGE_OPTIONS[0]);

  const orders = useSelector((state) => selectCompletedOrdersByPage(state, page));
  const { completedOrdersTotalItems } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getCompletedOrders({ page, pageSize, order, orderBy }));
  }, []);

  const handleRequestOrdersSort = (event, property) => {
    const isAsc = orderBy === property && order === ORDER_BY.ASC;

    setOrder(isAsc ? ORDER_BY.DESC : ORDER_BY.ASC);
    setOrderBy(property);
    dispatch(getCompletedOrders({ page, pageSize, order, orderBy: property }));
  };

  const handleChangeOrdersPage = (event, newPage) => {
    setPage(newPage + 1);
    dispatch(getCompletedOrders({ page: newPage + 1, pageSize, order, orderBy }));
  };

  const handleChangeRowPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);

    setPageSize(newPageSize);
    setPage(defaultPage);
    dispatch(getCompletedOrders({ page: defaultPage, pageSize: newPageSize, order, orderBy }));
  };

  return (
    <OrdersTab
      orders={orders}
      order={order}
      orderBy={orderBy}
      page={page}
      pageSize={pageSize}
      totalItems={completedOrdersTotalItems}
      tableHead={tableHead}
      handleRequestSort={handleRequestOrdersSort}
      handleChangePage={handleChangeOrdersPage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      perPageOptions={ORDER_PER_PAGE_OPTIONS}
    />
  );
};

export default CompletedOrdersTab;
