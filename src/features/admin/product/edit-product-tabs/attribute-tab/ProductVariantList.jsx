import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { DataTable } from '../../../components';
import { getComparator, applySortFilter } from '../../../../../utils/tableUtil';
import ProductVariantLine from './ProductVariantLine';

const TABLE_HEAD = [
  { id: 'attributes', label: 'Attributes', align: 'left', isSortable: false },
  { id: 'price', label: 'Price', align: 'right', isSortable: true },
  { id: 'stockQuantity', label: 'Stock Quantity', align: 'right', isSortable: true },
  { id: 'isActive', label: 'Is Active', align: 'center', isSortable: false },
  { id: "", label: "", alignRight: 'center', isSortable: false },
];


const ProductVariantList = ({ productId, attributes, variants, images }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("price");
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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

  const handleClickDelete = async (id) => {
    try {
      const actionResult = await dispatch(deleteProductOrigin(id));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar("Deleted successfully", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const filteredVariants = applySortFilter(
    variants,
    getComparator(order, orderBy),
    filterName
  );

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredVariants}
      tableHead={TABLE_HEAD}
      title="variants"
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
      sx={{
        backgroundColor: (theme) => theme.palette.background.content,
        boxShadow: 'none',
      }}
    >
      {filteredVariants
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <ProductVariantLine
            key={row.id}
            productId={productId}
            variant={row}
            attributes={attributes}
            images={images}
          />
        ))}
    </DataTable>
  );
};

export default ProductVariantList;
