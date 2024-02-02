import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import ACTION_STATUS from '../../../constants/actionStatus';
import orderApi from '../../../services/orderApi';
import { STATUS } from "../../../constants/orderStatus";

const ordersAdapter = createEntityAdapter();

const initialState = ordersAdapter.getInitialState({
  getOrdersStatus: ACTION_STATUS.IDLE,
  cancelOrderStatus: ACTION_STATUS.IDLE,
  finishOrderStatus: ACTION_STATUS.IDLE,
});

export const getOrders = createAsyncThunk(
  'orders/all',
  async () => {
    return await orderApi.getAll();
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancel',
  async (id) => {
    return await orderApi.update({ id, status: STATUS.CANCELLED });
  }
);

export const finishOrder = createAsyncThunk(
  'orders/finish',
  async (id) => {
    return await orderApi.update({ id, status: STATUS.PAID });
  }
);


const orderSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {
    refresh: (state) => {
      state.cancelOrderStatus = ACTION_STATUS.IDLE;
      state.finishOrderStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getOrders.pending, (state) => {
        state.getOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.getOrdersStatus = ACTION_STATUS.SUCCEEDED;
        ordersAdapter.setAll(state, action.payload.items);
      })
      .addCase(getOrders.rejected, (state) => {
        state.getOrdersStatus = ACTION_STATUS.FAILED;
      })


      .addCase(cancelOrder.pending, (state) => {
        state.cancelOrderStatus = ACTION_STATUS.LOADING;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelOrderStatus = ACTION_STATUS.SUCCEEDED;
        const { id, ...data } = action.payload.bill;
        ordersAdapter.updateOne(state, { id, changes: data });
      })
      .addCase(cancelOrder.rejected, (state) => {
        state.cancelOrderStatus = ACTION_STATUS.FAILED;
      })


      .addCase(finishOrder.pending, (state) => {
        state.finishOrderStatus = ACTION_STATUS.LOADING;
      })
      .addCase(finishOrder.fulfilled, (state, action) => {
        state.finishOrderStatus = ACTION_STATUS.SUCCEEDED;
        const { id, ...data } = action.payload.bill;
        ordersAdapter.updateOne(state, { id, changes: data });
      })
      .addCase(finishOrder.rejected, (state) => {
        state.finishOrderStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOderIds,
} = ordersAdapter.getSelectors((state) => state.adminOrders);

export const selectOrdersByUserId = createSelector(
  [selectAllOrders, (state, userId) => userId],
  (orders, userId) => orders.filter((order) => order.userId === userId)
);

const { reducer, actions } = orderSlice;

export const { refresh } = actions;

export default reducer;
