import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUserById } from "./userSlice";
import ACTION_STATUS from "../../../constants/actionStatus";
import { FetchDataErrorMessage, Loading } from "../components";
import EditUserForm from "./EditUserForm";

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

const EditUser = ({ id }) => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => selectUserById(state, id));

  const user = users.find((user) => user.id === id);
  console.log(user);

  // const { getUsersStatus } = useSelector((state) => state.adminUsers);

  // useEffect(() => {
  //   if (getUsersStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getUsers());
  //   }
  // }, []);

  // if (
  //   getUsersStatus === ACTION_STATUS.IDLE ||
  //   getUsersStatus === ACTION_STATUS.LOADING
  // ) {
  //   return <Loading />;
  // }

  // if (getUsersStatus === ACTION_STATUS.FAILED) {
  //   return <FetchDataErrorMessage />;
  // }

  return <EditUserForm user={user} />;
};

export default EditUser;
