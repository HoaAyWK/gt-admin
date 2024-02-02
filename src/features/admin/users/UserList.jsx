import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, TableRow, TableCell, Stack, Typography } from "@mui/material";

import { applySortFilter, getComparator } from "../../../utils/tableUtil";
import { DataTable } from "../components";
import { Label, LetterAvatar } from "../../../components";
import {
  MoreMenu,
  MoreMenuItem,
  MoreMenuItemLink,
} from "../../../components/table";

import ACTION_STATUS from "../../../constants/actionStatus";
import { getUsers, selectAllUsers } from "./userSlice";
import { id } from "date-fns/locale";

const TABLE_HEAD = [
  { id: "firstName", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "", label: "", alignRight: false },
];

const UserList = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  // const users = useSelector(selectAllUsers);
  const { getUsersStatus } = useSelector((state) => state.adminUsers);

  const users = [
    {
      id: 1,
      firstName: "Justin",
      lastName: "Bieber",
      email: "JustinBieber@gmail.com",
      role: "user",
      status: true,
      avatar:
        "https://i.pinimg.com/564x/b9/6d/03/b96d03880b7c43f83c81947dd25b9abd.jpg",
    },
    {
      id: 2,
      firstName: "Taylor",
      lastName: "Swift",
      email: "TaylorSwift@gmail.com",
      role: "user",
      status: true,
      avatar:
        "https://i.pinimg.com/564x/1c/88/8f/1c888ff5c32161cc786088d18f587559.jpg",
    },
    {
      id: 3,
      firstName: "Selena",
      lastName: "Gomez",
      email: "SlenaGomez@gmail.com",
      role: "user",
      status: true,
      avatar:
        "https://i.pinimg.com/736x/82/b3/aa/82b3aa3708065d04d8e40667df000e48.jpg",
    },
    {
      id: 4,
      firstName: "Ariana",
      lastName: "Grande",
      email: "ArianaGrade@gmail.com",
      role: "user",
      status: true,
      avatar:
        "https://i.pinimg.com/564x/3c/42/ff/3c42ff12f5c216f308efe4fc8ec77fc4.jpg",
    },
    {
      id: 5,
      firstName: "Katy",
      lastName: "Perry",
      email: "KatyPerry@gmail.com",
      role: "user",
      status: true,
      avatar:
        "https://i.pinimg.com/564x/2d/35/c5/2d35c52b4423b1586458d5017873f99d.jpg",
    },
    {
      id: 6,
      firstName: "Rihanna",
      lastName: "Fenty",
      email: "RihannaFenty@gmail.com",
      role: "user",
      status: true,
      avatar:
        "https://i.pinimg.com/564x/d3/7f/af/d37faf2b95d60ef6fcb4d76cee6d4da8.jpg",
    },
    {
      id: 7,
      firstName: "Beyonce",
      lastName: "Knowles",
      email: "BeyonceKnowles@gmail.com",
      role: "user",
      status: true,
      avatar:
        "https://i.pinimg.com/564x/a1/c1/e2/a1c1e2cd283971f042418d468cda3f3a.jpg",
    },
    {
      id: 8,
      firstName: "Lady",
      lastName: "Gaga",
      email: "LadyGaga@gmail.com",
      role: "user",
      status: false,
      avatar:
        "https://i.pinimg.com/564x/d9/f4/8b/d9f48b302a5de3b771ed860ea06d4f87.jpg",
    },
    {
      id: 9,
      firstName: "Jung",
      lastName: "Kook",
      email: "JungKook@gmail.com",
      role: "user",
      status: false,
      avatar:
        "https://i.pinimg.com/564x/c1/23/6d/c1236d3a7ddc2cb4ab0bad504528bc9d.jpg",
    },
    {
      id: 10,
      firstName: "Pam",
      lastName: "Pam",
      email: "PamYeuOi@gmail.com",
      role: "admin",
      status: true,
      avatar:
        "https://i.pinimg.com/736x/28/41/71/2841716e64ff836211f9a433bca44147.jpg",
    },
  ];

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
    >
      {filteredUsers
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          const { id, firstName, lastName, email, role, status, avatar } = row;

          return (
            <TableRow key={id} hover tabIndex={-1}>
              <TableCell component="th" scope="row">
                <Stack spacing={1} direction="row" alignItems="center">
                  {avatar ? (
                    <Avatar src={avatar} width={24} height={24} />
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
                <Label color={role === "admin" ? "primary" : "warning"}>
                  {role === "admin" ? "Admin" : "User"}
                </Label>
              </TableCell>
              <TableCell>
                <Label color={status === true ? "success" : "error"}>
                  {status === true ? "Active" : "No active"}
                </Label>
              </TableCell>
              <TableCell align="right">
                <MoreMenu>
                  <MoreMenuItemLink
                    title="Details"
                    to={`/admin/users/details/${id}`}
                    iconName="eva:eye-outline"
                  />
                  <MoreMenuItemLink
                    title="Edit"
                    to={`/admin/users/edit/${id}`}
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
