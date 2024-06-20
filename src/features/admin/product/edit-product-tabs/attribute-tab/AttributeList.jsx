import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { Box, Button, Typography, Stack } from '@mui/material';

import { DataTable } from '../../../components';
import { getComparator, applySortFilter } from '../../../../../utils/tableUtil';
import AttributeLine from './AttributeLine';
import { Iconify } from '../../../../../components';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left', isSortable: true },
  { id: 'canCombine', label: 'Can Combine', align: 'center', isSortable: false },
  { id: 'displayOrder', label: 'Display Order', align: 'center', isSortable: true },
  { id: 'options', label: 'Options', align: 'left', isSortable: true },
  { id: "", label: "", alignRight: 'center', isSortable: false },
];

const AttributeList = ({ productId, attributes }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
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

  const filteredAttributes = applySortFilter(
    attributes,
    getComparator(order, orderBy),
    filterName
  );

  return (
    <>
      <DataTable
        order={order}
        orderBy={orderBy}
        filterName={filterName}
        filteredData={filteredAttributes}
        tableHead={TABLE_HEAD}
        title="attributes"
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
        {filteredAttributes
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <AttributeLine productId={productId} attribute={row} key={row.id} />
          ))}
      </DataTable>
    </>
  );
};

export default AttributeList;
