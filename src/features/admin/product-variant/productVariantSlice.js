import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import ACTION_STATUS from '../../../constants/actionStatus';
import productDetailsApi from '../../../services/productDetailsApi';
import { uploadTaskPromise } from '../../../utils/uploadTaskPromise';

const productVariantsAdapter = createEntityAdapter();

const initialState = productVariantsAdapter.getInitialState({
  getProductVariantsStatus: ACTION_STATUS.IDLE,
  createProductVariantStatus: ACTION_STATUS.IDLE,
  updateProductVariantStatus: ACTION_STATUS.IDLE,
  deleteProductVariantStatus: ACTION_STATUS.IDLE,
});

export const getProductVariants = createAsyncThunk(
  'adminProductVariants/all',
  async () => {
    return await productDetailsApi.getAll();
  }
);

export const createProductVariant = createAsyncThunk(
  'adminProductVariant/create',
  async (productVariant) => {
    const { id, ...data } = productVariant;

    return await productDetailsApi.create(data);
  }
);

export const updateProductVariant = createAsyncThunk(
  'adminProductVariant/update',
  async (productVariant, thunkApi) => {
    const { images, ...data } = productVariant;

    if (images.length > 0) {
      const imageUrls = [];

      for (let image of images) {
        if (image.file) {
          const filePath = `file/product-variants/${uuidv4()}`;
          const url = await uploadTaskPromise(filePath, image.file);
          imageUrls.push(url);
        } else {
          imageUrls.push(image);
        }
      }

      data.images = imageUrls;
    }

    const res = await productDetailsApi.update(data);

    return res;
  }
);

export const deleteProductVariant = createAsyncThunk(
  'adminProductVariant/delete',
  async (id) => {
    return await productDetailsApi.delete(id);
  }
);

const productVariantSlice = createSlice({
  name: 'adminProductVariants',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createProductVariantStatus = ACTION_STATUS.IDLE;
      state.updateProductVariantStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getProductVariants.pending, (state) => {
        state.getProductVariantsStatus = ACTION_STATUS.IDLE;
      })
      .addCase(getProductVariants.fulfilled, (state, action) => {
        state.getProductVariantsStatus = ACTION_STATUS.SUCCEEDED;
        productVariantsAdapter.setAll(state, action.payload.items);
      })
      .addCase(getProductVariants.rejected, (state) => {
        state.getProductVariantsStatus = ACTION_STATUS.FAILED;
      })



      .addCase(createProductVariant.pending, (state) => {
        state.createProductVariantStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createProductVariant.fulfilled, (state, action) => {
        state.createProductVariantStatus = ACTION_STATUS.SUCCEEDED;
        productVariantsAdapter.addMany(state, action.payload);
      })
      .addCase(createProductVariant.rejected, (state) => {
        state.createProductVariantStatus = ACTION_STATUS.FAILED;
      })


      .addCase(updateProductVariant.pending, (state) => {
        state.updateProductVariantStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateProductVariant.fulfilled, (state, action) => {
        const { id, ...data } = action.payload;

        state.updateProductVariantStatus = ACTION_STATUS.SUCCEEDED;
        productVariantsAdapter.updateOne(state, { id, changes: data });
      })
      .addCase(updateProductVariant.rejected, (state) => {
        state.updateProductVariantStatus = ACTION_STATUS.FAILED;
      })


      .addCase(deleteProductVariant.pending, (state) => {
        state.deleteProductVariantStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteProductVariant.fulfilled, (state, action) => {
        state.deleteProductVariantStatus = ACTION_STATUS.SUCCEEDED;
        productVariantsAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteProductVariant.rejected, (state) => {
        state.deleteProductVariantStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllProductVariants,
  selectById: selectProductVariantById,
} = productVariantsAdapter.getSelectors((state) => state.adminProductVariants);

export const selectProductVariantByProductOriginId = createSelector(
  [
    selectAllProductVariants,
    (state, productOriginId) => productOriginId
  ],
  (variants, productOriginId) => variants.filter((variant) => variant.productId === productOriginId)
);

const { reducer, actions } = productVariantSlice;

export const { refresh } = actions;

export default reducer;
