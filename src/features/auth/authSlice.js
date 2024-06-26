import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../constants/actionStatus';
import authApi from '../../services/authApi';

const initialState = {
  user: null,
  isAuthenticated: false,
  loginStatus: ACTION_STATUS.IDLE,
  getCurrentUserStatus: ACTION_STATUS.IDLE,
  statusCode: null
};

export const login = createAsyncThunk('login', async (body, thunkApi) => {
  const res = await authApi.login(body);

  if (res.success) {
    localStorage.setItem('accessToken', JSON.stringify(res.data.token));
    thunkApi.dispatch(getCurrentUserInfo());
  }

  return res;
});

export const getCurrentUserInfo = createAsyncThunk(
  'getCurrentUser',
  async () => {
    const res = await authApi.getCurrentUserInfo();
    return res;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.setItem('accessToken', null);
      state.user = null;
      state.isAuthenticated = false;
      state.getCurrentUserStatus = ACTION_STATUS.IDLE;
      state.loginStatus = ACTION_STATUS.IDLE;
    },
    refreshStatusCode: (state) => {
      state.statusCode = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = ACTION_STATUS.LOADING;
      })
      .addCase(login.fulfilled, (state) => {
        state.loginStatus = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(login.rejected, (state) => {
        state.loginStatus = ACTION_STATUS.FAILED;
      })

      .addCase(getCurrentUserInfo.pending, (state) => {
        state.getCurrentUserStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCurrentUserInfo.fulfilled, (state, action) => {
        state.getCurrentUserStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.isAuthenticated = true;
          state.user = { ...action.payload.data };
        } else {
          state.isAuthenticated = false;
          state.user = null;
          state.statusCode = action.payload.statusCode;
        }
      })
      .addCase(getCurrentUserInfo.rejected, (state) => {
        state.getCurrentUserStatus = ACTION_STATUS.FAILED;
      });
  },
});

const { reducer, actions } = authSlice;

export const { logout, refreshStatusCode } = actions;

export default reducer;
