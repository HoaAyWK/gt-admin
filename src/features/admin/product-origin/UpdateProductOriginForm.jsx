import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductOriginForm from './ProductOriginForm';
import { getProductOrigins, selectProductOriginById, updateProductOrigin } from './productOriginSlice';
import { Loading, FetchDataErrorMessage } from '../components';
import { getBrands, selectAllBrands } from '../brand/brandSlice';
import { getCategories, selectAllCategories } from '../category/categorySlice';
import ACTION_STATUS from '../../../constants/actionStatus';

const UpdateProductOriginForm = ({ productId }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const brands = useSelector(selectAllBrands);
  const product = useSelector((state) => selectProductOriginById(state, productId));
  const { getCategoriesStatus } = useSelector((state) => state.adminCategories);
  const { getBrandsStatus } = useSelector((state) => state.adminBrands);
  const { updateProductOriginStatus, getProductOriginsStatus } = useSelector((state) => state.adminProductOrigins);

  const activeCategories = useMemo(() => {
    return categories.filter((category) => category.status === true);
  }, [categories]);

  useEffect(() => {
    if (getCategoriesStatus === ACTION_STATUS.IDLE) {
      dispatch(getCategories());
    }

    if (getBrandsStatus === ACTION_STATUS.IDLE) {
      dispatch(getBrands());
    }

    if (getProductOriginsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductOrigins());
    }
  }, []);

  if (getCategoriesStatus === ACTION_STATUS.LOADING ||
    getCategoriesStatus === ACTION_STATUS.IDLE ||
    getBrandsStatus === ACTION_STATUS.LOADING ||
    getBrandsStatus === ACTION_STATUS.IDLE ||
    getProductOriginsStatus === ACTION_STATUS.IDLE ||
    getProductOriginsStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getCategoriesStatus === ACTION_STATUS.FAILED ||
      getBrandsStatus === ACTION_STATUS.FAILED ||
      getProductOriginsStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

  return (
    <ProductOriginForm
      isEdit={true}
      action={updateProductOrigin}
      status={updateProductOriginStatus}
      brands={brands}
      categories={activeCategories}
      product={product}
    />
  );
};

export default UpdateProductOriginForm;
