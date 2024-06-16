import React, { useState } from "react";
import { DataTable } from "../components";
import { getComparator, applySortFilter } from "../../../utils/tableUtil";
import InvoiceLine from "./InvoiceLine";

const fakeDate = [
  {
    id: 1,
    name: "Invoice 1",
    createdDateTime: "2021-10-10",
    expiredDateTime: "2021-10-10",
    invoiceUrl:
      "https://res.cloudinary.com/daafciqbe/image/upload/v1718120144/fdz3wald2st0uwkjas8c.pdf",
  },
  {
    id: 2,
    name: "Invoice 2",
    createdDateTime: "2021-10-10",
    expiredDateTime: "2021-10-10",
    invoiceUrl:
      "https://res.cloudinary.com/daafciqbe/image/upload/v1718120144/fdz3wald2st0uwkjas8c.pdf",
  },
  {
    id: 3,
    name: "Invoice 3",
    createdDateTime: "2021-10-10",
    expiredDateTime: "2021-10-10",
    invoiceUrl:
      "https://res.cloudinary.com/daafciqbe/image/upload/v1718120144/fdz3wald2st0uwkjas8c.pdf",
  },
  {
    id: 4,
    name: "Invoice 4",
    createdDateTime: "2021-10-10",
    expiredDateTime: "2021-10-10",
    invoiceUrl:
      "https://res.cloudinary.com/daafciqbe/image/upload/v1718120144/fdz3wald2st0uwkjas8c.pdf",
  },
  {
    id: 5,
    name: "Invoice 5",
    createdDateTime: "2021-10-10",
    expiredDateTime: "2021-10-10",
    invoiceUrl:
      "https://res.cloudinary.com/daafciqbe/image/upload/v1718120144/fdz3wald2st0uwkjas8c.pdf",
  },
];

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left", isSortable: true },
  {
    id: "createdDateTime",
    label: "Created At",
    align: "left",
    isSortable: true,
  },
  {
    id: "expiredDateTime",
    label: "Expired At",
    align: "left",
    isSortable: true,
  },
  {
    id: "invoiceUrl",
    label: "Invoice Url",
    align: "left",
    isSortable: true,
  },
];

const InvoiceList = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const filteredInvoices = applySortFilter(
    fakeDate,
    getComparator(order, orderBy),
    filterName
  );

  const renderContent = (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredInvoices}
      tableHead={TABLE_HEAD}
      title="invoices"
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredInvoices
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <InvoiceLine key={row.id} invoice={row} />
        ))}
    </DataTable>
  );

  return <>{renderContent}</>;
};

export default InvoiceList;
