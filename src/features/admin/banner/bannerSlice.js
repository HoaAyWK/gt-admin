import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import ACTION_STATUS from '../../../constants/actionStatus';
import bannerApi from '../../../services/bannerApi';

const bannersAdapter = createEntityAdapter();

const initialState = bannersAdapter.getInitialState({
  getBannersStatus: ACTION_STATUS.IDLE,
  createBannerStatus: ACTION_STATUS.IDLE,
  updateBannerStatus: ACTION_STATUS.IDLE,
});

export const getBanners = createAsyncThunk(
  'banners/getBanners',
  async (params) => {
    return await bannerApi.getBanners(params);
  }
);

export const createBanner = createAsyncThunk('banners/create', async (data) => {
  return await bannerApi.addBanner(data);
});

export const updateBanner = createAsyncThunk('banners/update', async (data) => {
  return await bannerApi.updateBanner(data);
});

const bannerSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getBanners.pending, (state) => {
        state.getBannersStatus = ACTION_STATUS.IDLE;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.getBannersStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          bannersAdapter.setAll(state, action.payload.data.items);
        }
      })
      .addCase(getBanners.rejected, (state) => {
        state.getBannersStatus = ACTION_STATUS.FAILED;
      })

      .addCase(createBanner.pending, (state) => {
        state.createBannerStatus = ACTION_STATUS.IDLE;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.createBannerStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          bannersAdapter.addOne(state, action.payload.data);
        }
      })
      .addCase(createBanner.rejected, (state) => {
        state.createBannerStatus = ACTION_STATUS.FAILED;
      })

      .addCase(updateBanner.pending, (state) => {
        state.updateBannerStatus = ACTION_STATUS.IDLE;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.updateBannerStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          bannersAdapter.upsertOne(state, action.payload);
        }
      })
      .addCase(updateBanner.rejected, (state) => {
        state.updateBannerStatus = ACTION_STATUS.FAILED;
      });
  },
});

export const {
  selectAll: selectAllBanners,
  selectById: selectBannerById,
  selectIds: selectBannerIds,
} = bannersAdapter.getSelectors((state) => state.banners);

const { reducer } = bannerSlice;

export default reducer;
