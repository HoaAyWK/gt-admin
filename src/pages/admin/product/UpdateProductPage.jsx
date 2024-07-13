import React from 'react';
import { useSelector } from 'react-redux';

import { AdminPageLayout } from '../common';
import { ProductForm } from '../../../features/admin/product';
import { selectProductById, updateProduct } from '../../../features/admin/product/productSlice';
import { useParams } from 'react-router-dom';
import PATHS from '../../../constants/paths';

const breadcrumbs = [
  { label: 'Dashboard', path: PATHS.DASHBOARD },
  { label: 'Product', path: PATHS.PRODUCTS },
  { label: 'Create' }
];

const UpdateProductPage = () => {
  const { id } = useParams();
  const { updateProductStatus } = useSelector((state) => state.adminProducts);
  const product = useSelector((state) => selectProductById(state, id));
  return (
    <AdminPageLayout
      pageTitle='Create a new product'
      pageHeaderName='Create product'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      {product && (
        <ProductForm isEdit={true} product={product} action={updateProduct} status={updateProductStatus} />
      )}
    </AdminPageLayout>
  );
};

export default UpdateProductPage;
