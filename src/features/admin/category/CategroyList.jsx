import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CategoryLine from './CategoryLine';
import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { DataTable } from '../components';
import { getCategories, selectAllCategories } from './categorySlice';
import ACTION_STATUS from '../../../constants/actionStatus';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  // { id: 'numberOfProducts', label: 'Number of products', alignRight: true },
  { id: '', label: '', alignRight: false },
];

const CategroyList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const { getCategoriesStatus } = useSelector((state) => state.adminCategories);

  useEffect(() => {
    if (getCategoriesStatus === ACTION_STATUS.IDLE) {
      dispatch(getCategories());
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

  const filterdCategories = applySortFilter(categories, getComparator(order, orderBy), filterName);

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filterdCategories}
      tableHead={TABLE_HEAD}
      title='categories'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filterdCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <CategoryLine key={row.id} category={row} />
      ))}
    </DataTable>
  );
};

export default CategroyList;
