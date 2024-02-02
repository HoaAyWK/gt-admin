import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import ACTION_STATUS from '../../../constants/actionStatus';
import inventoryApi from '../../../services/inventoryApi';

const inventoryAdapter = createEntityAdapter();

const initialState = inventoryAdapter.getInitialState({
  getInventoriesStatus: ACTION_STATUS.IDLE,
  updateInventoryStatus: ACTION_STATUS.IDLE,
  getWarehouseHistoryStatus: ACTION_STATUS.IDLE,
  warehouseHistory: []
});

export const getInventories = createAsyncThunk(
  'inventories/all',
  async () => {
    return await inventoryApi.getAll();
  }
);

export const getWarehouseHistory = createAsyncThunk(
  'inventories/warehouseHistory',
  async (id) => {
    return await inventoryApi.getWarehouseHistory(id);
  }
);


export const updateInventory = createAsyncThunk(
  'inventories/update',
  async (inventory) => {
    const { id, ...data } = inventory;

    return await inventoryApi.update(id, data);
  }
);


const inventorySlice = createSlice({
  name: 'adminInventories',
  initialState,
  reducers: {
    refresh: (state) => {
      state.updateInventoryStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getInventories.pending, (state) => {
        state.getInventoriesStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getInventories.fulfilled, (state, action) => {
        state.getInventoriesStatus = ACTION_STATUS.SUCCEEDED;
        inventoryAdapter.setAll(state, action.payload);
      })
      .addCase(getInventories.rejected, (state) => {
        state.getInventoriesStatus = ACTION_STATUS.FAILED;
      })



      .addCase(getWarehouseHistory.pending, (state) => {
        state.getWarehouseHistoryStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getWarehouseHistory.fulfilled, (state, action) => {
        state.getWarehouseHistoryStatus = ACTION_STATUS.SUCCEEDED;
        state.warehouseHistory = action.payload;
      })
      .addCase(getWarehouseHistory.rejected, (state) => {
        state.getWarehouseHistoryStatus = ACTION_STATUS.FAILED;
      })


      .addCase(updateInventory.pending, (state) => {
        state.updateInventoryStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        state.updateInventoryStatus = ACTION_STATUS.SUCCEEDED;

        let existingInventory = state.entities[action.payload.id];

        if (existingInventory) {
          existingInventory = action.payload;
        }
      })
      .addCase(updateInventory.rejected, (state) => {
        state.updateInventoryStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllInventories,
  selectById: selectInventoryById,
  selectIds: selectInventoryIds,
} = inventoryAdapter.getSelectors((state) => state.adminInventories);

const { reducer, actions } = inventorySlice;
export const { refresh } = actions;

export default reducer;
