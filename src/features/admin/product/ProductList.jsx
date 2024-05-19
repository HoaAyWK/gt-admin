import React, { useEffect } from 'react';
import {
  Box,
  Card,
  InputAdornment,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Toolbar,
  OutlinedInput,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { EmptyRow, SortableTableHead } from '../../../components/table';
import {
  setPage,
  setOrder,
  setOrderBy,
  setPageSize,
  searchProduct,
  setSearchTerm,
  selectAllProducts
} from './productSlice';
import ProductLine from './ProductLine';
import { ORDER_BY, PAGE_SIZES } from '../../../constants/common';
import { Iconify, Scrollbar } from '../../../components';
import ACTION_STATUS from '../../../constants/actionStatus';

const TABLE_HEAD = [
  { id: "name", label: "Name", align: 'left' },
  { id: "description", label: "Description", align: 'left' },
  { id: "price", label: "Price", align: 'right' },
  { id: "published", label: "Published", align: 'center' },
  { id: "hasVariant", label: "Has Variant", align: 'center' },
  { id: "", label: "", align: 'left' },
];

const ROWS_PER_PAGE_OPTIONS = [
  PAGE_SIZES.DEFAULT,
  PAGE_SIZES.MEDIUM,
  PAGE_SIZES.LARGE
];

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyled = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

const ProductList = () => {
  const {
    page,
    pageSize,
    order,
    orderBy,
    searchTerm,
    totalItems,
    searchProductStatus
  } = useSelector((state) => state.products);

  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchProductStatus === ACTION_STATUS.IDLE) {
      dispatch(searchProduct({ searchTerm, page, pageSize, order, orderBy }));
    }
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === ORDER_BY.ASC;
    dispatch(setOrder(isAsc ? ORDER_BY.DESC : ORDER_BY.ASC));
    dispatch(setOrderBy(property));
    dispatch(searchProduct({ searchTerm, page, pageSize, order, orderBy: property }));
  };

  const onSearchTermChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage + 1));
    dispatch(searchProduct({ searchTerm, page: newPage + 1, pageSize, order, orderBy }));
  };

  const handleChangeRowPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    const defaultPage = 1;
    dispatch(setPageSize(newPageSize));
    dispatch(setPage(defaultPage));
    dispatch(searchProduct({ searchTerm, page: defaultPage, pageSize: newPageSize, order, orderBy }));
  };

  // if (searchProductStatus === ACTION_STATUS.IDLE ||
  //     searchProductStatus === ACTION_STATUS.LOADING) {
  //   return <Loading />;
  // }

  // if (searchProductStatus === ACTION_STATUS.FAILED) {
  //   return <FetchDataErrorMessage />;
  // }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <LinearProgress
          variant='query'
          sx={{ visibility: `${searchProductStatus === ACTION_STATUS.LOADING ? 'visible' : 'hidden' }` }}
        />
      </Box>
      <Card sx={{ borderRadius: (theme) => theme.spacing(1) }}>
        <ToolbarStyled>
          <SearchStyled
            value={searchTerm}
            onChange={onSearchTermChange}
            placeholder={`Search ...`}
            startAdornment={
              <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />
        </ToolbarStyled>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 700 }}>
            <Table>
              <SortableTableHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {products.length !== 0 ? (products.map((product) => (
                  <ProductLine key={product.id} product={product} />
                ))) : (
                  <TableRow>
                    <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                      <EmptyRow />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          component='div'
          count={totalItems}
          rowsPerPage={pageSize}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowPerPage}
        />
      </Card>
    </>
  )
};

export default ProductList;
