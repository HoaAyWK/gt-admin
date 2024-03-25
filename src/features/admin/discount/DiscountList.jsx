import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataTable } from '../components';
import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { getDiscounts, selectAllDiscounts } from './discountSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import DiscountLine from './DiscountLine';
import { FetchDataErrorMessage, Loading } from '../components';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left', isSortable: true },
  { id: 'usePercentage', label: 'Use Percentage', align: 'center', isSortable: true },
  { id: 'discountPercentage', label: 'Discount Percentage', align: 'right', isSortable: true },
  { id: 'discountAmount', label: 'Discount Amount', align: 'right', isSortable: true },
  { id: 'startDate', label: 'Start Date', align: 'left', isSortable: true },
  { id: 'endDate', label: 'End Date', align: 'left', isSortable: true },
  { id: '', label: '', alignRight: false },
];

const DiscountList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const discounts = useSelector(selectAllDiscounts);
  const { getDiscountsStatus } = useSelector((state) => state.discounts);

  useEffect(() => {
    if (getDiscountsStatus === ACTION_STATUS.IDLE) {
      dispatch(getDiscounts());
    }
  }, [getDiscountsStatus]);

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

  const filteredDiscounts = applySortFilter(discounts, getComparator(order, orderBy), filterName);

  const renderContent = (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredDiscounts}
      tableHead={TABLE_HEAD}
      title='discounts'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredDiscounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <DiscountLine key={row.id} discount={row} />
      ))}
    </DataTable>
  );

  return (getDiscountsStatus === ACTION_STATUS.SUCCEEDED ? renderContent
    : (getDiscountsStatus === ACTION_STATUS.FAILED) ? (<FetchDataErrorMessage />)
    : (<Loading />)
  );
};

export default DiscountList;
