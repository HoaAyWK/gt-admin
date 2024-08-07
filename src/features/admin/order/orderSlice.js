import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import ACTION_STATUS from '../../../constants/actionStatus';
import orderApi from '../../../services/orderApi';
import { STATUS } from "../../../constants/orderStatus";
import { ORDER_PER_PAGE_OPTIONS }  from '../../../constants/common';

const ordersAdapter = createEntityAdapter();

const initialState = ordersAdapter.getInitialState({
  order: null,
  getOrderStatus: ACTION_STATUS.IDLE,
  getOrdersStatus: ACTION_STATUS.IDLE,
  orderPages: [],
  ordersPageSize: ORDER_PER_PAGE_OPTIONS[0],
  ordersTotalPages: 0,
  ordersTotalItems: 0,
  pendingOrders: [],
  pendingOrdersPages: [],
  pendingOrdersPageSize: ORDER_PER_PAGE_OPTIONS[0],
  pendingOrdersTotalPages: 0,
  pendingOrdersTotalItems: 0,
  processingOrders: [],
  getProcessingOrdersPages: [],
  processingOrdersPageSize: ORDER_PER_PAGE_OPTIONS[0],
  processingOrdersTotalPages: 0,
  processingOrdersTotalItems: 0,
  completedOrders: [],
  completedOrdersPages: [],
  completedOrdersPageSize: ORDER_PER_PAGE_OPTIONS[0],
  completedOrdersTotalPages: 0,
  completedOrdersTotalItems: 0,
  cancelledOrders: [],
  cancelledOrdersPages: [],
  cancelledOrdersPageSize: ORDER_PER_PAGE_OPTIONS[0],
  cancelledOrdersTotalPages: 0,
  cancelledOrdersTotalItems: 0,
  refundedOrders: [],
  refundedOrdersPages: [],
  refundedOrdersPageSize: ORDER_PER_PAGE_OPTIONS[0],
  refundedOrdersTotalPages: 0,
  refundedOrdersTotalItems: 0,
  confirmOrderStatus: ACTION_STATUS.IDLE,
  cancelOrderStatus: ACTION_STATUS.IDLE,
});

export const getOrder = createAsyncThunk(
  'orders/get',
  async (id) => {
    return await orderApi.getOrder(id);
  }
);

export const confirmOrder = createAsyncThunk(
  'orders/confirm',
  async (id) => {
    return await orderApi.confirmOrderPaymentInfo(id);
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancel',
  async (id) => {
    return await orderApi.cancelOrder(id);
  }
);

export const getOrders = createAsyncThunk(
  'orders/all',
  async (params) => {
    return await orderApi.getOrders(params);
  }
);

export const getPendingOrders = createAsyncThunk(
  'orders/pending',
  async (data) => {
    const params = { orderStatus: STATUS.PENDING, ...data };
    return await orderApi.getOrders(params);
  }
);

export const getProcessingOrders = createAsyncThunk(
  'orders/processing',
  async (data) => {
    const params = { orderStatus: STATUS.PROCESSING, ...data };
    return await orderApi.getOrders(params);
  }
);

export const getCompletedOrders = createAsyncThunk(
  'orders/completed',
  async (data) => {
    const params = { orderStatus: STATUS.COMPLETED, ...data };
    return await orderApi.getOrders(params);
  }
);

export const getCancelledOrders = createAsyncThunk(
  'orders/cancelled',
  async (data) => {
    const params = { orderStatus: STATUS.CANCELLED, ...data };
    return await orderApi.getOrders(params);
  }
);

export const getRefundedOrders = createAsyncThunk(
  'orders/refunded',
  async (data) => {
    const params = { orderStatus: STATUS.REFUNDED, ...data };
    return await orderApi.getOrders(params);
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
    },
    refreshGetOrders: (state) => {
      state.getOrdersStatus = ACTION_STATUS.IDLE;
      ordersAdapter.removeAll(state);
      state.orderPages = [];
    },
    refreshGetPendingOrders: (state) => {
      state.pendingOrders = [];
      state.pendingOrdersPages = [];
    },
    refreshGetProcessingOrders: (state) => {
      state.processingOrders = [];
      state.pendingOrdersPages = [];
    },
    refreshGetCompletedOrders: (state) => {
      state.completedOrders = [];
      state.completedOrdersPages = [];
    },
    refreshGetCancelledOrders: (state) => {
      state.cancelledOrders = [];
      state.cancelledOrdersPages = [];
    },
    refreshRefundedOrders: (state) => {
      state.refundedOrders = [];
      state.refundedOrdersPages = [];
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getOrder.pending, (state) => {
        state.getOrderStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.getOrderStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.order = action.payload.data;
        }
      })
      .addCase(getOrder.rejected, (state) => {
        state.getOrderStatus = ACTION_STATUS.FAILED;
      })



      .addCase(getOrders.pending, (state) => {
        state.getOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.getOrdersStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const { page, pageSize, items, totalPages, totalItems } = action.payload.data;

          const orders = items.map(order => ({ page, ...order }));

          if (pageSize != state.ordersPageSize) {

            ordersAdapter.setAll(state, orders);
            state.orderPages = [];
            state.orderPages.push(page);
            state.ordersPageSize = pageSize;
            state.ordersTotalPages = totalPages;
            state.ordersTotalItems = totalItems;

            return;
          }

          const isPreviousSelectedPage = state.orderPages.indexOf(page) > -1;

          if (!isPreviousSelectedPage) {
            state.orderPages.push(page);
            ordersAdapter.addMany(state, orders);
          }

          state.ordersPageSize = pageSize;
          state.ordersTotalPages = totalPages;
          state.ordersTotalItems = totalItems;
        }
      })
      .addCase(getOrders.rejected, (state) => {
        state.getOrdersStatus = ACTION_STATUS.FAILED;
      })


      .addCase(getPendingOrders.pending, (state) => {
        state.getOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getPendingOrders.fulfilled, (state, action) => {
        state.getOrdersStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const { page, pageSize, items, totalPages, totalItems } = action.payload.data;

          const orders = items.map(order => ({ page, ...order }));

          if (pageSize != state.pendingOrdersPageSize) {
            state.pendingOrders = [];
            state.pendingOrdersPages = [];
            state.pendingOrdersPages.push(page);
            state.pendingOrdersPageSize = pageSize;
            state.pendingOrdersTotalPages = totalPages;
            state.pendingOrdersTotalItems = totalItems;

            return;
          }

          const isPreviousSelectedPage = state.pendingOrdersPages.indexOf(page) > -1;

          if (!isPreviousSelectedPage) {
            state.pendingOrdersPages.push(page);
            state.pendingOrders = state.pendingOrders.concat(orders);
          }

          state.pendingOrdersPageSize = pageSize;
          state.pendingOrdersTotalPages = totalPages;
          state.pendingOrdersTotalItems = totalItems;
        }
      })
      .addCase(getPendingOrders.rejected, (state) => {
        state.getOrdersStatus = ACTION_STATUS.FAILED;
      })


      .addCase(getProcessingOrders.pending, (state) => {
        state.getOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getProcessingOrders.fulfilled, (state, action) => {
        state.getOrdersStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const { page, pageSize, items, totalPages, totalItems } = action.payload.data;

          const orders = items.map(order => ({ page, ...order }));

          if (pageSize != state.processingOrdersPageSize) {
            state.processingOrders = [];
            state.getProcessingOrdersPages = [];
            state.getProcessingOrdersPages.push(page);
            state.processingOrdersPageSize = pageSize;
            state.processingOrdersTotalPages = totalPages;
            state.processingOrdersTotalItems = totalItems;

            return;
          }

          const isPreviousSelectedPage = state.getProcessingOrdersPages.indexOf(page) > -1;

          if (!isPreviousSelectedPage) {
            state.getProcessingOrdersPages.push(page);
            state.processingOrders = state.processingOrders.concat(orders);
          }

          state.processingOrdersPageSize = pageSize;
          state.processingOrdersTotalPages = totalPages;
          state.processingOrdersTotalItems = totalItems;
        }
      })
      .addCase(getProcessingOrders.rejected, (state) => {
        state.getOrdersStatus = ACTION_STATUS.FAILED;
      })



      .addCase(getCompletedOrders.pending, (state) => {
        state.getOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCompletedOrders.fulfilled, (state, action) => {
        state.getOrdersStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const { page, pageSize, items, totalPages, totalItems } = action.payload.data;

          const orders = items.map(order => ({ page, ...order }));

          if (pageSize != state.completedOrdersPageSize) {
            state.completedOrders = [];
            state.completedOrdersPages = [];
            state.completedOrdersPages.push(page);
            state.completedOrdersPageSize = pageSize;
            state.completedOrdersTotalPages = totalPages;
            state.completedOrdersTotalItems = totalItems;

            return;
          }

          const isPreviousSelectedPage = state.completedOrdersPages.indexOf(page) > -1;

          if (!isPreviousSelectedPage) {
            state.completedOrdersPages.push(page);
            state.completedOrders = state.completedOrders.concat(orders);
          }

          state.completedOrdersPageSize = pageSize;
          state.completedOrdersTotalPages = totalPages;
          state.completedOrdersTotalItems = totalPages;
        }
      })
      .addCase(getCompletedOrders.rejected, (state) => {
        state.getOrdersStatus = ACTION_STATUS.FAILED;
      })



      .addCase(getCancelledOrders.pending, (state) => {
        state.getOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCancelledOrders.fulfilled, (state, action) => {
        state.getOrdersStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const { page, pageSize, items, totalPages, totalItems } = action.payload.data;

          const orders = items.map(order => ({ page, ...order }));

          if (pageSize != state.cancelledOrdersPageSize) {

            state.cancelledOrders = [];
            state.cancelledOrdersPages = [];
            state.cancelledOrdersPages.push(page);
            state.cancelledOrdersPageSize = pageSize;
            state.cancelledOrdersTotalPages = totalPages;
            state.cancelledOrdersTotalItems = totalItems;

            return;
          }

          const isPreviousSelectedPage = state.cancelledOrdersPages.indexOf(page) > -1;

          if (!isPreviousSelectedPage) {
            state.cancelledOrdersPages.push(page);
            state.cancelledOrders = state.cancelledOrders.concat(orders);
          }

          state.cancelledOrdersPageSize = pageSize;
          state.cancelledOrdersTotalPages = totalPages;
          state.cancelledOrdersTotalItems = totalItems;
        }
      })
      .addCase(getCancelledOrders.rejected, (state) => {
        state.getOrdersStatus = ACTION_STATUS.FAILED;
      })


      .addCase(getRefundedOrders.pending, (state) => {
        state.getOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getRefundedOrders.fulfilled, (state, action) => {
        state.getOrdersStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const { page, pageSize, items, totalPages, totalItems } = action.payload.data;

          const orders = items.map(order => ({ page, ...order }));

          if (pageSize != state.refundedOrdersPageSize) {

            state.refundedOrders = [];
            state.refundedOrdersPages = [];
            state.refundedOrdersPages.push(page);
            state.refundedOrdersPageSize = pageSize;
            state.refundedOrdersTotalPages = totalPages;
            state.refundedOrdersTotalItems = totalItems;

            return;
          }

          const isPreviousSelectedPage = state.refundedOrdersPages.indexOf(page) > -1;

          if (!isPreviousSelectedPage) {
            state.refundedOrdersPages.push(page);
            state.refundedOrders = state.refundedOrders.concat(orders);
          }

          state.refundedOrdersPageSize = pageSize;
          state.refundedOrdersTotalPages = totalPages;
          state.refundedOrdersTotalItems = totalItems;
        }
      })
      .addCase(getRefundedOrders.rejected, (state) => {
        state.getOrdersStatus = ACTION_STATUS.FAILED;
      })



      .addCase(confirmOrder.pending, (state) => {
        state.confirmOrderStatus = ACTION_STATUS.LOADING;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.confirmOrderStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.order = action.payload.data;
        }
      })
      .addCase(confirmOrder.rejected, (state) => {
        state.confirmOrderStatus = ACTION_STATUS.FAILED;
      })


      .addCase(cancelOrder.pending, (state) => {
        state.cancelOrderStatus = ACTION_STATUS.LOADING;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelOrderStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.order = action.payload.data;
        }
      })
      .addCase(cancelOrder.rejected, (state) => {
        state.cancelOrderStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOderIds,
} = ordersAdapter.getSelectors((state) => state.orders);

export const selectOrdersByPage = createSelector(
  selectAllOrders,
  (_, page) => page,
  (orders, page) => orders.filter((order) => order.page === page)
);

export const selectPendingOrdersByPage = createSelector(
  state => state.orders.pendingOrders,
  (_, page) => page,
  (orders, page) => orders.filter((order) => order.page === page)
);

export const selectProcessingOrdersByPage = createSelector(
  state => state.orders.processingOrders,
  (_, page) => page,
  (orders, page) => orders.filter((order) => order.page === page)
);

export const selectCancelledOrdersByPage = createSelector(
  state => state.orders.cancelledOrders,
  (_, page) => page,
  (orders, page) => orders.filter((order) => order.page === page)
);

export const selectCompletedOrdersByPage = createSelector(
  state => state.orders.completedOrders,
  (_, page) => page,
  (orders, page) => orders.filter((order) => order.page === page)
);

export const selectRefundedOrdersByPage = createSelector(
  state => state.orders.refundedOrders,
  (_, page) => page,
  (orders, page) => orders.filter((order) => order.page === page)
);

const { reducer, actions } = orderSlice;

export const {
  refresh,
  refreshGetOrders,
  refreshGetPendingOrders,
  refreshGetProcessingOrders,
  refreshGetCompletedOrders,
  refreshGetCancelledOrders,
  refreshGetRefundedOrders
 } = actions;

export default reducer;
