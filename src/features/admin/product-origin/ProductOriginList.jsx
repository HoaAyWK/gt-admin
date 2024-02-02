import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, TableRow, TableCell, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";

import { getComparator, applySortFilter } from "../../../utils/tableUtil";
import { DataTable, FetchDataErrorMessage, Loading } from "../components";
import {
  MoreMenuItemLink,
  MoreMenu,
  MoreMenuItem,
} from "../../../components/table";

import {
  getProductOrigins,
  selectAllProductOrigins,
  deleteProductOrigin,
} from "./productOriginSlice";
import ACTION_STATUS from "../../../constants/actionStatus";
import { createMarkup } from "../../../utils/sanitizeHtml";
import ProductOriginLine from "./ProductOriginLine";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "information", label: "Information", alignRight: false },
  { id: "", label: "", alignRight: false },
];

const products = [
  {
    id: "1",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    description:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    information:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
  },
  {
    id: "2",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    description:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    information:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
  },
  {
    id: "3",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    description:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    information:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
  },
  {
    id: "4",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    description:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    information:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
  },
  {
    id: "5",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    description:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    information:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
  },
];

const ProductOriginList = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { getProductOriginsStatus } = useSelector(
    (state) => state.adminProductOrigins
  );
  // const products = useSelector(selectAllProductOrigins);

  // useEffect(() => {
  //   if (getProductOriginsStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getProductOrigins());
  //   }
  // }, []);

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

  const filteredProducts = applySortFilter(
    products,
    getComparator(order, orderBy),
    filterName
  );

  // if (getProductOriginsStatus === ACTION_STATUS.IDLE ||
  //     getProductOriginsStatus === ACTION_STATUS.LOADING) {
  //   return <Loading />;
  // }

  // if (getProductOriginsStatus === ACTION_STATUS.FAILED) {
  //   return <FetchDataErrorMessage />;
  // }

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredProducts}
      tableHead={TABLE_HEAD}
      title="products"
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredProducts
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <ProductOriginLine productOrigin={row} key={row.id} />
        ))}
    </DataTable>
  );
};

export default ProductOriginList;
