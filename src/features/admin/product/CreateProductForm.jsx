import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductForm from './ProductForm';
import { getCategories, selectAllCategories } from '../category/categorySlice';
import { getBrands, selectAllBrands } from '../brand/brandSlice';
import { Loading, FetchDataErrorMessage } from '../components';
import ACTION_STATUS from '../../../constants/actionStatus';
import { createProduct } from './productSlice';

const CreateProductForm = () => {
  const { getCategoriesStatus } = useSelector((state) => state.adminCategories);
  const { getBrandsStatus } = useSelector((state) => state.adminBrands);
  const { createProductStatus } = useSelector((state) => state.products);
  const categories = useSelector(selectAllCategories);
  const brands = useSelector(selectAllBrands);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCategoriesStatus === ACTION_STATUS.IDLE) {
      dispatch(getCategories());
    }

    if (getBrandsStatus === ACTION_STATUS.IDLE) {
      dispatch(getBrands());
    }
  }, []);

  if (getCategoriesStatus === ACTION_STATUS.LOADING ||
    getCategoriesStatus === ACTION_STATUS.IDLE ||
    getBrandsStatus === ACTION_STATUS.LOADING ||
    getBrandsStatus === ACTION_STATUS.IDLE) {
    return <Loading />;
  }

  if (getCategoriesStatus === ACTION_STATUS.FAILED ||
    getBrandsStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

  return (
    <ProductForm
      isEdit={false}
      brands={brands}
      categories={categories}
      action={createProduct}
      status={createProductStatus}
    />
  );
};

export default CreateProductForm;
