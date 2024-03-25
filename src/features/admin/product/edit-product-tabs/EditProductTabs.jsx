import React, { useEffect, useState } from 'react';
import { Box, Tab } from '@mui/material';
import {
  TabPanel,
  TabList,
  TabContext
} from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { EDIT_PRODUCT_TABS } from '../../../../constants/tabs';
import ACTION_STATUS from '../../../../constants/actionStatus';
import ProductGeneralTab from './ProductGeneralTab';
import AttributeTab from './attribute-tab/AttributesTab';
import ImagesTab from './images-tab/ImagesTab';
import { getProduct } from '../productSlice';
import { Loading, FetchDataErrorMessage } from '../../components';
import { selectAllCategories, getCategories } from '../../category/categorySlice';
import { selectAllBrands, getBrands } from '../../brand/brandSlice';

const TABS = [
  { value: EDIT_PRODUCT_TABS.GENERAL, label: EDIT_PRODUCT_TABS.GENERAL },
  { value: EDIT_PRODUCT_TABS.ATTRIBUTES, label: EDIT_PRODUCT_TABS.ATTRIBUTES },
  { value: EDIT_PRODUCT_TABS.DISCOUNT, label: EDIT_PRODUCT_TABS.DISCOUNT },
  { value: EDIT_PRODUCT_TABS.IMAGES, label: EDIT_PRODUCT_TABS.IMAGES },
];

const EditProductTabs = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(EDIT_PRODUCT_TABS.GENERAL);
  const { product, getProductStatus } = useSelector((state) => state.products);
  const categories = useSelector(selectAllCategories);
  const brands = useSelector(selectAllBrands);
  const { getCategoriesStatus } = useSelector(state => state.adminCategories);
  const { getBrandsStatus } = useSelector(state => state.adminBrands);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!product || product && product.id !== id) {
      dispatch(getProduct(id));
    }
  }, [id, product]);

  useEffect(() => {
    if (getCategoriesStatus === ACTION_STATUS.IDLE) {
      dispatch(getCategories());
    }

    if (getBrandsStatus === ACTION_STATUS.IDLE) {
      dispatch(getBrands());
    }
  }, []);

  if (getProductStatus === ACTION_STATUS.LOADING ||
    getCategoriesStatus === ACTION_STATUS.LOADING ||
    getBrandsStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getProductStatus === ACTION_STATUS.FAILED ||
    getCategoriesStatus === ACTION_STATUS.FAILED ||
    getBrandsStatus === ACTION_STATUS.FAILED ||
    (getProductStatus === ACTION_STATUS.SUCCEEDED && !product)) {
    return <FetchDataErrorMessage />;
  }

  if (!product) {
    return <FetchDataErrorMessage />;
  }

  return (
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          onChange={(e, newValue) => setTab(newValue)}
          aria-label='Edit product tabs'
        >
          {TABS.map((item) => (
            <Tab key={item.value} label={item.label} value={item.value} />
          ))}
        </TabList>
      </Box>
      <TabPanel sx={{ px: 0 }} value={EDIT_PRODUCT_TABS.GENERAL}>
        <ProductGeneralTab product={product} brands={brands} categories={categories} />
      </TabPanel>
      <TabPanel sx={{ px: 0 }} value={EDIT_PRODUCT_TABS.ATTRIBUTES}>
        <AttributeTab
          productId={id}
          attributes={product.attributes}
          variants={product.variants}
          images={product.images}
        />
      </TabPanel>
      <TabPanel sx={{ px: 0 }} value={EDIT_PRODUCT_TABS.DISCOUNT}>
        Discount
      </TabPanel>
      <TabPanel sx={{ px: 0 }} value={EDIT_PRODUCT_TABS.IMAGES}>
        <ImagesTab productId={id} images={product.images} />
      </TabPanel>
    </TabContext>
  );
};

export default EditProductTabs;
