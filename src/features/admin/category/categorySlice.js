import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import ACTION_STATUS from '../../../constants/actionStatus';
import categoryApi from '../../../services/categoryApi';

const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState({
  getCategoriesStatus: ACTION_STATUS.IDLE,
  createCategoryStatus: ACTION_STATUS.IDLE,
  updateCategoryStatus: ACTION_STATUS.IDLE,
  deleteCategoryStatus: ACTION_STATUS.IDLE,
});

export const getCategories = createAsyncThunk(
  'categories/all',
  async () => {
    return await categoryApi.getAll();
  }
);

export const createCategory = createAsyncThunk(
  'categories/create',
  async (category) => {
    return await categoryApi.create(category);
  }
);

export const updateCategory = createAsyncThunk(
  'categories/update',
  async (category) => {
    const { id, ...data } = category;

    if (id) {
      data.id = id;
    }

    return await categoryApi.update(data);
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id) => {
    return await categoryApi.delete(id);
  }
);

const categorySlice = createSlice({
  name: 'adminCategories',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createCategoryStatus = ACTION_STATUS.IDLE;
      state.updateCategoryStatus = ACTION_STATUS.IDLE;
      state.deleteCategoryStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getCategories.pending, (state) => {
        state.getCategoriesStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.getCategoriesStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          categoriesAdapter.setAll(state, action.payload.data);
        }
      })
      .addCase(getCategories.rejected, (state) => {
        state.getCategoriesStatus = ACTION_STATUS.FAILED;
      })


      .addCase(createCategory.pending, (state) => {
        state.createCategoryStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.createCategoryStatus = ACTION_STATUS.SUCCEEDED;
        categoriesAdapter.addOne(state, action.payload.category);
      })
      .addCase(createCategory.rejected, (state) => {
        state.createCategoryStatus = ACTION_STATUS.FAILED;
      })


      .addCase(updateCategory.pending, (state) => {
        state.updateCategoryStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.updateCategoryStatus = ACTION_STATUS.SUCCEEDED;
        const { id, ...updatedData } = action.payload.category;

        categoriesAdapter.updateOne(state, { id, changes: updatedData});
      })
      .addCase(updateCategory.rejected, (state) => {
        state.updateCategoryStatus = ACTION_STATUS.FAILED;
      })


      .addCase(deleteCategory.pending, (state) => {
        state.deleteCategoryStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteCategoryStatus = ACTION_STATUS.SUCCEEDED;
        categoriesAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.deleteCategoryStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoriesAdapter.getSelectors((state) => state.adminCategories);

const { reducer, actions } = categorySlice;
export const { refresh } = actions;

export default reducer;
