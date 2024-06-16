import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Typography,
  Link as LinkMui,
  Link,
} from "@mui/material";

import { fDateTime } from "../../../utils/formatTime";

const InvoiceLine = ({ invoice }) => {
  const { id, invoiceUrl, name, createdDateTime, expiredDateTime } = invoice;
  return (
    <>
      <TableRow key={name} hover tabIndex={-1}>
        <TableCell component="th" scope="row">
          <Typography variant="body1">{name}</Typography>
        </TableCell>
        <TableCell align="left">{fDateTime(createdDateTime)}</TableCell>
        <TableCell align="left">{fDateTime(expiredDateTime)}</TableCell>
        <TableCell align="left">
          <a
            href={invoiceUrl}
            target="_blank"
            style={{
              color: "#3f51b5",
            }}
          >
            {invoiceUrl}
          </a>
        </TableCell>
      </TableRow>
    </>
  );
};

export default InvoiceLine;
