import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import ACTION_STATUS from '../../../constants/actionStatus';
import discountApi from '../../../services/discountApi';

const discountAdapter = createEntityAdapter();

const initialState = discountAdapter.getInitialState({
  getDiscountsStatus: ACTION_STATUS.IDLE,
  createDiscountStatus: ACTION_STATUS.IDLE,
  updateDiscountStatus: ACTION_STATUS.IDLE,
  deleteDiscountStatus: ACTION_STATUS.IDLE,
});

export const getDiscounts = createAsyncThunk(
  'discounts/all',
  async () => {
    return await discountApi.getAll();
  }
);

export const createDiscount = createAsyncThunk(
  'discounts/create',
  async (brand) => {
    return await discountApi.create(brand);
  }
);

export const updateDiscount = createAsyncThunk(
  'discounts/update',
  async (brand, thunkApi) => {
    const { id, ...data } = brand;
    const result =  await discountApi.update(id, data);

    if (result.data.success) {
      thunkApi.dispatch(getDiscounts());
    }

    return result;
  }
);

export const deleteDiscount = createAsyncThunk(
  'discounts/delete',
  async (id) => {
    return await discountApi.delete(id);
  }
);

const discountSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder

      .addCase(getDiscounts.pending, (state) => {
        state.getDiscountsStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getDiscounts.fulfilled, (state, action) => {
        state.getDiscountsStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          discountAdapter.setAll(state, action.payload.data.items);
        }
      })
      .addCase(getDiscounts.rejected, (state) => {
        state.getDiscountsStatus = ACTION_STATUS.FAILED;
      })


      .addCase(createDiscount.pending, (state) => {
        state.createDiscountStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.createDiscountStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          discountAdapter.addOne(state, action.payload.data);
        }
      })
      .addCase(createDiscount.rejected, (state) => {
        state.createDiscountStatus = ACTION_STATUS.FAILED;
      })


      .addCase(updateDiscount.pending, (state) => {
        state.updateDiscountStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateDiscount.fulfilled, (state) => {
        state.updateDiscountStatus = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(updateDiscount.rejected, (state) => {
        state.updateDiscountStatus = ACTION_STATUS.FAILED;
      })


      .addCase(deleteDiscount.pending, (state) => {
        state.deleteDiscountStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.deleteDiscountStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          discountAdapter.removeOne(state, action.payload.id);
        }
      })
      .addCase(deleteDiscount.rejected, (state) => {
        state.deleteDiscountStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllDiscounts,
  selectById: selectDiscountById,
  selectIds: selectDiscountIds,
} = discountAdapter.getSelectors((state) => state.discounts);

const { reducer, actions } = discountSlice;

export default reducer;
