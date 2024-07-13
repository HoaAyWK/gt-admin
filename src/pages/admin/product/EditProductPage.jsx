import React from 'react';
import AdminPageLayout from '../common/AdminPageLayout';

import { EditProductTabs } from '../../../features/admin/product';
import PATHS from '../../../constants/paths';

const breadcrumbs = [
  { label: 'Dashboard', path: PATHS.DASHBOARD },
  { label: 'Product', path: PATHS.PRODUCTS },
  { label: 'Edit' }
];

const EditProductPage = () => {

  return (
    <AdminPageLayout
      pageTitle='Edit product'
      pageHeaderName='Edit product'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <EditProductTabs />
    </AdminPageLayout>
  );
};

export default EditProductPage;
