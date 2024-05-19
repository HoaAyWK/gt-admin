import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ACTION_STATUS from '../../../constants/actionStatus';

import orderApi from '../../../services/orderApi';
import userApi from '../../../services/userApi';

const initialState = {
  getOrderStatsStatus: ACTION_STATUS.IDLE,
  orderStats: null,
  getCustomerStatsStatus: ACTION_STATUS.IDLE,
  customerStats: null,
  getIncome7DaysStatsStatus: ACTION_STATUS.IDLE,
  income7DaysStats: null,
  getIncome30DaysStatsStatus: ACTION_STATUS.IDLE,
  income30DaysStats: null,
};

export const getOrderStats = createAsyncThunk(
  'stats/getOrderStats',
  async (fromDay) => {
    return await orderApi.getStats(fromDay);
  }
);

export const getCustomerStats = createAsyncThunk(
  'stats/getCustomerStats',
  async (fromDay) => {
    return await userApi.getStats(fromDay);
  }
);

export const get7DaysIncomeStats = createAsyncThunk(
  'stats/get7DaysIncomeStats',
  async () => {
    return await orderApi.getIncomeStats(7);
  }
);

export const get30DaysIncomeStats = createAsyncThunk(
  'stats/get30DaysIncomeStats',
  async () => {
    return await orderApi.getIncomeStats(30);
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {


    builder


      .addCase(getOrderStats.pending, (state) => {
        state.getOrderStatsStatus = ACTION_STATUS.PENDING;
      })
      .addCase(getOrderStats.fulfilled, (state, action) => {
        state.getOrderStatsStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.orderStats = action.payload.data;
        }
      })
      .addCase(getOrderStats.rejected, (state) => {
        state.getOrderStatsStatus = ACTION_STATUS.FAILED;
      })



      .addCase(getCustomerStats.pending, (state) => {
        state.getCustomerStatsStatus = ACTION_STATUS.PENDING;
      })
      .addCase(getCustomerStats.fulfilled, (state, action) => {
        state.getCustomerStatsStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.customerStats = action.payload.data;
        }
      })
      .addCase(getCustomerStats.rejected, (state) => {
        state.getCustomerStatsStatus = ACTION_STATUS.FAILED;
      })



      .addCase(get7DaysIncomeStats.pending, (state) => {
        state.getIncome7DaysStatsStatus = ACTION_STATUS.PENDING;
      })
      .addCase(get7DaysIncomeStats.fulfilled, (state, action) => {
        state.getIncome7DaysStatsStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.income7DaysStats = action.payload.data;
        }
      })
      .addCase(get7DaysIncomeStats.rejected, (state) => {
        state.getIncome7DaysStatsStatus = ACTION_STATUS.FAILED;
      })



      .addCase(get30DaysIncomeStats.pending, (state) => {
        state.getIncome30DaysStatsStatus = ACTION_STATUS.PENDING;
      })
      .addCase(get30DaysIncomeStats.fulfilled, (state, action) => {
        state.getIncome30DaysStatsStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.income30DaysStats = action.payload.data;
        }
      })
      .addCase(get30DaysIncomeStats.rejected, (state) => {
        state.getIncome30DaysStatsStatus = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer } = statsSlice;

export default reducer;
