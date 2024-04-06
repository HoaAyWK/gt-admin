import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import productApi from '../../../services/productApi';
import ACTION_STATUS from '../../../constants/actionStatus';
import { ORDER_BY, PAGE_SIZES } from '../../../constants/common';
import { uploadTaskPromise } from '../../../utils/uploadTaskPromise';
import { update } from 'lodash';

const productAdapter = createEntityAdapter();

const initialState = productAdapter.getInitialState({
  searchProductStatus: ACTION_STATUS.IDLE,
  page: 1,
  pageSize: PAGE_SIZES.DEFAULT,
  totalItems: 0,
  totalPages: 0,
  order: ORDER_BY.ASC,
  orderBy: 'name',
  searchTerm: '',
  createProductStatus: ACTION_STATUS.IDLE,
  product: null,
  getProductStatus: ACTION_STATUS.IDLE,
  updateProductStatus: ACTION_STATUS.IDLE,
  addAttributeStatus: ACTION_STATUS.IDLE,
  addAttributeValueStatus: ACTION_STATUS.IDLE,
  addVariantStatus: ACTION_STATUS.IDLE,
  addImageStatus: ACTION_STATUS.IDLE,
  updateProductAttributeStatus: ACTION_STATUS.IDLE,
  deleteAttributeValueStatus: ACTION_STATUS.IDLE,
});

export const searchProduct = createAsyncThunk(
  'products/search',
  async (params) => {
    return await productApi.searchProduct({ ...params });
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (product) => {
    const { id, ...data } = product;
    return await productApi.create(data);
  }
);

export const getProduct = createAsyncThunk(
  'products/get',
  async (id) => {
    return await productApi.getProduct(id);
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (product) => {
    const { id, ...data } = product;

    return await productApi.updateProduct(id, data);
  }
);

export const addAttribute = createAsyncThunk(
  'products/addAttribute',
  async (payload) => {
    const { id, productId, ...data } = payload;

    return await productApi.addAttribute(productId, data);
  }
);

export const addAttributeValue = createAsyncThunk(
  'products/addAttributeValue',
  async (payload) => {
    const { productId, attributeId, id, ...data } = payload;

    return await productApi.addAttributeValue(productId, attributeId, data);
  }
);

export const addVariant = createAsyncThunk(
  'products/addVariant',
  async (payload) => {
    const { productId, id, ...data } = payload;

    return await productApi.addVariant(productId, data);
  }
);

export const addImage = createAsyncThunk(
  'products/addImage',
  async (payload) => {
    const { productId, id, image, ...data } = payload;

    if (image) {
      const filePath = `file/product-images/${uuidv4()}`;
      data.imageUrl = await uploadTaskPromise(filePath, image);
    }

    return await productApi.addImage(productId, data);
  }
);

export const updateProductAttribute = createAsyncThunk(
  'products/updateProductAttribute',
  async (payload) => {
    const { productId, id, ...data } = payload;

    return await productApi.updateProductAttribute(productId, id, data);
  }
);

export const deleteAttributeValue = createAsyncThunk(
  'products/deleteAttributeValue',
  async (payload) => {
    const { productId, attributeId, id } = payload;

    return await productApi.deleteAttributeValue(productId, attributeId, id);
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    refresh: (state) => {
      state.createProductStatus = ACTION_STATUS.IDLE;
      state.getProductStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder

      // Search product
      .addCase(searchProduct.pending, (state) => {
        state.searchProductStatus = ACTION_STATUS.LOADING;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.searchProductStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          productAdapter.setAll(state, action.payload.data.items);
          state.page = action.payload.data.page;
          state.pageSize = action.payload.data.pageSize;
          state.totalItems = action.payload.data.totalItems;
          state.totalPages = action.payload.data.totalPages;
        }
      })
      .addCase(searchProduct.rejected, (state) => {
        state.searchProductStatus = ACTION_STATUS.FAILED;
      })


      // Create product
      .addCase(createProduct.pending, (state) => {
        state.createProductStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createProductStatus = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(createProduct.rejected, (state) => {
        state.createProductStatus = ACTION_STATUS.FAILED;
      })


      // Get Product
      .addCase(getProduct.pending, (state) => {
        state.getProductStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.getProductStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.product = action.payload.data;
        }
      })
      .addCase(getProduct.rejected, (state) => {
        state.getProductStatus = ACTION_STATUS.FAILED;
      })


      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.updateProductStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.product = action.payload.data;
        }
      })
      .addCase(updateProduct.rejected, (state) => {
        state.updateProductStatus = ACTION_STATUS.FAILED;
      })


      // Add attribute
      .addCase(addAttribute.pending, (state) => {
        state.addAttributeStatus = ACTION_STATUS.LOADING;
      })
      .addCase(addAttribute.fulfilled, (state, action) => {
        state.addAttributeStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.product = action.payload.data;
        }
      })
      .addCase(addAttribute.rejected, (state) => {
        state.addAttributeStatus = ACTION_STATUS.FAILED;
      })


      // Add attribute value
      .addCase(addAttributeValue.pending, (state) => {
        state.addAttributeValueStatus = ACTION_STATUS.LOADING;
      })
      .addCase(addAttributeValue.fulfilled, (state, action) => {
        state.addAttributeValueStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.product = action.payload.data;
        }
      })
      .addCase(addAttributeValue.rejected, (state) => {
        state.addAttributeValueStatus = ACTION_STATUS.FAILED;
      })


      // Add variant
      .addCase(addVariant.pending, (state) => {
        state.addVariantStatus = ACTION_STATUS.LOADING;
      })
      .addCase(addVariant.fulfilled, (state, action) => {
        state.addVariantStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.product = action.payload.data;
        }
      })
      .addCase(addVariant.rejected, (state) => {
        state.addVariantStatus = ACTION_STATUS.FAILED;
      })


      // Add image
      .addCase(addImage.pending, (state) => {
        state.addImageStatus = ACTION_STATUS.LOADING;
      })
      .addCase(addImage.fulfilled, (state, action) => {
        state.addImageStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.product = action.payload.data;
        }
      })
      .addCase(addImage.rejected, (state) => {
        state.addImageStatus = ACTION_STATUS.FAILED;
      })


      // Add Attribute Value
      .addCase(updateProductAttribute.pending, (state) => {
        state.updateProductAttributeStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateProductAttribute.fulfilled, (state, action) => {
        state.updateProductAttributeStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.product = action.payload.data;
        }
      })
      .addCase(updateProductAttribute.rejected, (state) => {
        state.updateProductAttributeStatus = ACTION_STATUS.FAILED;
      })

      // Delete Attribute value
      .addCase(deleteAttributeValue.pending, (state) => {
        state.deleteAttributeValueStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteAttributeValue.fulfilled, (state, action) => {
        state.deleteAttributeValueStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.product = action.payload.data;
        }
      })
      .addCase(deleteAttributeValue.rejected, (state) => {
        state.deleteAttributeValueStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productAdapter.getSelectors((state) => state.products);

const { reducer, actions } = productSlice;
export const {
  setPage,
  setPageSize,
  setOrder,
  setOrderBy,
  setSearchTerm,
  refresh
} = actions;

export default reducer;
