import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, TableRow, TableCell, Stack, Typography } from "@mui/material";

import { applySortFilter, getComparator } from "../../../utils/tableUtil";
import { DataTable } from "../components";
import { Label, LetterAvatar, Iconify } from "../../../components";
import {
  MoreMenu,
  MoreMenuItem,
  MoreMenuItemLink,
} from "../../../components/table";

import ACTION_STATUS from "../../../constants/actionStatus";
import { getUsers, selectAllUsers } from "./userSlice";

const TABLE_HEAD = [
  { id: "firstName", label: "Name", align: 'left', isSortable: true },
  { id: "email", label: "Email", align: 'left', isSortable: true },
  { id: "phone", label: "Phone Number", align: 'left', isSortable: true },
  { id: "role", label: "Role", align: 'center', isSortable: true },
  { id: "emailConfirmed", label: "Email Confirmed", align: 'center', isSortable: true },
  { id: "", label: "", align: "" },
];

const UserList = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { getUsersStatus } = useSelector((state) => state.users);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    if (getUsersStatus === ACTION_STATUS.IDLE) {
      dispatch(getUsers());
    }
  }, []);

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

  const filteredUsers = applySortFilter(
    users,
    getComparator(order, orderBy),
    filterName
  );

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredUsers}
      tableHead={TABLE_HEAD}
      title="users"
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
      sx={{
        borderRadius: (theme) => theme.spacing(1),
      }}
    >
      {filteredUsers
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          const { id, firstName, lastName, email, phone, role, emailConfirmed, avatarUrl } = row;

          return (
            <TableRow key={id} hover tabIndex={-1}>
              <TableCell component="th" scope="row">
                <Stack spacing={1} direction="row" alignItems="center">
                  {avatarUrl ? (
                    <Avatar src={avatarUrl} width={24} height={24} />
                  ) : (
                    <LetterAvatar name={firstName + " " + lastName} />
                  )}
                  <Typography variant="body1">
                    {firstName + " " + lastName}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>
                {phone}
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
                  <Label color={role === "Admin" ? "primary" : "warning"}>
                    {role}
                  </Label>
                </Box>
              </TableCell>
              <TableCell>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
                <Iconify
                  icon={emailConfirmed ? 'material-symbols:check' : 'ic:baseline-minus'}
                  width={24}
                  height={24}
                  style={{ color: emailConfirmed ? '#00B074' : '#454F5B' }}
                />
              </Box>
              </TableCell>
              <TableCell align="right">
                <MoreMenu>
                  <MoreMenuItemLink
                    title="Edit"
                    to={`/users/edit/${id}`}
                    iconName="eva:edit-outline"
                  />
                </MoreMenu>
              </TableCell>
            </TableRow>
          );
        })}
    </DataTable>
  );
};

export default UserList;
