import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import ACTION_STATUS from '../../../constants/actionStatus';
import bannerApi from '../../../services/bannerApi';
import { uploadTaskPromise } from '../../../utils/uploadTaskPromise';

const bannersAdapter = createEntityAdapter();

const initialState = bannersAdapter.getInitialState({
  getBannersStatus: ACTION_STATUS.IDLE,
  createBannerStatus: ACTION_STATUS.IDLE,
  deleteBannerStatus: ACTION_STATUS.IDLE,
});

export const getBanners = createAsyncThunk('adminBanners/all', async () => {
  return await bannerApi.getAll();
});

export const createBanner = createAsyncThunk(
  'adminBanners/create',
  async (banner, thunkApi) => {
    const { image, ...data } = banner;

    if (image) {
      const filePath = `files/banners/${uuidv4()}`;
      data.image = await uploadTaskPromise(filePath, image);
    }

    const res = await bannerApi.create(data);

    return res;
  }
);

export const deleteBanner = createAsyncThunk(
  'adminBanner/delete',
  async (id) => {
    return await bannerApi.delete(id);
  }
);

const bannerSlice = createSlice({
  name: 'adminBanners',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createBannerStatus = ACTION_STATUS.IDLE;
      state.deleteBannerStatus = ACTION_STATUS.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getBanners.pending, (state) => {
        state.getBannersStatus = ACTION_STATUS.IDLE;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.getBannersStatus = ACTION_STATUS.SUCCEEDED;
        bannersAdapter.setAll(state, action.payload);
      })
      .addCase(getBanners.rejected, (state) => {
        state.getBannersStatus = ACTION_STATUS.FAILED;
      })

      .addCase(createBanner.pending, (state) => {
        state.createBannerStatus = ACTION_STATUS.IDLE;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.createBannerStatus = ACTION_STATUS.SUCCEEDED;
        bannersAdapter.addOne(state, action.payload);
      })
      .addCase(createBanner.rejected, (state) => {
        state.createBannerStatus = ACTION_STATUS.FAILED;
      })

      .addCase(deleteBanner.pending, (state) => {
        state.deleteBannerStatus = ACTION_STATUS.IDLE;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.deleteBannerStatus = ACTION_STATUS.SUCCEEDED;
        bannersAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteBanner.rejected, (state) => {
        state.deleteBannerStatus = ACTION_STATUS.FAILED;
      });
  },
});

export const {
  selectAll: selectAllBanners,
  selectById: selectBannerById,
  selectIds: selectBannerIds,
} = bannersAdapter.getSelectors((state) => state.adminBanners);

const { reducer, actions } = bannerSlice;

export const { refresh } = actions;

export default reducer;
