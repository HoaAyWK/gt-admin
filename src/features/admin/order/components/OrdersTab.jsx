import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination
} from '@mui/material';

import { Scrollbar } from '../../../../components';
import { SortableTableHead, EmptyRow } from '../../../../components/table';
import OrderLine from './OrderLine';

const OrdersTab = (props) => {
  const {
    orders,
    order,
    orderBy,
    page,
    pageSize,
    totalItems,
    handleRequestSort,
    handleChangePage,
    handleChangeRowPerPage,
    perPageOptions,
    tableHead,
  } = props;

  return (
    <>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 700 }}>
          <Table>
            <SortableTableHead
              order={order}
              orderBy={orderBy}
              headLabel={tableHead}
              onRequestSort={handleRequestSort}
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
        rowsPerPageOptions={perPageOptions}
        component='div'
        count={totalItems}
        rowsPerPage={pageSize}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowPerPage}
      />
    </>
  );
};

export default OrdersTab;
