import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

import ACTION_STATUS from '../../../constants/actionStatus';
import userApi from '../../../services/userApi';
import { uploadTaskPromise } from '../../../utils/uploadTaskPromise';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  getUsersStatus: ACTION_STATUS.IDLE,
  createUserStatus: ACTION_STATUS.IDLE,
  updateUserStatus: ACTION_STATUS.IDLE,
  deleteUserStatus: ACTION_STATUS.IDLE,
});

export const getUsers = createAsyncThunk(
  'users/all',
  async () => {
    return await userApi.getAll();
  }
);

export const createUser = createAsyncThunk(
  'users/create',
  async (user) => {
    const { avatar, ...data } = user;

    if (avatar) {
      const filePath = `files/avatar/${uuidv4()}`;
      data.avatar = await uploadTaskPromise(filePath, avatar);
    }

    return await userApi.create(data);
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async (user) => {
    const { avatar, ...data } = user;

    if (avatar) {
      const filePath = `files/avatar/${uuidv4()}`;
      data.avatar = await uploadTaskPromise(filePath, avatar);
    }

    return await userApi.update(data);
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id) => {
    return await userApi.delete(id);
  }
);

const userSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createUserStatus = ACTION_STATUS.IDLE;
      state.updateUserStatus = ACTION_STATUS.IDLE;
      state.deleteUserStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getUsers.pending, (state) => {
        state.getUsersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.getUsersStatus = ACTION_STATUS.SUCCEEDED;
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(getUsers.rejected, (state) => {
        state.getUsersStatus = ACTION_STATUS.FAILED;
      })


      .addCase(createUser.pending, (state) => {
        state.createUserStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createUserStatus = ACTION_STATUS.SUCCEEDED;
        usersAdapter.addOne(state, action.payload);
      })
      .addCase(createUser.rejected, (state) => {
        state.createUserStatus = ACTION_STATUS.FAILED;
      })


      .addCase(updateUser.pending, (state) => {
        state.updateUserStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserStatus = ACTION_STATUS.SUCCEEDED;

        let existingUser = state.entities[action.payload.id];

        if (existingUser) {
          existingUser = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.updateUserStatus = ACTION_STATUS.FAILED;
      })


      .addCase(deleteUser.pending, (state) => {
        state.deleteUserStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserStatus = ACTION_STATUS.SUCCEEDED;
        usersAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.deleteUserStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => state.adminUsers);

const { reducer, actions } = userSlice;
export const { refresh } = actions;

export default reducer;
