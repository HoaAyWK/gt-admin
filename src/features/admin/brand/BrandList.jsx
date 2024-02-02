import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataTable } from '../components';
import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { getBrands, selectAllBrands } from './brandSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import BrandLine from './BrandLine';
import { FetchDataErrorMessage, Loading } from '../components';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: '', label: '', alignRight: false },
];

const BrandList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const brands = useSelector(selectAllBrands);
  const { getBrandsStatus } = useSelector((state) => state.adminBrands);

  useEffect(() => {
    if (getBrandsStatus === ACTION_STATUS.IDLE) {
      dispatch(getBrands());
    }
  }, [getBrandsStatus]);

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

  const filteredBrands = applySortFilter(brands, getComparator(order, orderBy), filterName);

  const renderCotent = (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredBrands}
      tableHead={TABLE_HEAD}
      title='brands'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredBrands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <BrandLine key={row.id} brand={row} />
      ))}
    </DataTable>
  );

  return (getBrandsStatus === ACTION_STATUS.SUCCEEDED ? renderCotent
    : (getBrandsStatus === ACTION_STATUS.FAILED) ? (<FetchDataErrorMessage />)
    : (<Loading />)
  );
};

export default BrandList;
