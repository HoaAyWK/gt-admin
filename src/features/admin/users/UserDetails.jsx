import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Label, Loading } from "../../../components";
import { getUsers, selectUserById } from "./userSlice";
import { fDate, fDateTime } from "../../../utils/formatTime";
import { FetchDataErrorMessage } from "../components";
// import { selectOrdersByUserId, getOrders } from "../order/orderSlice";
import ACTION_STATUS from "../../../constants/actionStatus";
import emptyBag from "../../../assets/images/empty_bag.png";
import { fCurrency } from "../../../utils/formatNumber";

const users = [
  {
    id: "1",
    firstName: "Justin",
    lastName: "Bieber",
    email: "JustinBieber@gmail.com",
    role: "user",
    status: true,
    avatar:
      "https://i.pinimg.com/564x/b9/6d/03/b96d03880b7c43f83c81947dd25b9abd.jpg",
    phone: "0987654321",
    birthDate: "1994-03-01",
    gender: "Male",
    address: "112 Oak Street, Roslyn Heights, NY 11577",
  },
  {
    id: "2",
    firstName: "Taylor",
    lastName: "Swift",
    email: "TaylorSwift@gmail.com",
    role: "user",
    status: true,
    avatar:
      "https://i.pinimg.com/564x/1c/88/8f/1c888ff5c32161cc786088d18f587559.jpg",
    phone: "0987654321",
    birthDate: "1989-12-13",
    gender: "Female",
    address: "112 Oak Street, Roslyn Heights, NY 11577",
  },
  {
    id: "3",
    firstName: "Selena",
    lastName: "Gomez",
    email: "SlenaGomez@gmail.com",
    role: "user",
    status: true,
    avatar:
      "https://i.pinimg.com/736x/82/b3/aa/82b3aa3708065d04d8e40667df000e48.jpg",
    phone: "0987654321",
    birthDate: "1992-07-22",
    gender: "Female",
    address: "112 Oak Street, Roslyn Heights, NY 11577",
  },
  {
    id: "4",
    firstName: "Ariana",
    lastName: "Grande",
    email: "ArianaGrade@gmail.com",
    role: "user",
    status: true,
    avatar:
      "https://i.pinimg.com/564x/3c/42/ff/3c42ff12f5c216f308efe4fc8ec77fc4.jpg",
    phone: "0987654321",
    birthDate: "1993-06-26",
    gender: "Female",
    address: "112 Oak Street, Roslyn Heights, NY 11577",
  },
  {
    id: "5",
    firstName: "Katy",
    lastName: "Perry",
    email: "KatyPerry@gmail.com",
    role: "user",
    status: true,
    avatar:
      "https://i.pinimg.com/564x/2d/35/c5/2d35c52b4423b1586458d5017873f99d.jpg",
    phone: "0987654321",
    birthDate: "1984-10-25",
    gender: "Female",
    address: "112 Oak Street, Roslyn Heights, NY 11577",
  },
  {
    id: "6",
    firstName: "Rihanna",
    lastName: "Fenty",
    email: "RihannaFenty@gmail.com",
    role: "user",
    status: true,
    avatar:
      "https://i.pinimg.com/564x/d3/7f/af/d37faf2b95d60ef6fcb4d76cee6d4da8.jpg",
    phone: "0987654321",
    birthDate: "1988-02-20",
    gender: "Female",
    address: "112 Oak Street, Roslyn Heights, NY 11577",
  },
  {
    id: "7",
    firstName: "Beyonce",
    lastName: "Knowles",
    email: "BeyonceKnowles@gmail.com",
    role: "user",
    status: true,
    avatar:
      "https://i.pinimg.com/564x/a1/c1/e2/a1c1e2cd283971f042418d468cda3f3a.jpg",
    phone: "0987654321",
    birthDate: "1981-09-04",
    gender: "Female",
    address: "112 Oak Street, Roslyn Heights, NY 11577",
  },
  {
    id: "8",
    firstName: "Lady",
    lastName: "Gaga",
    email: "LadyGaga@gmail.com",
    role: "user",
    status: false,
    avatar:
      "https://i.pinimg.com/564x/d9/f4/8b/d9f48b302a5de3b771ed860ea06d4f87.jpg",
    phone: "0987654321",
    birthDate: "1986-03-28",
    gender: "Female",
    address: "112 Oak Street, Roslyn Heights, NY 11577",
  },
  {
    id: "9",
    firstName: "Jung",
    lastName: "Kook",
    email: "JungKook@gmail.com",
    role: "user",
    status: false,
    avatar:
      "https://i.pinimg.com/564x/c1/23/6d/c1236d3a7ddc2cb4ab0bad504528bc9d.jpg",
    phone: "0987654321",
    birthDate: "1997-09-01",
    gender: "Male",
    address: "112 Oak Street, Roslyn Heights, NY 11577",
  },
  {
    id: "10",
    firstName: "Pam",
    lastName: "Pam",
    email: "PamYeuOi@gmail.com",
    role: "admin",
    status: true,
    avatar:
      "https://i.pinimg.com/736x/28/41/71/2841716e64ff836211f9a433bca44147.jpg",
    phone: "0987654321",
    birthDate: "1999-10-01",
    gender: "Female",
    address: "112 Oak Street, Roslyn Heights, NY 11577",
  },
];

const orders = [
  {
    id: "1",
    orderDate: "2021-10-01T10:00:00.000Z",
    price: 1000000,
  },
  {
    id: "2",
    orderDate: "2021-10-02T10:00:00.000Z",
    price: 2000000,
  },
  {
    id: "3",
    orderDate: "2021-10-03T10:00:00.000Z",
    price: 3000000,
  },
  {
    id: "4",
    orderDate: "2021-10-04T10:00:00.000Z",
    price: 4000000,
  },
  {
    id: "5",
    orderDate: "2021-10-05T10:00:00.000Z",
    price: 5000000,
  },
];

const UserDetails = ({ id }) => {
  // const user = useSelector((state) => selectUserById(state, id));
  // const { getUsersStatus } = useSelector((state) => state.adminUsers);
  // const { getOrdersStatus } = useSelector((state) => state.adminOrders);
  // const orders = useSelector((state) => selectOrdersByUserId(state, id));

  const user = users.find((user) => user.id === id);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (getUsersStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getUsers());
  //   }

  //   if (getOrdersStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getOrders());
  //   }
  // }, []);

  // if (
  //   getOrdersStatus === ACTION_STATUS.IDLE ||
  //   getOrdersStatus === ACTION_STATUS.LOADING ||
  //   getUsersStatus === ACTION_STATUS.IDLE ||
  //   getUsersStatus === ACTION_STATUS.LOADING
  // ) {
  //   return <Loading />;
  // }

  // if (
  //   getOrdersStatus === ACTION_STATUS.FAILED ||
  //   getUsersStatus === ACTION_STATUS.FAILED
  // ) {
  //   return <FetchDataErrorMessage />;
  // }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 1 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar sx={{ width: 144, height: 144 }} src={user?.avatar} />
            </Box>
            <Stack
              spacing={0.25}
              sx={{ mt: 1 }}
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="subtitle1"
                component="span"
                color="text.primary"
              >
                {user?.firstName + " " + user?.lastName}
              </Typography>
              <Label color={user?.role === "admin" ? "primary" : "warning"}>
                {user?.role === "admin" ? "Admin" : "User"}
              </Label>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 1, mt: 2 }}>
          <CardContent>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="body1" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {user?.email}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="body1" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {user?.phone}
                </Typography>
              </Stack>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography variant="body1" color="text.secondary">
                      Date of birth
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {fDate(user?.birthDate)}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography variant="body1" color="text.secondary">
                      Gender
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {user?.gender}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Stack spacing={1}>
                <Typography variant="body1" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {user?.address}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h6" color="text.secondary">
          ORDERS
        </Typography>
        <Divider sx={{ mt: 1, mb: 1 }} />
        {orders?.length === 0 ? (
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  objectFit: "cover",
                }}
                component="img"
                src={emptyBag}
              />
            </Box>
            <Typography
              variant="h6"
              component="p"
              textAlign="center"
              color="text.secondary"
            >
              This user does not have any orders.
            </Typography>
          </Stack>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Typography variant="body1">
                        {fDateTime(order.orderDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {fCurrency(order.price)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        component={RouterLink}
                        to={`/admin/orders/details/${order.id}`}
                        underline="none"
                      >
                        <Typography variant="body1">Details</Typography>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default UserDetails;
