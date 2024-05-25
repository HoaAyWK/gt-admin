import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Dialog, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import { DataTable } from '../../../components';
import { getComparator, applySortFilter } from '../../../../../utils/tableUtil';
import { Iconify } from '../../../../../components';
import AttributeValueLine from './AttributeValueLine';
import AttributeValueForm from './AttributeValueForm';
import { addAttributeValue } from '../../productSlice';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left', isSortable: true },
  { id: 'priceAdjustment', label: 'Price Adjustment', align: 'right', isSortable: true },
  { id: 'displayOrder', label: 'Display Order', align: 'center', isSortable: true },
  { id: "", label: "", alignRight: 'center', isSortable: false },
];


const AttributeValueListDialog = (props) => {
  const {
    open,
    handleClose,
    attribute,
    attributeId,
    attributeValues,
    attributeName,
    productId
  } = props;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("price");
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAttributeValueForm, setOpenAttributeValueForm] = useState(false);

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

  const handleOpenAttributeValueForm = () => {
    setOpenAttributeValueForm(true);
  }

  const handleCloseAttributeValueForm = () => {
    setOpenAttributeValueForm(false);
  };

  const filteredAttributeValues = applySortFilter(
    attributeValues,
    getComparator(order, orderBy),
    filterName
  );


  return (
    <>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction='row' spacing={0.5} sx={{ alignItems: 'center' }}>
            <IconButton onClick={handleClose}>
              <Iconify icon='ep:back' width={24} height={24} />
            </IconButton>
            <Typography variant='h6' component='h2'>Values for attribute '{attributeName}'</Typography>
          </Stack>
          <Button variant='contained' onClick={handleOpenAttributeValueForm}>
            <Stack spacing={1} direction='row'>
              <Iconify icon='eva:plus-fill' width={24} height={24} />
              <Typography variant='button'>
                Add Value
              </Typography>
            </Stack>
          </Button>
        </DialogTitle>
        <DataTable
          order={order}
          orderBy={orderBy}
          filterName={filterName}
          filteredData={filteredAttributeValues}
          tableHead={TABLE_HEAD}
          title="attribute values"
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
          {filteredAttributeValues
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <AttributeValueLine
                attributeValue={row}
                key={row.id}
                productId={productId}
                attributeId={attributeId}
                colorable={attribute.colorable}
              />
            ))}
        </DataTable>
      </Dialog>
      <AttributeValueForm
        productId={productId}
        attributeId={attributeId}
        attribute={attribute}
        dialogTitle='Add Attribute Value'
        dialogContent={`Add a new value for attribute '${attributeName}'`}
        open={openAttributeValueForm}
        isEdit={false}
        handleClose={handleCloseAttributeValueForm}
        action={addAttributeValue}
      />
    </>
  );
};

export default AttributeValueListDialog;
