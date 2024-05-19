import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataTable } from '../components';
import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { getBanners, selectAllBanners } from './bannerSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import { FetchDataErrorMessage, Loading } from '../components';
import { BannerLine } from './components';

const TABLE_HEAD = [
  { id: 'product', label: 'Product Name', align: 'left', isSortable: false },
  { id: 'attributes', label: 'Attributes', align: 'left', isSortable: false },
  { id: 'isActive', label: 'Active', align: 'center', isSortable: true },
  { id: 'displayOrder', label: 'Display Order', align: 'center', isSortable: true},
  { id: 'direction', label: 'Direction', align: 'center', isSortable: true},
  { id: 'createdDateTime', label: 'Created At', align: 'left', isSortable: true},
  { id: '', label: '', align: 'left' },
];

const BannerList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('displayOrder');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const banners = useSelector(selectAllBanners);
  const { getBannersStatus } = useSelector((state) => state.banners);

  useEffect(() => {
    if (getBannersStatus === ACTION_STATUS.IDLE) {
      dispatch(getBanners({ page: 0, pageSize: 0, orderBy, order}));
    }
  }, [getBannersStatus]);

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

  const filteredBanners = applySortFilter(banners, getComparator(order, orderBy), filterName);

  const renderContent = (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredBanners}
      tableHead={TABLE_HEAD}
      title='banners'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredBanners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <BannerLine key={row.id} banner={row} />
      ))}
    </DataTable>
  );

  return (getBannersStatus === ACTION_STATUS.SUCCEEDED ? renderContent
    : (getBannersStatus === ACTION_STATUS.FAILED) ? (<FetchDataErrorMessage />)
    : (<Loading />)
  );
};

export default BannerList;
