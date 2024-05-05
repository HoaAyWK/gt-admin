import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ORDER_BY, ORDER_PER_PAGE_OPTIONS } from '../../../../constants/common';
import { OrdersTab } from './components';
import {
  getCancelledOrders,
  selectCancelledOrdersByPage
} from '../orderSlice';

const CancelledOrdersTab = ({ tableHead }) => {
  const defaultPage = 1;
  const defaultOrderBy = 'orderNumber';

  const dispatch = useDispatch();
  const [order, setOrder] = useState(ORDER_BY.ASC);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [page, setPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(ORDER_PER_PAGE_OPTIONS[0]);

  const orders = useSelector((state) => selectCancelledOrdersByPage(state, page));
  const { cancelledOrdersTotalItems } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getCancelledOrders({ page, pageSize, order, orderBy }));
  }, []);

  const handleRequestOrdersSort = (event, property) => {
    const isAsc = orderBy === property && order === ORDER_BY.ASC;

    setOrder(isAsc ? ORDER_BY.DESC : ORDER_BY.ASC);
    setOrderBy(property);
    dispatch(getCancelledOrders({ page, pageSize, order, orderBy: property }));
  };

  const handleChangeOrdersPage = (event, newPage) => {
    setPage(newPage + 1);
    dispatch(getCancelledOrders({ page: newPage + 1, pageSize, order, orderBy }));
  };

  const handleChangeRowPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);

    setPageSize(newPageSize);
    setPage(defaultPage);
    dispatch(getCancelledOrders({ page: defaultPage, pageSize: newPageSize, order, orderBy }));
  };

  return (
    <OrdersTab
      orders={orders}
      order={order}
      orderBy={orderBy}
      page={page}
      pageSize={pageSize}
      totalItems={cancelledOrdersTotalItems}
      tableHead={tableHead}
      handleRequestSort={handleRequestOrdersSort}
      handleChangePage={handleChangeOrdersPage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      perPageOptions={ORDER_PER_PAGE_OPTIONS}
    />
  );
};

export default CancelledOrdersTab;
