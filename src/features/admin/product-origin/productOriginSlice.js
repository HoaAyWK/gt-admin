import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import productOriginApi from '../../../services/productOriginApi';
import ACTION_STATUS from '../../../constants/actionStatus';

const productOriginsAdapter = createEntityAdapter();

const initialState = productOriginsAdapter.getInitialState({
  getProductOriginsStatus: ACTION_STATUS.IDLE,
  createProductOriginStatus: ACTION_STATUS.IDLE,
  updateProductOriginStatus: ACTION_STATUS.IDLE,
  deleteProductOriginStatus: ACTION_STATUS.IDLE,
  recentDetail: null,
  recentEdit: null,
});

export const getProductOrigins = createAsyncThunk(
  'productOrigins/all',
  async () => {
    return await productOriginApi.getAll();
  }
);

export const createProductOrigin = createAsyncThunk(
  'productOrigins/create',
  async (productOrigin) => {
    const { id, ...data } = productOrigin;
    return await productOriginApi.create(data);
  }
);

export const updateProductOrigin = createAsyncThunk(
  'productOrigins/update',
  async (data) => {
    return await productOriginApi.update(data);
  }
);

export const deleteProductOrigin = createAsyncThunk(
  'productOrigin/delete',
  async (id) => {
    return await productOriginApi.delete(id);
  }
);

const productOriginSlice = createSlice({
  name: 'adminProductOrigins',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createProductOriginStatus = ACTION_STATUS.IDLE,
      state.updateProductOriginStatus = ACTION_STATUS.IDLE,
      state.deleteProductOriginStatus = ACTION_STATUS.IDLE
    },
    setRecentDetail: (state, action) => {
      state.recentDetail = action.payload;
    },
    setRecentEdit: (state, action) => {
      state.recentEdit = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getProductOrigins.pending, (state) => {
        state.getProductOriginsStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getProductOrigins.fulfilled, (state, action) => {
        state.getProductOriginsStatus = ACTION_STATUS.SUCCEEDED;
        productOriginsAdapter.setAll(state, action.payload.items);
      })
      .addCase(getProductOrigins.rejected, (state) => {
        state.getProductOriginsStatus = ACTION_STATUS.FAILED;
      })



      .addCase(createProductOrigin.pending, (state) => {
        state.createProductOriginStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createProductOrigin.fulfilled, (state, action) => {
        state.createProductOriginStatus = ACTION_STATUS.SUCCEEDED;
        productOriginsAdapter.addOne(state, action.payload.product);
      })
      .addCase(createProductOrigin.rejected, (state) => {
        state.createProductOriginStatus = ACTION_STATUS.FAILED;
      })


      .addCase(updateProductOrigin.pending, (state) => {
        state.updateProductOriginStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateProductOrigin.fulfilled, (state, action) => {
        state.updateProductOriginStatus = ACTION_STATUS.SUCCEEDED;
        const { id, ...data } = action.payload.product;
        productOriginsAdapter.updateOne(state, { id, changes: data });
      })
      .addCase(updateProductOrigin.rejected, (state) => {
        state.updateProductOriginStatus = ACTION_STATUS.FAILED;
      })

      .addCase(deleteProductOrigin.pending, (state) => {
        state.deleteProductOriginStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteProductOrigin.fulfilled, (state, action) => {
        state.deleteProductOriginStatus = ACTION_STATUS.SUCCEEDED;
        productOriginsAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteProductOrigin.rejected, (state) => {
        state.deleteProductOriginStatus = ACTION_STATUS.FAILED;
      })
  }
});


export const {
  selectAll: selectAllProductOrigins,
  selectById: selectProductOriginById,
  selectIds: selectProductOriginIds,
} = productOriginsAdapter.getSelectors((state) => state.adminProductOrigins);

const { reducer, actions } = productOriginSlice;
export const { refresh, setRecentDetail, setRecentEdit } = actions;

export default reducer;
