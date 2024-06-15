import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import ACTION_STATUS from '../../../constants/actionStatus';
import brandApi from '../../../services/brandApi';
import { v4 as uuidv4 } from 'uuid';
import { uploadTaskPromise } from '../../../utils/uploadTaskPromise';

const brandsAdapter = createEntityAdapter();

const initialState = brandsAdapter.getInitialState({
  getBrandsStatus: ACTION_STATUS.IDLE,
  createBrandStatus: ACTION_STATUS.IDLE,
  updateBrandStatus: ACTION_STATUS.IDLE,
  deleteBrandStatus: ACTION_STATUS.IDLE,
});

export const getBrands = createAsyncThunk('brands/all', async () => {
  return await brandApi.getAll();
});

export const createBrand = createAsyncThunk('brands/create', async (brand) => {
  const { imageUrl } = brand;

  if (imageUrl) {
    const filePath = `file/brand-images/${uuidv4()}`;
    brand.imageUrl = await uploadTaskPromise(filePath, imageUrl);
  }

  return await brandApi.create(brand);
});

export const updateBrand = createAsyncThunk(
  'brands/update',
  async (brand, thunkApi) => {
    const { id, imageUrl, ...data } = brand;

    if (imageUrl && imageUrl instanceof File) {
      const filePath = `file/brand-images/${uuidv4()}`;
      data.imageUrl = await uploadTaskPromise(filePath, imageUrl);
    }
    else {
      data.imageUrl = imageUrl;
    }

    const result = await brandApi.update(id, data);

    if (result.data.success) {
      thunkApi.dispatch(getBrands());
    }

    return result;
  }
);

export const deleteBrand = createAsyncThunk('brands/delete', async (id) => {
  return await brandApi.delete(id);
});

const brandSlice = createSlice({
  name: 'adminBrands',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createBrandStatus = ACTION_STATUS.IDLE;
      state.updateBrandStatus = ACTION_STATUS.IDLE;
      state.deleteBrandStatus = ACTION_STATUS.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getBrands.pending, (state) => {
        state.getBrandsStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.getBrandsStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          brandsAdapter.setAll(state, action.payload.data.items);
        }
      })
      .addCase(getBrands.rejected, (state) => {
        state.getBrandsStatus = ACTION_STATUS.FAILED;
      })

      .addCase(createBrand.pending, (state) => {
        state.createBrandStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.createBrandStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          brandsAdapter.addOne(state, action.payload.data);
        }
      })
      .addCase(createBrand.rejected, (state) => {
        state.createBrandStatus = ACTION_STATUS.FAILED;
      })

      .addCase(updateBrand.pending, (state) => {
        state.updateBrandStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.updateBrandStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          brandsAdapter.updateOne(state, {
            id: action.payload.data.id,
            changes: action.payload.data,
          });
        }
      })
      .addCase(updateBrand.rejected, (state) => {
        state.updateBrandStatus = ACTION_STATUS.FAILED;
      })

      .addCase(deleteBrand.pending, (state) => {
        state.deleteBrandStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.deleteBrandStatus = ACTION_STATUS.SUCCEEDED;
        brandsAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteBrand.rejected, (state) => {
        state.deleteBrandStatus = ACTION_STATUS.FAILED;
      });
  },
});

export const {
  selectAll: selectAllBrands,
  selectById: selectBrandById,
  selectIds: selectBrandIds,
} = brandsAdapter.getSelectors((state) => state.adminBrands);

const { reducer, actions } = brandSlice;
export const { refresh } = actions;

export default reducer;
