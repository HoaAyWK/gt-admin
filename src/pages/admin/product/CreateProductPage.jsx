import React from 'react';
import { useSelector } from 'react-redux';

import { AdminPageLayout } from '../common';
import { CreateProductForm } from '../../../features/admin/product';
import PATHS from '../../../constants/paths';

const breadcrumbs = [
  { label: 'Dashboard', path: PATHS.DASHBOARD },
  { label: 'Product', path: PATHS.PRODUCTS },
  { label: 'Create' }
];

const CreateProductPage = () => {

  return (
    <AdminPageLayout
      pageTitle='Create a new product'
      pageHeaderName='Create product'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <CreateProductForm />
    </AdminPageLayout>
  );
};

export default CreateProductPage;
