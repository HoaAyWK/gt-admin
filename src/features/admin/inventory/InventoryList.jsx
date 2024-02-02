import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { DataTable } from '../components';
import InventoryLine from './InventoryLine';
import { selectAllInventories, getInventories, getWarehouseHistory } from './inventorySlice';
import ACTION_STATUS from '../../../constants/actionStatus';

const TABLE_HEAD = [
  { id: 'productId', label: 'Product ID', alignRight: false },
  { id: 'productName', label: 'Product Name', alignRight: false },
  { id: 'quantity', label: 'Quantity', alignRight: true },
  { id: '', label: '', alignRight: false },
];

const InventoryList = ({ inventories, selectedProduct, onSelectProduct }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const filteredInventories = applySortFilter(inventories, getComparator(order, orderBy), filterName);

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredInventories}
      tableHead={TABLE_HEAD}
      title='warehouse'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredInventories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <InventoryLine key={row.productId} inventory={row} onSelectProduct={onSelectProduct} />
      ))}
    </DataTable>
  );
};

export default InventoryList;
